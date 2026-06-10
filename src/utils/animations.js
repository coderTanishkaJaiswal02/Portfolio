import gsap from 'gsap';

/* Animate all .fade-up elements inside a container ref */
export const animateFadeUps = (container) => {
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
