import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, BookOpen, Clock, Target, Award, Users } from 'lucide-react';

export default function Programs({ programs, setSelectedBookingItem, setIsBookingOpen }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedProgramId, setExpandedProgramId] = useState(null);

  const categories = ['All', 'Professional', 'Leadership', 'Design', 'Personal Development'];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  const handleToggleExpand = (id) => {
    setExpandedProgramId(expandedProgramId === id ? null : id);
  };

  const handleEnrollClick = (e, program) => {
    e.stopPropagation();
    setSelectedBookingItem(program);
    setIsBookingOpen(true);
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Page Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Academic & Corporate Tracks</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Transforms Minds. Drive Results.</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Explore our immersive training structures. From rapid engineering frameworks to collaborative team coaching, choose a track to build your problem-solving capacity.
        </p>
      </section>

      {/* Categories Filter Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '3rem'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Programs Grid / List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'left'
      }}>
        {filteredPrograms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No programs found in this category.
          </div>
        ) : (
          filteredPrograms.map(prog => {
            const isExpanded = expandedProgramId === prog.id;
            return (
              <div 
                key={prog.id}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'var(--transition-smooth)',
                  border: isExpanded ? '1px solid rgba(249,115,22,0.3)' : '1px solid var(--glass-border)'
                }}
              >
                {/* Accordion Summary Row */}
                <div 
                  onClick={() => handleToggleExpand(prog.id)}
                  style={{
                    padding: '1.75rem 2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{prog.category || 'Workshop'}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{prog.duration}</span>
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '700' }}>{prog.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '650px', margin: 0 }}>
                      {prog.overview}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="desktop-only" style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tuition / Price</span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>{prog.pricing}</span>
                    </div>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanding Content Details */}
                {isExpanded && (
                  <div style={{
                    padding: '0 2rem 2rem 2rem',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(255,255,255,0.01)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                  }}>
                    {/* Grid Columns for Objectives & Outcomes */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2rem',
                      marginTop: '2rem'
                    }}>
                      {/* Left: Objectives */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                          <Target size={18} color="var(--accent-orange)" />
                          <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Core Objectives</h4>
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {prog.objectives?.map((obj, i) => (
                            <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', position: 'relative', paddingLeft: '1.25rem' }}>
                              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-orange)' }}>•</span> {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Outcomes */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                          <Award size={18} color="var(--accent-gold)" />
                          <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Outcomes & Deliverables</h4>
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {prog.outcomes?.map((out, i) => (
                            <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', position: 'relative', paddingLeft: '1.25rem' }}>
                              <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>✓</span> {out}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Target Audience */}
                    {prog.audience && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <Users size={16} color="var(--accent-blue)" />
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Target Audience</h4>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {prog.audience.map((aud, i) => (
                            <span key={i} className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{aud}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Curriculum Timeline */}
                    {prog.curriculum && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                          <BookOpen size={16} color="var(--accent-purple)" />
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Curriculum Breakdown</h4>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          borderLeft: '1px solid rgba(255,255,255,0.06)',
                          paddingLeft: '1.25rem',
                          marginLeft: '0.5rem'
                        }}>
                          {prog.curriculum.map((module, i) => (
                            <div key={i} style={{ position: 'relative' }}>
                              <div style={{
                                position: 'absolute',
                                left: '-25px',
                                top: '4px',
                                width: '9px',
                                height: '9px',
                                borderRadius: '50%',
                                background: 'var(--accent-orange)'
                              }} />
                              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: '600', textTransform: 'uppercase' }}>
                                {module.step}
                              </span>
                              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>
                                {module.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Register Row */}
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      paddingTop: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interested in booking this track for your organization?</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price Per Ticket</span>
                          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-orange)' }}>{prog.pricing}</span>
                        </div>
                        <button 
                          onClick={(e) => handleEnrollClick(e, prog)}
                          className="btn btn-primary"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
