import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Contact from './components/Contact';

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
    <Layout>
      <Home />
    </Layout>
  );
}

