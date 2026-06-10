import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data';
import { animateFadeUps } from '../utils/animations';

/* ────────────────────────────────────────
   PROJECT CARD — hover reveal
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
   PROJECTS — Netflix-style horizontal scroll
──────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

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
    const onUp   = ()  => { down = false; track.style.cursor = ''; };
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
        <p style={{ color:'rgba(240,240,240,.45)', fontSize:'.82rem', fontFamily:'JetBrains Mono,monospace', marginTop:'12px' }}>
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
