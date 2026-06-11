import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS, EDUCATION } from '../data';
import { animateFadeUps } from '../utils/animations';

/* ────────────────────────────────────────
   ABOUT — bio, skills, certifications
──────────────────────────────────────── */
export default function About() {
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
              experience architecting enterprise-grade applications. Completed my MCA at
              Medi-Caps University, Indore — CGPA 8.4/10 in 2025.

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
          <div className="education-section fade-up">
            <div className="section-label">Education</div>
            {EDUCATION.map((e) => (
              <p key={e.degree} className="about-text">
                <strong>{e.degree}</strong> – {e.institution}{e.cgpa ? ` (CGPA ${e.cgpa})` : ''}
              </p>
            ))}
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
