import { useEffect, useRef } from 'react';

/* ────────────────────────────────────────
   CURSOR — custom dot + trailing ring
──────────────────────────────────────── */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top  = my + 'px';
      }
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Event delegation — works for dynamically rendered elements
    const grow   = (e) => { if (e.target.closest('a,button,.project-card,.tag,.tl-item')) ringRef.current?.classList.add('hovered'); };
    const shrink = (e) => { if (e.target.closest('a,button,.project-card,.tag,.tl-item')) ringRef.current?.classList.remove('hovered'); };
    document.addEventListener('mouseover',  grow);
    document.addEventListener('mouseout',   shrink);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  grow);
      document.removeEventListener('mouseout',   shrink);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
