/* ────────────────────────────────────────
   SHARED DATA — imported by all components
──────────────────────────────────────── */

export const PROJECTS = [
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

export const SKILLS = [
  { name: 'Java / Spring Boot', pct: 90 },
  { name: 'React.js / JavaScript ES6+', pct: 88 },
  { name: 'MySQL · MongoDB', pct: 85 },
  { name: 'Microservices Architecture', pct: 82 },
  { name: 'JWT · OAuth2 · RBAC', pct: 80 },
  { name: 'Docker · DevOps · CI/CD', pct: 65 },
];

export const TIMELINE = [
  {
    period: 'JAN 2026 — APR 2026',
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
    period: 'AUG 2025 — DEC 2025',
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

export const CONTACT_INFO = [
  { icon: '📍', text: 'Indore, Madhya Pradesh, India' },
  { icon: '📧', text: 'tanishkaj290@gmail.com', href: 'mailto:tanishkaj290@gmail.com' },
  { icon: '📱', text: '+91 9009222448' },
  { icon: '🔗', text: 'linkedin.com/in/tanishka-jaiswal', href: 'https://linkedin.com/in/tanishka-jaiswal-b9405b297' },
  { icon: '💻', text: 'github.com/coderTanishkaJaiswal02', href: 'https://github.com/coderTanishkaJaiswal02' },
];

export const EDUCATION = [
  { degree: "MCA", institution: "Medi-Caps University, Indore", cgpa: "8.4/10" },
  { degree: "BCA", institution: "Government Holkar Science College, Indore", cgpa: "7.1/10" },
];

export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects-wrap', label: 'Projects' },
  { href: '#internship', label: 'Experience' },
  { href: '#contact', label: 'Contact Me', cta: true },
];
