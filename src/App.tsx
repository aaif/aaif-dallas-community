import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  ExternalLink,
  Filter,
  Github,
  Globe2,
  Linkedin,
  MapPin,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { content } from "./content";
import type { Session, Speaker } from "./content/schema";

const navItems = [
  ["Schedule", "/schedule"],
  ["Speakers", "/speakers"],
  ["Community", "/community"],
  ["Sponsorship", "/sponsorship"],
  ["Resources", "/resources"],
  ["Updates", "/updates"],
] as const;

function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/sponsorship" element={<SponsorshipPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((word) => word[0]).join("").slice(0, 2);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <Link className="brand" to="/" aria-label="Agentic AI Summit home">
        <span className="brand-logo">
          <img src="/images/agentic-ai-foundation.svg" alt="Agentic AI Foundation" />
        </span>
        <span>
          <strong>Agentic AI Summit</strong>
          <small>AAIF Dallas • 2027</small>
        </span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav id="primary-navigation" className={`navigation ${menuOpen ? "is-open" : ""}`}>
        {navItems.map(([label, to]) => (
          <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
        <a className="button button-small" href={content.event.registrationUrl} target="_blank" rel="noreferrer">
          Register <ExternalLink size={14} />
        </a>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="eyebrow"><Sparkles size={15} /> Multi-community technical summit</div>
        <h1>Build agents for<br /><span>the real world.</span></h1>
        <p className="hero-copy">{content.event.overview}</p>
        <div className="event-meta" aria-label="Event details">
          <span><CalendarDays size={18} /> {content.event.dateLabel}</span>
          <span><Clock3 size={18} /> {content.event.time}</span>
          <span><MapPin size={18} /> {content.event.city}</span>
        </div>
        <div className="hero-actions">
          <a className="button" href={content.event.registrationUrl} target="_blank" rel="noreferrer">
            Register free on Luma <ArrowRight size={18} />
          </a>
          <Link className="button button-secondary" to="/schedule">Explore the schedule</Link>
        </div>
        <div className="hero-note"><Check size={15} /> {content.event.notice}</div>
        <div className="protocols" aria-label="Summit protocols">
          <span><Network /> A2A</span>
          <span><Code2 /> MCP</span>
          <span><ShieldCheck /> Security</span>
        </div>
      </section>

      <section className="stats-strip" aria-label="Summit statistics">
        {content.event.stats.map((stat) => (
          <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
        ))}
      </section>

      <section className="section section-light">
        <div className="section-heading">
          <div><span className="kicker">What we are building</span><h2>Production-ready agent systems, not prompt theater.</h2></div>
          <p>Deep technical sessions and code-first labs centered on the hardest problems in multi-agent engineering.</p>
        </div>
        <div className="feature-grid">
          <FeatureCard icon={<Network />} number="01" title="Agent interoperability" copy="A2A discovery, agent cards, capability negotiation, and asynchronous task lifecycles." />
          <FeatureCard icon={<Code2 />} number="02" title="Production MCP" copy="Authenticated tools, structured resources, schema validation, and defenses against tool poisoning." />
          <FeatureCard icon={<ShieldCheck />} number="03" title="Trust & security" copy="Identity, delegated authorization, sandboxing, egress controls, and auditable agent evidence." />
          <FeatureCard icon={<Sparkles />} number="04" title="Resilient architecture" copy="Durable state, human checkpoints, retry strategy, observability, and trajectory evaluation." />
        </div>
      </section>

      <section className="section tracks-section">
        <div className="section-heading">
          <div><span className="kicker">Afternoon tracks</span><h2>Choose your depth.</h2></div>
          <Link className="text-link" to="/schedule">View full schedule <ArrowRight size={16} /></Link>
        </div>
        <div className="track-grid">
          <TrackCard label="Track A • Main Auditorium" title="Systems engineering" sessions={["Sandboxing & runtimes", "Gateways & vulnerabilities", "Observability & evidence", "Trajectory & causality"]} />
          <TrackCard label="Track B • Hands-on lab" title="Implementation & protocols" sessions={["Production MCP servers", "MCP hardening", "A2A agent discovery", "End-to-end orchestration"]} accent />
        </div>
      </section>

      <FeaturedSpeakers />

      <section className="section registration-section" id="registration">
        <div className="registration-copy">
          <span className="kicker">Free community admission</span>
          <h2>Reserve your summit seat.</h2>
          <p>Choose general admission or limited hands-on lab access in Luma. Registration, email updates, capacity, and check-in stay securely in Luma.</p>
          <ul className="check-list">
            <li><Check /> No site account required</li>
            <li><Check /> Separate workshop capacity</li>
            <li><Check /> Setup instructions before the event</li>
          </ul>
        </div>
        <div className="registration-card">
          <LumaRegistration />
        </div>
      </section>

      <CommunityCallout />
    </>
  );
}

function FeatureCard({ icon, number, title, copy }: { icon: React.ReactNode; number: string; title: string; copy: string }) {
  return <article className="feature-card"><div className="feature-icon">{icon}</div><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>;
}

function TrackCard({ label, title, sessions, accent = false }: { label: string; title: string; sessions: string[]; accent?: boolean }) {
  return (
    <article className={`track-card ${accent ? "accent" : ""}`}>
      <div className="track-label">{label}</div>
      <h3>{title}</h3>
      <ul>{sessions.map((session) => <li key={session}><ChevronRight size={16} /> {session}</li>)}</ul>
    </article>
  );
}

function SchedulePage() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All tracks");
  const tracks = useMemo(() => ["All tracks", ...new Set(content.schedule.map((session) => session.track))], []);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return content.schedule.filter((session) => {
      const trackMatch = track === "All tracks" || session.track === track;
      const people = session.speakerIds
        .map((speakerId) => content.speakers.find((speaker) => speaker.id === speakerId)?.name ?? "")
        .join(" ");
      const text = `${session.title} ${session.summary} ${session.tags.join(" ")} ${people}`.toLowerCase();
      return trackMatch && (!normalized || text.includes(normalized));
    });
  }, [query, track]);

  return (
    <div>
      <PageHero eyebrow="Full-day run of show" title="A schedule built for depth." copy="Filter the program by topic, speaker, track, MCP, A2A, security, observability, and hands-on labs." />
      <section className="section section-light">
        <div className="filter-bar">
          <label className="search-field">
            <span className="sr-only">Search schedule sessions</span>
            <Filter size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sessions, speakers, or topics" />
          </label>
          <label>
            <span className="sr-only">Filter by track</span>
            <select value={track} onChange={(event) => setTrack(event.target.value)}>
              {tracks.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <span className="result-count" aria-live="polite">{filtered.length} sessions</span>
        </div>
        <div className="schedule-list">
          {filtered.map((session) => <ScheduleRow key={session.id} session={session} />)}
          {filtered.length === 0 && <EmptyState title="No sessions found" copy="Try a broader topic or a different track." />}
        </div>
      </section>
    </div>
  );
}

function ScheduleRow({ session }: { session: Session }) {
  const speakers = session.speakerIds.map((id) => content.speakers.find((speaker) => speaker.id === id)).filter(Boolean) as Speaker[];
  return (
    <article className="schedule-row">
      <div className="time-block">
        <strong>{formatTime(session.start)}</strong>
        <span>{formatTime(session.end)}</span>
      </div>
      <div className="schedule-content">
        <div className="session-labels"><span>{session.track}</span><span>{session.room}</span></div>
        <h3>{session.title}</h3>
        <p>{session.summary}</p>
        <div className="session-meta">
          {speakers.map((speaker) => <span key={speaker.id}>{speaker.name}</span>)}
          {session.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

function FeaturedSpeakers() {
  const featured = content.speakers.filter((speaker) => speaker.featured);
  return (
    <section className="section section-light">
      <div className="section-heading">
        <div><span className="kicker">People shaping the field</span><h2>Technical leaders and hands-on guides.</h2></div>
        <Link className="text-link" to="/speakers">Meet the speakers <ArrowRight size={16} /></Link>
      </div>
      <div className="speaker-grid">
        {featured.map((speaker, index) => <SpeakerCard key={speaker.id} speaker={speaker} index={index} />)}
      </div>
    </section>
  );
}

function LumaRegistration() {
  useEffect(() => {
    if (document.getElementById("luma-checkout")) return;
    const script = document.createElement("script");
    script.id = "luma-checkout";
    script.src = "https://embed.lu.ma/checkout-button.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="registration-widget">
      <span className="registration-widget-icon"><CalendarDays /></span>
      <span className="kicker">Luma registration</span>
      <h3>Choose your summit experience.</h3>
      <p>Register for general admission or select the limited hands-on lab experience. Luma handles confirmation, capacity, reminders, and check-in.</p>
      <a
        href={content.event.registrationUrl}
        className="button luma-checkout--button"
        data-luma-action="checkout"
        data-luma-event-id={content.event.registrationEventId}
      >
        Register for Event <ArrowRight size={17} />
      </a>
      <small>Secure registration opens in Luma. The event page remains available if the checkout script is blocked.</small>
    </div>
  );
}

function SpeakersPage() {
  return (
    <div>
      <PageHero eyebrow="Speakers & facilitators" title="Practitioners with production scars." copy="The summit prioritizes concrete architecture, real failure modes, actionable code, and measurable trade-offs." />
      <section className="section section-light"><div className="speaker-grid all-speakers">
        {content.speakers.map((speaker, index) => <SpeakerCard key={speaker.id} speaker={speaker} index={index} />)}
      </div></section>
      <CommunityCallout />
    </div>
  );
}

function SpeakerCard({ speaker, index }: { speaker: Speaker; index: number }) {
  return (
    <article className="speaker-card">
      <div className={`speaker-avatar avatar-${index % 4}`} aria-hidden="true">
        {speaker.headshot ? <img src={speaker.headshot} alt="" /> : <span>{initials(speaker.name)}</span>}
      </div>
      <div className="speaker-body">
        <span className="kicker">{speaker.role}</span>
        <h3>{speaker.name}</h3>
        <strong>{speaker.organization}</strong>
        <p>{speaker.bio}</p>
        <div className="topic-list">{speaker.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
      </div>
    </article>
  );
}

function CommunityPage() {
  return (
    <div>
      <PageHero eyebrow="Communities & organizers" title="Many communities. One technical summit." copy="A lead community coordinates the edition while co-organizers, sponsors, students, reviewers, and volunteers shape the program together." />
      <section className="section section-light">
        <div className="section-heading"><div><span className="kicker">Organizing communities</span><h2>Built across the ecosystem.</h2></div></div>
        <div className="community-grid">{content.partners.organizingCommunities.map((partner) => <CommunityCard key={partner.id} name={partner.name} copy={partner.description} logo={partner.logo} lead={partner.id === "aaif-dallas"} />)}</div>
      </section>
      <section className="section">
        <div className="section-heading"><div><span className="kicker">Operational committees</span><h2>Every workstream for a world-class summit.</h2></div><p>Clear ownership connects strategy, guest experience, program quality, production, venue delivery, partners, and student outreach.</p></div>
        <div className="committee-grid">{content.committees.map((committee, index) => (
          <article className="committee-card" key={committee.id}>
            <div className="committee-number">{String(index + 1).padStart(2, "0")}</div>
            <span>{committee.shortName}</span>
            <h3>{committee.name}</h3>
            {committee.status && <div className="committee-status">{committee.status}</div>}
            <p>{committee.description}</p>
            <ul>{committee.responsibilities.map((responsibility) => <li key={responsibility}><Check size={14} /> {responsibility}</li>)}</ul>
          </article>
        ))}</div>
      </section>
      <section className="section section-light">
        <div className="section-heading"><div><span className="kicker">Core team & leadership</span><h2>The people behind the run of show.</h2></div></div>
        <div className="organizer-grid">{content.organizers.map((organizer) => (
          <article className="organizer-card" key={organizer.id}>
            <div className="organizer-profile">
              <div className="organizer-headshot">
                {organizer.headshot ? <img src={organizer.headshot} alt={`Portrait of ${organizer.name}`} /> : <span>{initials(organizer.name)}</span>}
              </div>
              <div><span>{organizer.committee}</span><h3>{organizer.name}</h3><strong>{organizer.role}</strong></div>
            </div>
            <p>{organizer.bio}</p>
            <div className="organizer-meta">
              <div className="organizer-affiliations">
                {(organizer.affiliations ?? [organizer.community]).map((affiliation) => <small key={affiliation}>{affiliation}</small>)}
              </div>
              {organizer.linkedinUrl && (
                <a href={organizer.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${organizer.name} on LinkedIn`}>
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
            </div>
          </article>
        ))}</div>
      </section>
      <PartnersSection />
    </div>
  );
}

function PartnersSection() {
  return (
    <section className="section section-light">
      <div className="section-heading"><div><span className="kicker">Community partners</span><h2>Community makes the summit possible.</h2></div><Link className="text-link" to="/sponsorship">View sponsorship <ArrowRight size={16} /></Link></div>
      <div className="partner-groups">
        <div><h3>Community partners</h3><div className="logo-grid">{content.partners.communityPartners.map((partner) => <div className="logo-chip" key={partner.id}>{partner.logo ? <img src={partner.logo} alt={`${partner.name} logo`} /> : partner.name}</div>)}</div></div>
      </div>
    </section>
  );
}

function SponsorshipPage() {
  return (
    <div>
      <PageHero eyebrow="Sponsorship & partnerships" title="Invest in production-ready agentic AI." copy="Support a free, inclusive technical summit for architects, engineers, researchers, students, and community leaders across Dallas." />
      <section className="section section-light">
        <div className="section-heading">
          <div><span className="kicker">Sponsor recognition</span><h2>Partners powering the summit.</h2></div>
          <a className="text-link" href="mailto:sponsors@aaif.io?subject=Agentic%20AI%20Summit%20Sponsorship">Become a sponsor <ArrowRight size={16} /></a>
        </div>
        <div className="sponsor-logo-grid">{content.partners.sponsors.map((sponsor) => (
          <a className="sponsor-logo-card" href={sponsor.url} key={sponsor.id}>
            {sponsor.logo ? <img src={sponsor.logo} alt={`${sponsor.name} logo`} /> : <strong>{sponsor.name}</strong>}
            <span>{sponsor.tier}</span>
          </a>
        ))}</div>
        <div className="sponsorship-divider" />
        <div className="sponsor-package-heading">
          <div><span className="kicker">Sponsorship prospectus</span><h3>Packages for meaningful technical and community impact.</h3></div>
          <p>Packages can be combined or tailored around hospitality, community reach, lab tooling, and media production.</p>
        </div>
        <div className="sponsor-package-grid">{content.partners.sponsorPackages.map((sponsorPackage) => (
          <article className="sponsor-package" key={sponsorPackage.id}>
            <span>{sponsorPackage.collaboration}</span>
            <h4>{sponsorPackage.name}</h4>
            <p className="sponsor-package-audience">{sponsorPackage.audience}</p>
            <p>{sponsorPackage.description}</p>
            <ul>{sponsorPackage.benefits.map((benefit) => <li key={benefit}><Check size={14} /> {benefit}</li>)}</ul>
            <a href="mailto:npgovintarajan@gmail.com?subject=Agentic%20AI%20Summit%20Sponsorship%20Inquiry">Discuss this package <ArrowRight size={15} /></a>
          </article>
        ))}</div>
      </section>
    </div>
  );
}

function CommunityCard({ name, copy, logo, lead }: { name: string; copy: string; logo: string | null; lead?: boolean }) {
  return <article className={`community-card ${lead ? "lead" : ""}`}><div className="community-symbol">{logo ? <img src={logo} alt={`${name} logo`} /> : lead ? <Sparkles /> : <Users />}</div><span>{lead ? "Lead organizer" : "Co-organizing community"}</span><h3>{name}</h3><p>{copy}</p></article>;
}

function ResourcesPage() {
  return (
    <div>
      <PageHero eyebrow="Prepare for the labs" title="Arrive ready to build." copy="Lab setup details and repository access are provided to registered participants through Luma. These public checklists cover the essentials." />
      <section className="section section-light">
        <div className="resource-grid">{content.resources.map((resource) => <article className="resource-card" key={resource.id}><span>{resource.audience}</span><h3>{resource.title}</h3><p>{resource.description}</p>{resource.available && resource.url ? <a className="button button-small" href={resource.url} target="_blank" rel="noreferrer">View in Luma <ExternalLink size={14} /></a> : <span className="coming-soon">Detailed guide coming soon</span>}</article>)}</div>
        <div className="poster-banner">
          <div><span className="kicker">Student poster call</span><h2>Show the next generation of agentic AI.</h2><p>Submit applied research, open-source experiments, or a production case study through the external poster form.</p></div>
          {content.event.posterUrl ? (
            <a className="button" href={content.event.posterUrl} target="_blank" rel="noreferrer">Submit a poster <ExternalLink size={17} /></a>
          ) : (
            <span className="button button-light is-disabled" aria-disabled="true">Submission opens soon</span>
          )}
        </div>
      </section>
    </div>
  );
}

function UpdatesPage() {
  return (
    <div>
      <PageHero eyebrow="Summit updates" title="Notes from the organizing community." copy="Speaker announcements, schedule milestones, lab preparation, and community calls." />
      <section className="section section-light">
        <div className="news-list">{content.news.map((item) => <article key={item.id}><div><span>{item.category}</span><time dateTime={item.date}>{formatDate(item.date)}</time></div><h2>{item.title}</h2><p>{item.summary}</p></article>)}</div>
      </section>
    </div>
  );
}

function CommunityCallout() {
  return <section className="community-callout"><div><span className="kicker">Organized together</span><h2>Community is part of the architecture.</h2><p>AAIF Dallas, IEEE, student chapters, cloud communities, AI practitioners, and technical partners are building this summit as a shared public resource.</p></div><Link className="button button-light" to="/community">Meet the communities <ArrowRight size={17} /></Link></section>;
}

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-hero"><div className="eyebrow"><Sparkles size={15} /> {eyebrow}</div><h1>{title}</h1><p>{copy}</p></section>;
}

function NotFoundPage() {
  return <section className="page-hero"><h1>That page is not in this edition.</h1><p>Return to the summit overview or explore the published schedule.</p><div className="hero-actions"><Link className="button" to="/">Return home</Link></div></section>;
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return <div className="empty-state"><SearchMark /><h3>{title}</h3><p>{copy}</p></div>;
}

function SearchMark() {
  return <div className="empty-icon"><Filter /></div>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><div><strong>{content.event.name}</strong><p>{content.event.mission}</p></div></div>
      <div className="footer-links"><a href="https://aaif.io" target="_blank" rel="noreferrer"><Globe2 size={16} /> AAIF</a><a href="https://github.com/aaif" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="https://www.linkedin.com/company/aaif-dallas/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></div>
      <div className="footer-meta"><span>© 2027 AAIF Dallas Community</span><span>Registration and attendee data are managed by Luma.</span></div>
    </footer>
  );
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" }).format(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export default App;
