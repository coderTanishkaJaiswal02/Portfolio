import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../data';
import { animateFadeUps } from '../utils/animations';

/* ────────────────────────────────────────
   INTERNSHIP — work experience timeline
──────────────────────────────────────── */
export default function Internship() {
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
