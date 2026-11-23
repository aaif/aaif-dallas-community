# Deployment

## Prerequisites

- an AWS account and IAM role allowed to deploy the stack;
- a Route 53 public hosted zone;
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
        "token.actions.githubusercontent.com:sub": "repo:aaif/aaif-dallas-community:environment:production"
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

## Create the static infrastructure

```bash
aws cloudformation deploy \
  --stack-name aaif-dallas-static-site \
  --template-file infrastructure/static-site.yml \
  --parameter-overrides \
    SiteDomainName=summit.example.org \
    HostedZoneId=Z123456789 \
    CertificateArn=arn:aws:acm:us-east-1:123456789012:certificate/uuid \
  --capabilities CAPABILITY_IAM
```

The stack creates a versioned private S3 origin, Origin Access Control,
CloudFront distribution, HTTPS alias, and Route 53 record. Keep the source
bucket private.

## Configure GitHub

Create a protected `production` environment and set:

- secret `AWS_DEPLOY_ROLE_ARN`: role assumed through GitHub OIDC;
- variable `AWS_REGION`: stack region;
- variable `SITE_BUCKET_NAME`: `BucketName` stack output;
- variable `CLOUDFRONT_DISTRIBUTION_ID`: `DistributionId` stack output.
- variable `SITE_URL`: the production HTTPS URL used on the deployment page.

Scope the role to the deployed bucket, CloudFront invalidation, and the required
OIDC subject. Do not store long-lived AWS access keys in GitHub.

## Release behavior

Every pull request runs content validation, lint, type checking, tests, and a
production build. Merges to `main` repeat those gates and then sync immutable
assets to S3. `index.html` is non-cacheable, and CloudFront is invalidated after
the upload.

## Rollback

Fix forward with a reviewed pull request when possible. For urgent rollback,
restore a prior bucket version and rerun a CloudFront invalidation. Do not make
unreviewed edits directly in the S3 bucket.
