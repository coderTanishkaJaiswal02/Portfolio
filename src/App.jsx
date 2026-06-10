import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChatWidget from './components/ChatWidget';

// Register ScrollTrigger plugin once at module level
gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────
   DATA
──────────────────────────────────────── */
const PROJECTS = [
  {
    bg: 'linear-gradient(135deg,#180a30 0%,#3a1278 50%,#ff6640 100%)',
    type: 'Full Stack · 2024',
    name: 'ThinkerTheorist',
    revealName: 'ThinkerTheorist Blog Platform',
    desc: 'Full-stack CMS with JWT auth, role-based access control (Admin/Author/Reader), OWASP security, and clean microservice-aligned architecture.',
    tags: ['Spring Boot', 'React.js', 'MySQL', 'JWT', 'OAuth2'],
    link: 'https://github.com/coderTanishkaJaiswal02',
  },
  {
    bg: 'linear-gradient(135deg,#030f24 0%,#0a2d6e 50%,#00d9ff 100%)',
    type: 'Backend · Microservices',
    name: 'Enterprise API Suite',
    revealName: 'Enterprise RESTful API Suite',
    desc: 'Architected layered microservices at Zoomcode with Spring Boot, JWT/RBAC security, MySQL query optimisation, and Mockito unit tests.',
    tags: ['Spring Boot', 'Microservices', 'JUnit', 'Mockito'],
    link: 'https://github.com/coderTanishkaJaiswal02',
  },
  {
    bg: 'linear-gradient(135deg,#0d1f0d 0%,#1a4d1a 50%,#4ade80 100%)',
    type: 'Frontend · PWA',
    name: 'Portfolio Website',
    revealName: 'Portfolio PWA',
    desc: 'Production-deployed portfolio achieving 95+ Lighthouse score via performance budgeting, semantic HTML5, and WCAG accessibility compliance.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PWA'],
    link: 'https://github.com/coderTanishkaJaiswal02',
  },
  {
    bg: 'linear-gradient(135deg,#1a1000 0%,#4a3500 50%,#ffa040 100%)',
    type: 'Frontend · Hardware',
    name: 'Hello NFC Platform',
    revealName: 'Hello NFC Platform',
    desc: 'React.js frontend integrated with hardware NFC/DVC APIs in production — cross software-hardware boundary development.',
    tags: ['React.js', 'NFC API', 'REST'],
    link: '#',
  },
  {
    bg: 'linear-gradient(135deg,#180010 0%,#4a0035 50%,#e040fb 100%)',
    type: 'Frontend · SaaS',
    name: 'SaaS Dashboard UI',
    revealName: 'SaaS Dashboard Libraries',
    desc: 'Modular React.js component libraries for SaaS dashboards with PWA capabilities, service workers, and offline caching.',
    tags: ['React.js', 'PWA', 'Service Workers'],
    link: '#',
  },
];

const SKILLS = [
  { name: 'Java / Spring Boot', pct: 90 },
  { name: 'React.js / JavaScript ES6+', pct: 88 },
  { name: 'MySQL · MongoDB', pct: 85 },
  { name: 'Microservices Architecture', pct: 82 },
  { name: 'JWT · OAuth2 · RBAC', pct: 80 },
  { name: 'Docker · DevOps · CI/CD', pct: 65 },
];

const TIMELINE = [
  {
    period: 'JAN 2025 — APR 2025',
    company: 'Zoomcode Technology',
    role: 'Full Stack Developer Intern · LLP',
    achievements: [
      'Architected RESTful microservices with Spring Boot layered controller → service → repository design.',
      'Delivered end-to-end full-stack features independently — React.js UI to Spring Boot API — within sprint timelines.',
      'Implemented JWT token validation with RBAC following OAuth2 security principles.',
      'Resolved MySQL performance bottlenecks through schema refactoring and index optimisation.',
      'Wrote JUnit & Mockito unit tests; validated API contracts via Postman before integration.',
    ],
  },
  {
    period: 'AUG 2024 — DEC 2024',
    company: '51 Digital Media',
    role: 'Frontend Developer Intern',
    achievements: [
      'Engineered modular React.js component libraries for SaaS dashboards with separation-of-concerns.',
      'Implemented PWA capabilities — service workers, offline caching, push notifications.',
      'Designed and consumed 10+ RESTful APIs with error handling and optimistic UI updates.',
      'Achieved 95+ Lighthouse performance score via Core Web Vitals optimisations on a live product.',
      'Built Hello NFC Platform frontend integrated with hardware NFC/DVC APIs in production.',
    ],
  },
];

const CONTACT_INFO = [
  { icon: '📍', text: 'Indore, Madhya Pradesh, India' },
  { icon: '📧', text: 'tanishkaj290@gmail.com', href: 'mailto:tanishkaj290@gmail.com' },
  { icon: '📱', text: '+91 9009222448' },
  { icon: '🔗', text: 'linkedin.com/in/tanishka-jaiswal', href: 'https://linkedin.com/in/tanishka-jaiswal-b9405b297' },
  { icon: '💻', text: 'github.com/coderTanishkaJaiswal02', href: 'https://github.com/coderTanishkaJaiswal02' },
];

/* ────────────────────────────────────────
   HELPER — animate all .fade-up inside a ref
──────────────────────────────────────── */
const animateFadeUps = (container) => {
  if (!container) return;
  container.querySelectorAll('.fade-up').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  });
};

/* ────────────────────────────────────────
   CURSOR
──────────────────────────────────────── */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Event delegation — works for dynamically rendered elements
    const grow = (e) => { if (e.target.closest('a,button,.project-card,.tag,.tl-item')) ringRef.current?.classList.add('hovered'); };
    const shrink = (e) => { if (e.target.closest('a,button,.project-card,.tag,.tl-item')) ringRef.current?.classList.remove('hovered'); };
    document.addEventListener('mouseover', grow);
    document.addEventListener('mouseout', shrink);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', grow);
      document.removeEventListener('mouseout', shrink);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ────────────────────────────────────────
   SCROLL PROGRESS
──────────────────────────────────────── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setWidth(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/* ────────────────────────────────────────
   LOGO SVG (shared)
──────────────────────────────────────── */
function LogoSVG() {
  return (
    <svg className="logo-svg" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="18" stroke="#ff6640" strokeWidth="1.4" />
      <circle cx="19" cy="19" r="3.5" fill="#ff6640" />
      <line x1="19" y1="1" x2="7.5" y2="11" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".55" />
      <line x1="19" y1="1" x2="30.5" y2="11" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".55" />
      <line x1="7.5" y1="11" x2="7.5" y2="27" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <line x1="30.5" y1="11" x2="30.5" y2="27" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <line x1="7.5" y1="27" x2="19" y2="37" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <line x1="30.5" y1="27" x2="19" y2="37" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <circle cx="7.5" cy="11" r="2.5" fill="#ff6640" fillOpacity=".65" />
      <circle cx="30.5" cy="11" r="2.5" fill="#ff6640" fillOpacity=".65" />
      <text x="13.5" y="23" fill="#ffffff" fontSize="9" fontFamily="Syne,sans-serif" fontWeight="800">TJ</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   NAVBAR
──────────────────────────────────────── */
const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects-wrap', label: 'Projects' },
  { href: '#internship', label: 'Experience' },
  { href: '#contact', label: 'Hire Me', cta: true },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  /* scroll-glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  /* close drawer on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* GSAP drawer slide-in */
  useEffect(() => {
    const { gsap } = window.__gsap__ || {};
    if (!drawerRef.current) return;
    if (drawerOpen) {
      gsap?.fromTo(drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.38, ease: 'power3.out' }
      );
    }
  }, [drawerOpen]);

  const closeAndGo = () => setDrawerOpen(false);

  return (
    <>
      {/* ── MAIN NAV ── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        {/* Logo — always visible */}
        <a href="#hero" className="logo">
          <LogoSVG />
          <span className="logo-wordmark">TANISHKA<em>.</em></span>
        </a>

        {/* Desktop links (hidden on mobile via CSS) */}
        <ul className="nav-links nav-links-desktop">
          {NAV_LINKS.map(({ href, label, cta }) => (
            <li key={href}>
              <a href={href} className={cta ? 'nav-cta' : ''}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger — only on mobile */}
        <button
          className={`hamburger ${drawerOpen ? 'open' : ''}`}
          onClick={() => setDrawerOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={drawerOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside className={`mobile-drawer ${drawerOpen ? 'drawer-open' : ''}`} ref={drawerRef} aria-hidden={!drawerOpen}>
        {/* Drawer header */}
        <div className="drawer-header">
          <a href="#hero" className="logo" onClick={closeAndGo}>
            <LogoSVG />
            <span className="logo-wordmark">TANISHKA<em>.</em></span>
          </a>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="drawer-nav">
          {NAV_LINKS.map(({ href, label, cta }, i) => (
            <a
              key={href}
              href={href}
              className={`drawer-link ${cta ? 'drawer-link-cta' : ''}`}
              onClick={closeAndGo}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="drawer-link-num">0{i + 1}</span>
              {label}
              {cta && <span className="drawer-cta-arrow">→</span>}
            </a>
          ))}
        </nav>

        {/* Drawer footer socials */}
        <div className="drawer-footer">
          <a href="https://linkedin.com/in/tanishka-jaiswal-b9405b297" target="_blank" rel="noreferrer" className="drawer-social">LinkedIn</a>
          <a href="https://github.com/coderTanishkaJaiswal02" target="_blank" rel="noreferrer" className="drawer-social">GitHub</a>
          <a href="mailto:tanishkaj290@gmail.com" className="drawer-social">Email</a>
        </div>
      </aside>
    </>
  );
}

/* ────────────────────────────────────────
   HERO
──────────────────────────────────────── */
function Hero() {
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({ months: 0, apis: 0, lighthouse: 0 });

  // Particle network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.38 + 0.08,
    }));

    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,102,64,${p.a})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,102,64,${0.07 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  // GSAP hero entrance animation
  useEffect(() => {
    // Split each title word into individual animated characters
    ['hero-w1', 'hero-w2', 'hero-w3'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = el.textContent
        .split('')
        .map((c) => `<span class="char">${c}</span>`)
        .join('');
    });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero-title .char', { y: 0, duration: 0.85, stagger: 0.035, delay: 0.25 })
      .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, 0.5)
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to('#hero-scroll', { opacity: 1, duration: 0.5 }, 1.1)
      .to('#hero-stats', { opacity: 1, duration: 0.5 }, 1.2);
  }, []);

  // Number counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const targets = { months: 8, apis: 10, lighthouse: 95 };
      Object.keys(targets).forEach((key) => {
        let cur = 0;
        const target = targets[key];
        const step = target / 60;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          setCounts((prev) => ({ ...prev, [key]: Math.round(cur) }));
          if (cur >= target) clearInterval(t);
        }, 28);
      });
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-grid" />
      <div className="hero-gradient" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse" />&nbsp;Available for opportunities
        </div>
        <h1 className="hero-title">
          <span className="line">
            <span id="hero-w1">FULL</span>&nbsp;
            <span id="hero-w2" className="accent">STACK</span>
          </span>
          <span className="line">
            <span id="hero-w3">DEVELOPER</span>
          </span>
        </h1>
        <p className="hero-sub">
          Building scalable, enterprise-grade applications using{' '}
          <strong style={{ color: '#ff9a70' }}>
            Java · Spring Boot · Microservices · React.js
          </strong>
          . Turning complex requirements into clean, fault-tolerant solutions.
        </p>
        <div className="hero-actions">
          <a href="#projects-wrap" className="btn-primary">View Projects &nbsp;→</a>
          <a href="#contact" className="btn-secondary">Let's Talk &nbsp;↗</a>
        </div>
      </div>

      <div className="hero-scroll" id="hero-scroll">
        <div className="scroll-line" />
        <span>SCROLL TO EXPLORE</span>
      </div>

      <div className="hero-stats" id="hero-stats">
        <div className="stat-item">
          <span className="stat-num">{counts.months}+</span>
          <span className="stat-lbl">MONTHS EXP</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{counts.apis}+</span>
          <span className="stat-lbl">APIS BUILT</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{counts.lighthouse}+</span>
          <span className="stat-lbl">LIGHTHOUSE</span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   ABOUT
──────────────────────────────────────── */
function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    animateFadeUps(el);

    el.querySelectorAll('.skill-fill').forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 88%',
        onEnter: () => { bar.style.width = bar.dataset.w + '%'; },
      });
    });
  }, []);

  return (
    <section id="about" className="section-border" ref={sectionRef}>
      <div className="section-wrap">
        <div className="about-inner">

          <div className="fade-up">
            <div className="section-label">About Me</div>
            <h2 className="section-h" style={{ marginBottom: '28px' }}>
              Building systems<br />that{' '}
              <em style={{ fontStyle: 'normal', color: '#ff6640' }}>scale</em>,<br />
              code that lasts
            </h2>
            <p className="about-text">
              I'm a <strong>Full Stack Developer</strong> with 8+ months of hands-on internship
              experience architecting enterprise-grade applications. Currently pursuing MCA at
              Medi-Caps University, Indore — CGPA 8.4/10.
            </p>
            <p className="about-text">
              Specialised in <strong>secure RESTful API design</strong>, JWT + OAuth2 auth systems,
              microservices architecture, and high-performance React.js frontends. Shipped features
              end-to-end across full sprint cycles independently.
            </p>
            <div className="about-tags">
              {['Java 11+/17', 'Spring Boot', 'React.js', 'Microservices', 'JWT · OAuth2',
                'MySQL', 'MongoDB', 'Docker', 'JUnit · Mockito', 'RBAC', 'PWA', 'Git · CI/CD',
              ].map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div className="skills-col fade-up">
            <div className="section-label">Technical Proficiency</div>
            <div style={{ height: '14px' }} />
            {SKILLS.map((s) => (
              <div className="skill-item" key={s.name}>
                <div className="skill-head">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
                <div className="skill-bg">
                  <div className="skill-fill" data-w={s.pct} />
                </div>
              </div>
            ))}
            <div className="cert-box">
              <div className="cert-label">CERTIFICATIONS</div>
              <div className="cert-text">
                → Spring Boot — Scaler Academy<br />
                → Java &amp; DSA — Infosys Springboard<br />
                → Code Master — First Round Cleared
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   PROJECT CARD
──────────────────────────────────────── */
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-card-bg" style={{ background: project.bg }} />
      <div className={`project-card-base${hovered ? ' hidden' : ''}`}>
        <div className="p-type">{project.type}</div>
        <div className="p-name">{project.name}</div>
      </div>
      <div className={`project-card-hover${hovered ? ' visible' : ''}`}>
        <div className="ph-name">{project.revealName}</div>
        <div className="ph-desc">{project.desc}</div>
        <div className="p-tags">
          {project.tags.map((t) => <span key={t} className="p-tag">{t}</span>)}
        </div>
        <div className="p-links">
          <a href={project.link} target="_blank" rel="noreferrer" className="p-link">
            ↗ {project.link === '#' ? 'Live Product' : 'GitHub'}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   PROJECTS
──────────────────────────────────────── */
function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    animateFadeUps(sectionRef.current);

    ScrollTrigger.create({
      trigger: trackRef.current,
      start: 'top 90%',
      onEnter: () => {
        gsap.to('.project-card', { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
      },
    });

    // Mouse drag to scroll
    const track = trackRef.current;
    let down = false, startX = 0, sl = 0;
    const onDown = (e) => { down = true; track.style.cursor = 'grabbing'; startX = e.pageX - track.offsetLeft; sl = track.scrollLeft; };
    const onUp = () => { down = false; track.style.cursor = ''; };
    const onMove = (e) => { if (!down) return; e.preventDefault(); track.scrollLeft = sl - (e.pageX - track.offsetLeft - startX) * 1.5; };
    track.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    track.addEventListener('mousemove', onMove);
    return () => {
      track.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      track.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div id="projects-wrap" ref={sectionRef}>
      <div className="projects-header fade-up">
        <div className="section-label">Featured Work</div>
        <h2 className="section-h" style={{ marginBottom: 0 }}>Projects</h2>
        <p style={{ color: 'rgba(240,240,240,.45)', fontSize: '.82rem', fontFamily: 'JetBrains Mono,monospace', marginTop: '12px' }}>
          Hover to reveal · Drag to browse
        </p>
      </div>
      <div className="netflix-row fade-up">
        <div className="netflix-row-title">
          <span className="row-icon">▶</span> Full Stack &amp; Backend
        </div>
        <div className="netflix-track" ref={trackRef}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   INTERNSHIP
──────────────────────────────────────── */
function Internship() {
  const sectionRef = useRef(null);

  useEffect(() => {
    animateFadeUps(sectionRef.current);

    ScrollTrigger.create({
      trigger: '.timeline',
      start: 'top 82%',
      onEnter: () => {
        gsap.to('.tl-item', { opacity: 1, y: 0, stagger: 0.28, duration: 1, ease: 'power3.out' });
      },
    });
  }, []);

  return (
    <section id="internship" className="section-border" ref={sectionRef}>
      <div className="section-wrap">
        <div className="section-label">Work Experience</div>
        <h2 className="section-h fade-up">
          Where I've shipped{' '}
          <em style={{ fontStyle: 'normal', color: '#ff6640' }}>real</em> work
        </h2>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className="tl-item">
              <div className="tl-dot" />
              <div className="tl-period">{item.period}</div>
              <div className="tl-company">{item.company}</div>
              <div className="tl-role">{item.role}</div>
              <ul className="tl-list">
                {item.achievements.map((a, j) => <li key={j}>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   CONTACT
──────────────────────────────────────── */
function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  useEffect(() => { animateFadeUps(sectionRef.current); }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // ── 🔧 Uncomment & set your Spring Boot URL ───────────────────────────
    // const BACKEND_URL = 'http://localhost:8080/api/contact';
    // try {
    //   const res = await fetch(BACKEND_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   });
    //   if (!res.ok) throw new Error('Server error');
    //   setStatus('success');
    //   setForm({ name: '', email: '', subject: '', message: '' });
    //   setTimeout(() => setStatus(null), 4500);
    // } catch {
    //   setStatus('error');
    // }
    // ─────────────────────────────────────────────────────────────────────

    // Demo simulation — remove when backend is ready
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(null), 4500);
  };

  return (
    <section id="contact" className="section-border" ref={sectionRef}>
      <div className="section-wrap">
        <div className="contact-inner">

          <div className="fade-up">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-h">
              Let's build<br />something<br />
              <em style={{ fontStyle: 'normal', color: '#ff6640' }}>great</em> together
            </h2>
            <p className="contact-desc">
              Actively seeking full-time engineering roles. Whether it's a position, collaborative
              project, or just a conversation — I'm genuinely interested.
            </p>
            <div className="contact-info">
              {CONTACT_INFO.map(({ icon, text, href }) => (
                <div key={text} className="ci-item">
                  <div className="ci-icon">{icon}</div>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer">{text}</a>
                    : <span>{text}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="fg">
                  <input type="text" name="name" placeholder="Your Name"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="fg">
                  <input type="email" name="email" placeholder="Email Address"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="fg">
                <input type="text" name="subject" placeholder="Subject (e.g. Job Opportunity)"
                  value={form.subject} onChange={handleChange} />
              </div>
              <div className="fg">
                <textarea name="message" placeholder="Your message..."
                  value={form.message} onChange={handleChange} required />
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={status === 'sending'}
                style={status === 'success' ? { background: '#22c55e' } : {}}
              >
                {status === 'sending' ? 'Sending...'
                  : status === 'success' ? '✓ Message Sent!'
                    : 'Send Message →'}
              </button>
              {status === 'success' && (
                <div className="form-msg success">// Message received. I'll respond within 24 hours.</div>
              )}
              {status === 'error' && (
                <div className="form-msg error">// Error sending. Email me at tanishkaj290@gmail.com</div>
              )}
            </form>
            {/* <div className="backend-note">
              <span style={{ color: '#ff6640' }}>{'// BACKEND NOTE:'}</span>{' '}
              Uncomment the <span style={{ color: '#ff9a70' }}>fetch()</span> block in{' '}
              <span style={{ color: '#ff9a70' }}>Contact</span> and set your Spring Boot URL.
              <br />e.g.{' '}
              <span style={{ color: 'rgba(240,240,240,.6)' }}>POST /api/contact</span>
              {' '}→ save to DB + send email via JavaMailSender
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   FOOTER
──────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="footer-copy">
        © 2026 Tanishka Jaiswal — Crafted with Java, React &amp; ☕
      </div>
      <div className="footer-soc">
        <a href="https://linkedin.com/in/tanishka-jaiswal-b9405b297" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/coderTanishkaJaiswal02" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:tanishkaj290@gmail.com">Email</a>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────
   APP ROOT
──────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Internship />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  );
}
