import { useEffect, useState } from 'react';
import { avatar, beliefs, careerStart, certs, education, jobs, links, projects, skills } from './data';
import type { Job, Project } from './data';

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;
const reducedMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollTop = (): void => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });

type Theme = 'dark' | 'light';
type Route = 'home' | 'beliefs';

// Hash routing keeps the site fully static: no server rewrites needed on any host.
const BELIEFS_HASH = '#/beliefs';
const routeFromHash = (): Route => (window.location.hash === BELIEFS_HASH ? 'beliefs' : 'home');
const titles: Record<Route, string> = {
  home: 'Arnab Mukherjee · AI Engineer',
  beliefs: 'things i believe in · Arnab Mukherjee',
};

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(routeFromHash);
  useEffect(() => {
    const onHashChange = (): void => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  // Jump to the top after the new page renders. 'instant' bypasses the CSS smooth scroll,
  // which would otherwise be cut short by the re-render and leave the page mid-scroll.
  useEffect(() => {
    document.title = titles[route];
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);
  return route;
}

// Theme is applied before first paint by the inline script in index.html; this hook keeps it in sync.
function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
    try { localStorage.setItem('theme', theme); } catch { /* storage blocked: theme still works for this visit */ }
  }, [theme]);

  return [theme, () => setTheme(t => (t === 'light' ? 'dark' : 'light'))];
}

// Fade-up every `.r` element the first time it scrolls into view. Re-runs when the page changes.
function useReveal(route: Route): void {
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    document.querySelectorAll<HTMLElement>('.r:not(.on)').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [route]);
}

function YearsCounter() {
  const calc = (): string => ((Date.now() - careerStart.getTime()) / YEAR_MS).toFixed(9);
  const [years, setYears] = useState(calc);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => setYears(calc()), 50);
    return () => clearInterval(id);
  }, []);
  return <span>{years}</span>;
}

/* Icons */
const XPath = 'M18.9 1.2h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9zm-1.3 19.4h2L6.5 3.3H4.3z';
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const Icon = {
  x: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={XPath} /></svg>,
  home: <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" /></svg>,
  book: <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></svg>,
  mail: <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  sun: <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
  moon: <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
  chev: <svg className="chev" viewBox="0 0 24 24" {...stroke} strokeWidth={2.5} aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" /></svg>,
};

const external = { target: '_blank', rel: 'noopener' } as const;

function JobRow({ job }: { job: Job }) {
  return (
    <details className="row r">
      <summary>
        <img className={job.logoFull ? 'logo full' : 'logo'} src={job.logo} alt={job.company} width={52} height={52} loading="lazy" />
        <div className="meta"><b>{job.company}</b><small>{job.role} · {job.place}</small></div>
        <time>{job.dates}</time>
        {Icon.chev}
      </summary>
      <ul>{job.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
    </details>
  );
}

function Tile({ p }: { p: Project }) {
  return (
    <div className={p.big ? 'tile big r' : 'tile r'}>
      <div className="num">{p.num}{p.sub && <><br /><span className="muted">{p.sub}</span></>}</div>
      <h3>{p.title}</h3>
      <p>{p.body}</p>
      <div className="stack">{p.stack.join(' · ')}</div>
    </div>
  );
}

const Footer = () => <footer>© {new Date().getFullYear()} Arnab Mukherjee · Mumbai, India</footer>;

function Home() {
  return (
    <main>
      <header className="hero">
        <div>
          <h1 className="r">hi, arnab here.</h1>
          <p className="sub r">ai engineer. i make <b>LLMs do real work</b> in prod.</p>
          <p className="counter r">been shipping ai for <YearsCounter /> years</p>
          <span className="pill r"><i />currently cooking at MARS</span>
        </div>
        <img className="avatar r" src={avatar} alt="Arnab Mukherjee" width={136} height={136} />
      </header>

      <section className="about">
        <h2 className="r">about</h2>
        <p className="r">tldr; i build AI that actually ships. <b>agents, RAG, voice, and the backend that holds it all together.</b> not demos. production.</p>
        <p className="r">2+ years putting LLMs in front of real users across FMCG, pharma, finance and healthcare. right now i'm building agentic data tools on <b>Azure OpenAI + Databricks</b> at MARS.</p>
        <p className="r">off the keyboard: <b>national-level swimmer</b>, reads too much Stephen King, has Blonde on repeat. based in Mumbai, mostly online on <a href={links.x} {...external}>𝕏</a>.</p>
        <p className="r">if you want to know more about me, <a href={BELIEFS_HASH}>here are some things i believe in</a>.</p>
      </section>

      <section>
        <h2 className="r">cool places i've worked at</h2>
        <p className="hint r">tap a row for the details</p>
        {jobs.map(job => <JobRow key={job.company} job={job} />)}
      </section>

      <section>
        <h2 className="r">stuff i've shipped</h2>
        <div className="tiles">{projects.map(p => <Tile key={p.title} p={p} />)}</div>
      </section>

      <section>
        <h2 className="r">education</h2>
        {education.map(s => (
          <div className="row r" key={s.name}>
            <div className="head">
              <img className="logo" src={s.logo} alt={s.name} width={52} height={52} loading="lazy" />
              <div className="meta"><b>{s.name}</b><small>{s.degree}</small></div>
              <time>{s.dates}</time>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="r">things i'm good at</h2>
        {skills.map(({ group, items }) => (
          <div className="group r" key={group}>
            <h3>{group}</h3>
            <div className="chips">
              {items.map(([label, slug]) => (
                <span className="chip" key={label}>
                  {slug && <img src={`https://cdn.simpleicons.org/${slug}/000`} alt="" width={14} height={14} loading="lazy" />}
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="r">receipts</h2>
        <ul className="certs r">{certs.map(c => <li key={c}>{c}</li>)}</ul>
      </section>

      <div className="outro r">
        <h2>let's build something.</h2>
        <p>open to AI engineer roles and fun problems. dms are open.</p>
        <div className="btns">
          <a className="btn solid" href={links.x} {...external}>{Icon.x}say hi on 𝕏</a>
          <a className="btn ghost" href={links.email}>email me</a>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Beliefs() {
  return (
    <main className="beliefs">
      <a className="back r" href="#/">← home</a>
      <h1 className="r">things i believe in</h1>
      <ul>
        {beliefs.map(b => (
          <li className="r" key={b.text}>
            {b.by ? <><q>{b.text}</q> <span className="by">— {b.by}</span></> : b.text}
          </li>
        ))}
      </ul>
      <p className="more r">more on the way..</p>
      <Footer />
    </main>
  );
}

function Dock({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  return (
    <nav className="dock" aria-label="Links">
      <a href="#/" onClick={scrollTop} data-tip="home" aria-label="Home">{Icon.home}</a>
      <a href={BELIEFS_HASH} data-tip="beliefs" aria-label="Things I believe in">{Icon.book}</a>
      <span className="sep" />
      <a href={links.github} {...external} data-tip="github" aria-label="GitHub">{Icon.github}</a>
      <a href={links.linkedin} {...external} data-tip="linkedin" aria-label="LinkedIn">{Icon.linkedin}</a>
      <a href={links.x} {...external} data-tip="𝕏" aria-label="X">{Icon.x}</a>
      <a href={links.email} data-tip="email" aria-label="Email">{Icon.mail}</a>
      <span className="sep" />
      <button type="button" onClick={toggleTheme} data-tip="lights" aria-label="Toggle light and dark mode">
        {theme === 'light' ? Icon.moon : Icon.sun}
      </button>
    </nav>
  );
}

export default function App() {
  const route = useRoute();
  const [theme, toggleTheme] = useTheme();
  useReveal(route);

  return (
    <>
      {route === 'beliefs' ? <Beliefs /> : <Home />}
      <Dock theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
