import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../data';
import LogoSVG from './LogoSVG';

/* ────────────────────────────────────────
   NAVBAR — desktop nav + mobile drawer
──────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
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
              <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
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
      </aside>
    </>
  );
}
