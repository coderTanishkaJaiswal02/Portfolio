/* ────────────────────────────────────────
   LOGO SVG — shared across Navbar / Drawer
──────────────────────────────────────── */
export default function LogoSVG() {
  return (
    <svg className="logo-svg" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="18" stroke="#ff6640" strokeWidth="1.4" />
      <circle cx="19" cy="19" r="3.5" fill="#ff6640" />
      <line x1="19" y1="1"  x2="7.5"  y2="11" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".55" />
      <line x1="19" y1="1"  x2="30.5" y2="11" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".55" />
      <line x1="7.5"  y1="11" x2="7.5"  y2="27" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <line x1="30.5" y1="11" x2="30.5" y2="27" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <line x1="7.5"  y1="27" x2="19"   y2="37" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <line x1="30.5" y1="27" x2="19"   y2="37" stroke="#ff6640" strokeWidth="1.4" strokeOpacity=".3" />
      <circle cx="7.5"  cy="11" r="2.5" fill="#ff6640" fillOpacity=".65" />
      <circle cx="30.5" cy="11" r="2.5" fill="#ff6640" fillOpacity=".65" />
      <text x="13.5" y="23" fill="#ffffff" fontSize="9" fontFamily="Syne,sans-serif" fontWeight="800">TJ</text>
    </svg>
  );
}
