import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ────────────────────────────────────────
   HERO — particle canvas + animated title
──────────────────────────────────────── */
export default function Hero() {
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
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a:  Math.random() * 0.38 + 0.08,
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
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q  = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
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
    ['hero-w1', 'hero-w2', 'hero-w3'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = el.textContent
        .split('')
        .map((c) => `<span class="char">${c}</span>`)
        .join('');
    });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero-title .char', { y: 0,        duration: 0.85, stagger: 0.035, delay: 0.25 })
      .to('.hero-badge',        { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to('.hero-sub',          { opacity: 1, y: 0, duration: 0.7 }, 0.5)
      .to('.hero-actions',      { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to('#hero-scroll',       { opacity: 1, duration: 0.5 },       1.1)
      .to('#hero-stats',        { opacity: 1, duration: 0.5 },       1.2);
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
          <a href="#contact"       className="btn-secondary">Let's Talk &nbsp;↗</a>
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
