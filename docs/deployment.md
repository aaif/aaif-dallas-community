# Deployment

## Prerequisites

- an AWS account and IAM role allowed to deploy the stack;
- DNS access with Cloudflare or another DNS provider;
- an ACM certificate in `us-east-1` covering the site hostname;
- GitHub Actions OIDC trust for the deployment role;
- a configured Luma event URL and embed URL;
- a configured external student poster form.

## GitHub OIDC role

Do not create GitHub access keys. Create or reuse an IAM OIDC provider for
`token.actions.githubusercontent.com`, then allow this repository's protected
`production` environment to assume a deployment role.

Example trust policy (replace the AWS account ID):

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:aaif@244048685/aaif-dallas-community@1468153719:environment:production"
      }
    }
  }]
}
```

The role permission policy should be limited to:

- `s3:ListBucket` on the site bucket;
- `s3:GetObject`, `s3:PutObject`, and `s3:DeleteObject` on the site bucket's
  objects;
- `cloudfront:CreateInvalidation` on the deployed distribution.

The OIDC provider must exist in the same AWS account and have
`sts.amazonaws.com` in its client ID list. Verify the provider and role trust
policy before enabling deployments:

```bash
aws iam get-open-id-connect-provider \
  --open-id-connect-provider-arn \
  arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com

aws iam get-role \
  --role-name AAIFDallasStaticSiteDeployment \
  --query 'Role.AssumeRolePolicyDocument' \
  --output json
```

GitHub's current default subject qualifies the owner and repository names with
their immutable numeric IDs
(`repo:aaif@244048685/aaif-dallas-community@1468153719:environment:production`).
Verify these IDs if the organization or repository is recreated. An
`InvalidIdentityToken` response means AWS could not validate the token,
typically because the OIDC provider is absent or its client IDs are incorrect.
An `AccessDenied` response means the token was validated but its claims did not
match the role trust policy.

## Create the static infrastructure

```bash
aws cloudformation deploy \
  --stack-name aaif-dallas-static-site \
  --template-file infrastructure/static-site.yml \
  --parameter-overrides \
    SiteDomainName=summit.example.org \
    CertificateArn=arn:aws:acm:us-east-1:123456789012:certificate/uuid \
  --capabilities CAPABILITY_IAM
```

The stack creates a versioned private S3 origin, Origin Access Control,
CloudFront distribution, and HTTPS alias. Keep the source bucket private.

## Configure Cloudflare DNS

After the stack deploys, get the CloudFront domain:

```bash
aws cloudformation describe-stacks \
  --stack-name aaif-dallas-static-site \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionDomainName'].OutputValue" \
  --output text
```

In Cloudflare, create a proxied or DNS-only `CNAME` record:

- **Name**: `agenticaisummit`
- **Target**: the `DistributionDomainName` value

DNS-only mode is the simplest initial configuration because CloudFront already
provides CDN caching and TLS. Cloudflare SSL mode must support a full HTTPS
origin; do not use Flexible SSL. The ACM certificate must cover the complete
hostname and must be issued in `us-east-1`.

## Configure GitHub

Create a protected `production` environment and set:

- secret `AWS_DEPLOY_ROLE_ARN`: role assumed through GitHub OIDC;
- variable `AWS_REGION`: stack region;
- variable `SITE_BUCKET_NAME`: `BucketName` stack output;
- variable `CLOUDFRONT_DISTRIBUTION_ID`: `DistributionId` stack output.
- variable `SITE_URL`: the production HTTPS URL used on the deployment page.

Scope the role to the deployed bucket, CloudFront invalidation, and the required
OIDC subject. Do not store long-lived AWS access keys in GitHub. The deployment
workflow uses no third-party actions: it relies only on the runner's built-in
`git`, Node.js 22, AWS CLI, curl, and jq.

## Release behavior

Every pull request runs content validation, lint, type checking, tests, and a
production build. Merges to `main` repeat those gates, exchange a short-lived
GitHub OIDC token for AWS credentials, and then sync immutable assets to S3.
`index.html` is non-cacheable, and CloudFront is invalidated after the upload.

## Rollback

Fix forward with a reviewed pull request when possible. For urgent rollback,
restore a prior bucket version and rerun a CloudFront invalidation. Do not make
unreviewed edits directly in the S3 bucket.
