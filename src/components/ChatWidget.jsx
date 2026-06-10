import { useState, useRef, useEffect } from 'react';

/* ── System prompt: all of Tanishka's portfolio knowledge ── */
const SYSTEM_PROMPT = `You are TJ-AI, the personal portfolio assistant for Tanishka Jaiswal — a Full Stack Developer based in Indore, India. You speak on her behalf to help recruiters, collaborators, and visitors learn about her.

PERSONALITY:
- Professional, confident, and friendly
- Concise — give crisp answers unless more depth is asked
- Enthusiastic about technology and problem-solving
- Always speak as "Tanishka" or "she/her" when referring to the portfolio owner

ABOUT TANISHKA:
- Full Stack Developer with 8+ months of internship experience
- MCA student at Medi-Caps University, Indore — CGPA 8.4/10
- BCA from Govt. Holkar Science College, Indore — CGPA 7.0/10
- Email: tanishkaj290@gmail.com | Phone: +91-9009222448
- LinkedIn: linkedin.com/in/tanishka-jaiswal-b9405b297
- GitHub: github.com/coderTanishkaJaiswal02
- Location: 892 E Scheme No. 51, Indore, India
- Currently AVAILABLE for full-time opportunities

TECHNICAL SKILLS:
- Languages: Java 11+/17, JavaScript (ES6+), HTML5, CSS3, SQL
- Frameworks: Spring Boot, Spring Cloud, Spring MVC, RESTful APIs, Microservices, React.js, React Native (familiar)
- Architecture: Microservices, Event-Driven Systems, MVC, Layered Architecture, API Gateway
- Security: JWT, OAuth2, RBAC, Secure CRUD, OWASP best practices
- Databases: MySQL (schema design, query optimisation, index tuning), MongoDB
- DevOps & Cloud: Docker (familiar), Kubernetes (familiar), CI/CD (GitHub Actions, Jenkins), AWS Lambda (familiar)
- Testing: JUnit, Mockito, Jest, Postman
- Tools: Git, GitHub, IntelliJ IDEA, VS Code
- CS Fundamentals: DSA, OOP, System Design, High Availability & Fault Tolerance

WORK EXPERIENCE:

1. Full Stack Developer Intern @ Zoomcode Technology LLP (Jan 2025 – Apr 2025)
   - Architected RESTful microservices using Spring Boot with layered controller → service → repository design
   - Delivered end-to-end full-stack features independently — React.js UI to backend API — within sprint timelines
   - Implemented JWT-based authentication with RBAC following OAuth2 security principles
   - Resolved MySQL performance bottlenecks through schema refactoring, index optimisation, and query tuning
   - Wrote unit tests using JUnit and Mockito; validated API contracts with Postman
   - Collaborated cross-functionally with design and product teams

2. Frontend Developer Intern @ 51 Digital Media (Aug 2024 – Dec 2024)
   - Engineered modular React.js component libraries for SaaS dashboards
   - Implemented Progressive Web App capabilities — service workers, offline caching, push notifications
   - Designed and consumed 10+ RESTful APIs with robust error handling and optimistic UI updates
   - Built Hello NFC Platform frontend integrated with hardware NFC/DVC APIs
   - Achieved 95+ Lighthouse performance score on a live product via Core Web Vitals optimisations

PROJECTS:

1. ThinkerTheorist Blog Platform (Java, Spring Boot, MySQL, React.js, JWT, REST)
   - Full-stack CMS from scratch with relational DB schema, REST API, layered Spring Boot backend, secure React.js frontend
   - JWT authentication with OAuth2-style RBAC (Admin/Author/Reader)
   - OWASP best practices: SQL injection, XSS, CSRF prevention
   - Clean microservice-aligned architecture with modular controllers, service interfaces, and repository layers

2. Portfolio Website (HTML5, CSS3, JavaScript, PWA)
   - Production-deployed, 95+ Lighthouse score
   - Performance budgeting, semantic HTML5, WCAG accessibility compliance

CERTIFICATIONS:
- Spring Boot — Scaler Academy (comprehensive backend curriculum)
- Java & DSA — Infosys Springboard
- Code Master Certification — First Round Cleared (competitive programming)

KEY STRENGTHS:
- Scalable Microservices Design (Spring Boot layered architecture)
- Security Best Practices (JWT, OAuth2, RBAC, OWASP)
- Full-Stack Ownership (end-to-end React UI to Spring Boot API)
- Performance Optimisation (DB indexing, query tuning, 95+ Lighthouse scores)

RESPONSE RULES:
- If asked about salary expectations, say Tanishka is open to discussion based on the role and company.
- If asked something personal not in her portfolio, politely redirect to her professional work.
- If asked to apply or contact, provide her email: tanishkaj290@gmail.com
- Keep answers under 150 words unless the visitor asks for more detail.
- Use bullet points for lists, plain text for short answers.
- Never make up projects or skills not listed above.`;

/* ── Message bubble ── */
function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-msg ${isUser ? 'chat-msg-user' : 'chat-msg-ai'}`}>
      {!isUser && (
        <div className="chat-avatar">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="#ff6640" strokeWidth="1.2"/>
            <circle cx="12" cy="12" r="3" fill="#ff6640"/>
            <line x1="12" y1="1" x2="5" y2="7"  stroke="#ff6640" strokeWidth="1.2" strokeOpacity=".6"/>
            <line x1="12" y1="1" x2="19" y2="7" stroke="#ff6640" strokeWidth="1.2" strokeOpacity=".6"/>
            <circle cx="5"  cy="7"  r="1.5" fill="#ff6640" fillOpacity=".7"/>
            <circle cx="19" cy="7"  r="1.5" fill="#ff6640" fillOpacity=".7"/>
            <text x="8.5" y="16" fill="#fff" fontSize="5.5" fontFamily="Syne,sans-serif" fontWeight="800">TJ</text>
          </svg>
        </div>
      )}
      <div className="chat-bubble">
        {msg.content.split('\n').map((line, i) => (
          <span key={i}>{line}{i < msg.content.split('\n').length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Typing indicator ── */
function TypingDots() {
  return (
    <div className="chat-msg chat-msg-ai">
      <div className="chat-avatar">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" stroke="#ff6640" strokeWidth="1.2"/>
          <circle cx="12" cy="12" r="3" fill="#ff6640"/>
          <line x1="12" y1="1" x2="5"  y2="7" stroke="#ff6640" strokeWidth="1.2" strokeOpacity=".6"/>
          <line x1="12" y1="1" x2="19" y2="7" stroke="#ff6640" strokeWidth="1.2" strokeOpacity=".6"/>
          <circle cx="5"  cy="7" r="1.5" fill="#ff6640" fillOpacity=".7"/>
          <circle cx="19" cy="7" r="1.5" fill="#ff6640" fillOpacity=".7"/>
          <text x="8.5" y="16" fill="#fff" fontSize="5.5" fontFamily="Syne,sans-serif" fontWeight="800">TJ</text>
        </svg>
      </div>
      <div className="chat-bubble typing-bubble">
        <span className="dot" /><span className="dot" /><span className="dot" />
      </div>
    </div>
  );
}

/* ── Suggested prompts ── */
const SUGGESTED = [
  'What are your top skills?',
  'Tell me about your internships',
  'What projects have you built?',
  'Are you available for hire?',
];

/* ── Main ChatWidget ── */
export default function ChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm TJ-AI — Tanishka's portfolio assistant. Ask me anything about her skills, projects, or experience!",
    },
  ]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [hasNew,   setHasNew]   = useState(true);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const newHistory = [...messages, { role: 'user', content: userText }];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      /* ─────────────────────────────────────────────────────────────────
         OPTION A (recommended for production):
         Route through your Spring Boot backend → it calls Anthropic API
         Your Spring Boot controller:

         @PostMapping("/api/chat")
         public ResponseEntity<Map<String,String>> chat(@RequestBody Map<String,Object> body) {
           // Call https://api.anthropic.com/v1/messages with server-side API key
           // Return { "reply": "..." }
         }

         Then use: const res = await fetch('/api/chat', { ... })
         and:      const data = await res.json(); reply = data.reply;
      ────────────────────────────────────────────────────────────────── */

      /* ─────────────────────────────────────────────────────────────────
         OPTION B (dev only — exposes key in browser):
         Set VITE_ANTHROPIC_API_KEY in your .env file

         const res = await fetch('https://api.anthropic.com/v1/messages', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
             'anthropic-version': '2023-06-01',
             'anthropic-dangerous-allow-browser': 'true',
           },
           body: JSON.stringify({
             model: 'claude-sonnet-4-20250514',
             max_tokens: 512,
             system: SYSTEM_PROMPT,
             messages: newHistory,
           }),
         });
         const data = await res.json();
         reply = data.content[0].text;
      ────────────────────────────────────────────────────────────────── */

      // ── Active implementation: Spring Boot backend ──
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data  = await res.json();
      const reply = data.reply || data.content?.[0]?.text || 'Sorry, I could not get a response.';

      setMessages([...newHistory, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: `⚠️ Backend not connected yet.\n\nTo enable the chat:\n1. Uncomment Option A or B in ChatWidget.jsx\n2. Set up your Spring Boot /api/chat endpoint\n\nFor now: reach Tanishka directly at tanishkaj290@gmail.com`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── Chat window ── */}
      <div className={`chat-window ${open ? 'chat-window-open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-status-dot" />
            <div>
              <div className="chat-header-title">TJ&thinsp;·&thinsp;AI</div>
              <div className="chat-header-sub">Portfolio Assistant · Online</div>
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts — shown when only greeting is present */}
        {messages.length === 1 && !loading && (
          <div className="chat-suggestions">
            {SUGGESTED.map((s) => (
              <button key={s} className="chat-suggest-btn" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask about skills, projects, availability…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            disabled={loading}
          />
          <button
            className="chat-send"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10L17 10M17 10L11 4M17 10L11 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="chat-footer">Powered by Claude AI · Tanishka's portfolio assistant</div>
      </div>

      {/* ── Floating trigger button ── */}
      <button
        className={`chat-fab ${open ? 'chat-fab-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="10" r="1" fill="white"/>
            <circle cx="12" cy="10" r="1" fill="white"/>
            <circle cx="16" cy="10" r="1" fill="white"/>
          </svg>
        )}
        {hasNew && !open && <span className="chat-fab-badge" />}
      </button>
    </>
  );
}
