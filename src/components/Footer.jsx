import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNav = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-tertiary)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          {/* Logo & Vision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Proactive I Logo" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.15rem' }}>PROACTIVE I</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Transforming mindsets through experiential learning, systems thinking, and innovation engineering. Developing humans to build a better future.
            </p>
          </div>

          {/* Quick Links: Ecosystem */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--accent-orange)' }}>Ecosystem</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['programs', 'events', 'learning-hub', 'resources'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNav(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links: Organization */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--accent-orange)' }}>Organization</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['about', 'success-stories', 'contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNav(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {item === 'success-stories' ? 'Impact Stories' : item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', color: 'var(--accent-orange)' }}>Weekly Insights</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Join 5,000+ innovators receiving our weekly breakdowns of systems thinking models.
            </p>
            {subscribed ? (
              <div className="glass-card" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderColor: 'var(--accent-orange)',
                background: 'rgba(59, 130, 246, 0.05)'
              }}>
                <CheckCircle2 size={16} color="var(--accent-orange)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flexGrow: 1,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderTopLeftRadius: '9999px',
                    borderBottomLeftRadius: '9999px',
                    padding: '0.75rem 1.25rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    borderRight: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-glow)',
                    border: 'none',
                    borderTopRightRadius: '9999px',
                    borderBottomRightRadius: '9999px',
                    padding: '0.75rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <span>© 2026 Proactive I. All rights reserved. Designed for Human Design.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
