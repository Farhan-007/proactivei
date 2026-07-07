import React, { useRef } from 'react';
import { ArrowRight, Sparkles, Compass, Users, CheckCircle, Flame, Calendar, Award, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function Home({ programs, events, setCurrentPage, setSelectedBookingItem, setIsBookingOpen }) {
  const blocksScrollRef = useRef(null);
  const featuredPrograms = programs.filter(p => p.featured);
  const upcomingEvents = events.filter(e => e.type === 'upcoming').slice(0, 2);

  const stats = [
    { number: "12,000+", label: "Mindsets Transformed", icon: <Users size={20} color="var(--accent-orange)" /> },
    { number: "150+", label: "Workshops Conducted", icon: <Flame size={20} color="var(--accent-gold)" /> },
    { number: "94%", label: "Iterative Success Rate", icon: <CheckCircle size={20} color="var(--accent-blue)" /> },
    { number: "35+", label: "Partner Institutions", icon: <Award size={20} color="var(--accent-purple)" /> }
  ];

  const handleProgramRegister = (e, program) => {
    e.stopPropagation();
    setSelectedBookingItem(program);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '5rem' }}>

      {/* 1. Tony Robbins-Inspired Immersive Hero Section */}
      <section className="hero-container" style={{
        position: 'relative',
        margin: '.5rem auto',
        width: 'calc(100% - 2rem)',
        maxWidth: '1280px',
        minHeight: '520px',
        borderRadius: '24px',
        background: 'var(--hero-gradient)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '4.5rem',
        transition: 'var(--transition-smooth)'
      }}>
        {/* Abstract glowing sunset pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '4rem',
          width: '100%',
          zIndex: 2,
          position: 'relative'
        }}>
          {/* Left Column: Headline and Pill CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', textAlign: 'left' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#fff',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              width: 'fit-content'
            }}>
              <Sparkles size={13} color="var(--accent-orange)" /> SYSTEMIC HUMAN INNOVATION
            </div>

            <h1 className="hero-title" style={{
              fontSize: '3.6rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#fff',
              margin: 0,
              fontFamily: 'var(--font-sans)'
            }}>
              Develop humans before developing products.
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: '1.65',
              maxWidth: '540px',
              margin: 0
            }}>
              Proactive I is an innovation-driven human development initiative. Rather than functioning as a traditional training institute, we design transformative experiences to redesign the way you observe, think, create, collaborate, and make decisions.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.6rem 1.25rem',
              borderRadius: '12px',
              width: 'fit-content'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>
                <MapPin size={15} style={{ color: 'var(--accent-orange)' }} />
                Satna, Madhya Pradesh
              </div>
              <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>
                <Calendar size={15} style={{ color: 'var(--accent-orange)' }} />
                24–26 July 2026
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  const nextEvent = events.find(e => e.type === 'upcoming');
                  if (nextEvent) {
                    setSelectedBookingItem(nextEvent);
                    setIsBookingOpen(true);
                  } else {
                    setCurrentPage('programs');
                  }
                }}
                className="btn"
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '1rem 2.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Reserve My Seat <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Floating Miniature Upcoming Event card (similar to Tony Robbins' "Leadership Academy" preview card) */}
          <div className="hero-right" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative'
          }}>
            {events.find(e => e.type === 'upcoming') && (
              (() => {
                const nextEvent = events.find(e => e.type === 'upcoming');
                return (
                  <div className="glass-panel" style={{
                    width: '100%',
                    maxWidth: '350px',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(15, 22, 38, 0.65)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                    textAlign: 'left'
                  }}>
                    {/* Event Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#10B981',
                        display: 'inline-block'
                      }} />
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.75)',
                        letterSpacing: '0.08em'
                      }}>
                        NEXT EVENT
                      </span>
                    </div>

                    {/* Event Visual Card (tinted background) */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(6, 182, 212, 0.18))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      position: 'relative',
                      minHeight: '100px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        color: '#10B981',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.25rem',
                        letterSpacing: '0.03em'
                      }}>
                        PROACTIVE I LEADERSHIP
                      </span>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: '#fff',
                        margin: 0,
                        lineHeight: 1.3
                      }}>
                        {nextEvent.title}
                      </h4>
                    </div>

                    {/* Event meta and button */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.75)'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                          📅 24–26 July 2026
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                          📍 Satna, MP
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBookingItem(nextEvent);
                          setIsBookingOpen(true);
                        }}
                        className="btn btn-sm"
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          color: '#fff',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          borderRadius: '9999px',
                          padding: '0.45rem 1.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.color = '#000000';
                          e.currentTarget.style.borderColor = '#ffffff';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                        }}
                      >
                        Reserve Seat
                      </button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </section>

      {/* 2. Core Philosophy Cards */}
      <section className="container">
        <div className="section-header">
          <span className="section-subtitle">Core Philosophy</span>
          <h2 className="section-title">The Foundation of Better Decisions</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <Compass color="var(--accent-orange)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Innovation is a Learnable Skill</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              We treat creativity not as a spark of luck, but as a systematic methodology that anyone can train and execute with rigor.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <Users color="var(--accent-blue)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Empathy Precedes Execution</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Deep qualitative observation of human contexts reveals hidden problems that standard numbers can never reveal.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <Flame color="var(--accent-purple)" />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Rapid Failure is Progress</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              We design low-cost micro-experiments to isolate variables and validate assumptions in hours instead of months.
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 The 8 Building Blocks Section */}
      <section className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'left' }}>
            <span className="section-subtitle">Ecosystem Curriculum</span>
            <h2 className="section-title" style={{ margin: 0 }}>The 8 Building Blocks of Human Potential</h2>
          </div>

          {/* Scroll navigation arrows */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => {
                if (blocksScrollRef.current) {
                  blocksScrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll left"
              className="btn btn-secondary"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                if (blocksScrollRef.current) {
                  blocksScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll right"
              className="btn btn-secondary"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Slider */}
        <div
          ref={blocksScrollRef}
          className="blocks-carousel"
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            paddingBottom: '1.5rem',
            scrollSnapType: 'x mandatory'
          }}
        >
          {[
            { num: "01", title: "10x Focus", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80", desc: "Train cognitive control, eliminate distraction patterns, and master systems for deep focused execution." },
            { num: "02", title: "Happiness", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&auto=format&fit=crop&q=80", desc: "Apply the science of well-being, gratitude engineering, and emotional resilience to daily life." },
            { num: "03", title: "Personal Strengths", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80", desc: "Identify your unique human capabilities and align them to meaningful real-world problem contexts." },
            { num: "04", title: "Dreams & Action", image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500&auto=format&fit=crop&q=80", desc: "Translate long-term visions into rapid milestone sprints and repeatable daily action loops." },
            { num: "05", title: "Innovation Engineering", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=80", desc: "Master the repeatable, scientific process to frame problems, generate ideas, prototype, and scale solutions." },
            { num: "06", title: "Communication Maestro", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80", desc: "Cultivate qualitative observation, storytelling, collaborative co-creation, and high-impact pitching." },
            { num: "07", title: "Live Health", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=80", desc: "Optimize energy systems, sleep architectures, and physical health to support cognitive longevity." },
            { num: "08", title: "Money Masters", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=80", desc: "Build systems of value creation, financial literacy, resource modeling, and wealth sustainability." }
          ].map((block) => (
            <div
              key={block.num}
              className="hover-grow"
              style={{
                flex: '0 0 310px',
                height: '430px',
                borderRadius: '20px',
                background: `linear-gradient(to bottom, rgba(0,0,0,0.15) 30%, rgba(9,11,26,0.95) 90%), url(${block.image}) center/cover no-repeat`,
                position: 'relative',
                overflow: 'hidden',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                textAlign: 'left',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                scrollSnapAlign: 'start'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 2 }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  color: 'var(--accent-orange)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Proactive I • Pillar {block.num}
                </span>

                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#fff',
                  margin: '0 0 0.25rem 0',
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                  lineHeight: 1.15
                }}>
                  {block.title}
                </h3>

                <p style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: '0.85rem',
                  lineHeight: '1.45',
                  margin: 0
                }}>
                  {block.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hide scrollbar styles */}
        <style>{`
          .blocks-carousel::-webkit-scrollbar {
            display: none;
          }
          .blocks-carousel {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* 3. Metric Dashboard */}
      <section style={{
        background: 'rgba(255, 255, 255, 0.01)',
        borderBlock: '1px solid var(--glass-border)',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {stats.map((stat, i) => (
              <div key={i} className="glass-card" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                background: 'transparent'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>{stat.icon}</div>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {stat.number}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Programs */}
      <section className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          <div>
            <span className="section-subtitle">Academic Tracks</span>
            <h2 className="section-title">Master the Art of Thinking</h2>
          </div>
          <button onClick={() => setCurrentPage('programs')} className="btn btn-secondary desktop-only">
            View All Programs <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {featuredPrograms.map(prog => (
            <div
              key={prog.id}
              className="glass-panel"
              onClick={() => setCurrentPage('programs')}
              style={{
                padding: '2.25rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-primary">{prog.category}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{prog.duration}</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{prog.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flexGrow: 1 }}>{prog.overview}</p>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '700', fontSize: '1.15rem' }}>{prog.pricing}</span>
                <button
                  onClick={(e) => handleProgramRegister(e, prog)}
                  className="btn btn-outline btn-sm"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Upcoming Events Scheduler */}
      <section className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <span className="section-subtitle">Join Live</span>
          <h2 className="section-title">Ecosystem Events</h2>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '850px',
          margin: '0 auto'
        }}>
          {upcomingEvents.map(evt => (
            <div
              key={evt.id}
              className="glass-panel"
              style={{
                padding: '1.5rem 2rem',
                display: 'grid',
                gridTemplateColumns: '150px 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                textAlign: 'left'
              }}
            >
              {/* Date Box */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                paddingRight: '1.5rem'
              }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-orange)', lineHeight: 1 }}>
                  {new Date(evt.date).getDate()}
                </span>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
                  {new Date(evt.date).toLocaleString('default', { month: 'short' })} {new Date(evt.date).getFullYear()}
                </span>
              </div>

              {/* Info Box */}
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{evt.title}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={14} /> {evt.time} • {evt.venue}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setSelectedBookingItem(evt);
                  setIsBookingOpen(true);
                }}
                className="btn btn-primary btn-sm"
              >
                Book Spot
              </button>
            </div>
          ))}
        </div>
      </section>

      {styleQuery}
    </div>
  );
}

const styleQuery = (
  <style>{`
    @media (max-width: 1024px) {
      .hero-container {
        padding: 2.5rem !important;
        min-height: auto !important;
      }
      .hero-grid {
        grid-template-columns: 1fr !important;
        gap: 2.5rem !important;
      }
      .hero-title {
        font-size: 2.4rem !important;
      }
      .hero-right {
        justify-content: center !important;
        align-items: center !important;
      }
    }
    @media (max-width: 768px) {
      div[style*="gridTemplateColumns: 150px"] {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
      }
      div[style*="borderRight: 1px"] {
        border-right: none !important;
        border-bottom: 1px solid rgba(255,255,255,0.08) !important;
        padding-right: 0 !important;
        padding-bottom: 0.75rem !important;
      }
    }
  `}</style>
);
