import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Download, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function Events({ events, setSelectedBookingItem, setIsBookingOpen }) {
  const [activeFilter, setActiveFilter] = useState('upcoming');

  const filteredEvents = events.filter(e => e.type === activeFilter);

  const handleRegisterClick = (evt) => {
    setSelectedBookingItem(evt);
    setIsBookingOpen(true);
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Live Framework Integrations</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Gatherings & Masterclasses</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Participate in interactive panels, system design hackathons, and design-thinking sessions. Connect with practitioners in our global ecosystem.
        </p>
      </section>

      {/* Tabs Filter */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
        <button 
          onClick={() => setActiveFilter('upcoming')}
          className={`btn ${activeFilter === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Upcoming Events
        </button>
        <button 
          onClick={() => setActiveFilter('past')}
          className={`btn ${activeFilter === 'past' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Past Events Archive
        </button>
      </div>

      {/* Events Feed Grid */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        maxWidth: '850px',
        margin: '0 auto',
        textAlign: 'left'
      }}>
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            No {activeFilter} events scheduled currently. Check back soon!
          </div>
        ) : (
          filteredEvents.map(evt => (
            <div 
              key={evt.id}
              className="glass-panel"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Top Row: Date, Title, Venue */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {new Date(evt.date).toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{evt.title}</h3>
                </div>
                {evt.type === 'upcoming' && (
                  <button 
                    onClick={() => handleRegisterClick(evt)}
                    className="btn btn-primary"
                  >
                    Reserve Seat <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{evt.description}</p>

              {/* Time and Place Info */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} color="var(--accent-orange)" /> {evt.time}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} color="var(--accent-orange)" /> {evt.venue}
                </span>
              </div>

              {/* Speakers Section */}
              {evt.speakers && evt.speakers.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>Speakers</h4>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {evt.speakers.map((spk, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={spk.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                          alt={spk.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{spk.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{spk.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agenda Section */}
              {evt.agenda && evt.agenda.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>Session Agenda</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {evt.agenda.map((agItem, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--accent-orange)', fontWeight: 600, minWidth: '70px' }}>{agItem.time}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{agItem.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources Downloads for Past Events */}
              {evt.type === 'past' && evt.resources && evt.resources.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>Downloadable Session Materials</h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {evt.resources.map((res, idx) => (
                      <a 
                        key={idx}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
                      >
                        <Download size={14} /> {res.title} ({res.type})
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Photogrid for Past Events */}
              {evt.type === 'past' && evt.gallery && evt.gallery.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ImageIcon size={14} /> Event Gallery
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {evt.gallery.map((imgUrl, idx) => (
                      <img 
                        key={idx}
                        src={imgUrl}
                        alt={`Gallery ${idx}`}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
