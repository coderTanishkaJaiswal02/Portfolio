import { HashRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor         from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import ChatWidget     from './components/ChatWidget';
import Hero           from './components/Hero';
import About          from './components/About';
import Projects       from './components/Projects';
import Internship     from './components/Internship';
import Contact        from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function Layout({ children }) {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Internship />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"  element={<Layout><Home /></Layout>} />
        <Route path="*"  element={<Layout><NotFound /></Layout>} />
      </Routes>
    </HashRouter>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <h1 style={{ fontSize: '4rem', color: '#ff6640' }}>404</h1>
      <p style={{ color: 'rgba(240,240,240,.6)' }}>Page not found.</p>
      <a href="/" className="btn-primary">← Back Home</a>
    </div>
  );
}
