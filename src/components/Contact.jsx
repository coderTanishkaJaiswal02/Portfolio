import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField, clearStatus, submitContact } from '../store/contactSlice';
import { CONTACT_INFO } from '../data';
import { animateFadeUps } from '../utils/animations';

/* ────────────────────────────────────────
   CONTACT — Redux-powered form + API
──────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null);
  const dispatch = useDispatch();

  // Read form state + status from Redux store
  const { form, status, error } = useSelector((state) => state.contact);

  useEffect(() => { animateFadeUps(sectionRef.current); }, []);

  // Auto-clear success message after 4.5 s
  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => dispatch(clearStatus()), 4500);
      return () => clearTimeout(t);
    }
  }, [status, dispatch]);

  const handleChange = (e) =>
    dispatch(setField({ field: e.target.name, value: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContact(form)); // fires the async thunk → POST /api/contact
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <section id="contact" className="section-border" ref={sectionRef}>
      <div className="section-wrap">
        <div className="contact-inner">

          {/* ── LEFT: info ── */}
          <div className="fade-up">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-h">
              Let's build<br />something<br />
              <em style={{ fontStyle: 'normal', color: '#ff6640' }}>great</em> together
            </h2>
            <p className="contact-desc">
              Actively seeking full-time engineering roles. Whether it's a position, collaborative
              project, or just a conversation — I'm genuinely interested.
            </p>
            <div className="contact-info">
              {CONTACT_INFO.map(({ icon, text, href }) => (
                <div key={text} className="ci-item">
                  <div className="ci-icon">{icon}</div>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer">{text}</a>
                    : <span>{text}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="fade-up">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="fg">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="fg">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="fg">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (e.g. Job Opportunity)"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="fg">
                <textarea
                  name="message"
                  placeholder="Your message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
                style={isSuccess ? { background: '#22c55e' } : {}}
              >
                {isLoading ? 'Sending...' : isSuccess ? '✓ Message Sent!' : 'Send Message →'}
              </button>

              {isSuccess && (
                <div className="form-msg success">
                  // Message received. I'll respond within 24 hours.
                </div>
              )}
              {isError && (
                <div className="form-msg error">
                  // Error: {error || 'Email me at tanishkaj290@gmail.com'}
                </div>
              )}
            </form>

            {/* <div className="backend-note">
              <span style={{ color: '#ff6640' }}>{'// BACKEND NOTE:'}</span>{' '}
              Set <span style={{ color: '#ff9a70' }}>BACKEND_URL</span> in{' '}
              <span style={{ color: '#ff9a70' }}>store/contactSlice.js</span> to your Spring Boot URL.
              <br />e.g.{' '}
              <span style={{ color: 'rgba(240,240,240,.6)' }}>POST /api/contact</span>
              {' '}→ save to DB + send email via JavaMailSender
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}
