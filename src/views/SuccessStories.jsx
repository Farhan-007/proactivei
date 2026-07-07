import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, ArrowRight, Quote, Percent, Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function SuccessStories({ stories }) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [mindsetCompare, setMindsetCompare] = useState('traditional'); // 'traditional' or 'proactive'

  const activeStory = stories[activeStoryIdx];

  const mindsetDetails = {
    traditional: {
      title: "Traditional Corporate / Academic Flow",
      tagline: "Slow validation cycles, high fear of failure",
      points: [
        { label: "Brainstorming", val: "Waiting for accidental 'strokes of genius' in long, unstructured meetings." },
        { label: "Experimentation", val: "Delayed due to fear of career risk or grades. Failing is penalized." },
        { label: "Planning", val: "6-12 months planning phases trying to map out a flaw-free launch." },
        { label: "Empathy", val: "Relying on numbers, survey sheets, or quantitative spreadsheet templates." }
      ]
    },
    proactive: {
      title: "Proactive I Innovation Cycle",
      tagline: "Rapid testing, scientific design framework",
      points: [
        { label: "Brainstorming", val: "Diverging with structural constraints, lateral triggers, and curiosity cards." },
        { label: "Experimentation", val: "Executing fail-safe micro-experiments with isolated variables in 24 hours." },
        { label: "Planning", val: "Sprinting in rapid feedback loops. Plan evolves dynamically based on data." },
        { label: "Empathy", val: "Immersive observation, customer narratives, and empathy loops." }
      ]
    }
  };

  const activeMindset = mindsetDetails[mindsetCompare];

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Impact Ecosystem</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Success Stories</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          See how corporations, schools, and design squads applied our Innovation Engineering system to accelerate their development velocity.
        </p>
      </section>

      {/* Interactive Before & After Mindset comparison */}
      <section className="glass-panel" style={{
        padding: '3rem 2rem',
        maxWidth: '850px',
        margin: '0 auto 5rem auto',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Interactive Mindset Shift</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Toggle below to compare workflows before and after adopting our frameworks.</p>
          </div>
          
          {/* Toggle Switches */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.35rem', borderRadius: '9999px', border: '1px solid var(--glass-border)' }}>
            <button 
              onClick={() => setMindsetCompare('traditional')}
              className={`btn btn-sm`}
              style={{
                background: mindsetCompare === 'traditional' ? 'var(--accent-glow)' : 'transparent',
                color: mindsetCompare === 'traditional' ? '#000' : 'var(--text-secondary)',
                fontSize: '0.75rem', padding: '0.4rem 1rem'
              }}
            >
              Traditional
            </button>
            <button 
              onClick={() => setMindsetCompare('proactive')}
              className={`btn btn-sm`}
              style={{
                background: mindsetCompare === 'proactive' ? 'var(--accent-glow)' : 'transparent',
                color: mindsetCompare === 'proactive' ? '#000' : 'var(--text-secondary)',
                fontSize: '0.75rem', padding: '0.4rem 1rem'
              }}
            >
              Proactive I Shift
            </button>
          </div>
        </div>

        {/* Mindset Rendered Columns */}
        <div>
          <span style={{ fontSize: '0.75rem', color: mindsetCompare === 'proactive' ? 'var(--accent-orange)' : 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {activeMindset.tagline}
          </span>
          <h4 style={{ fontSize: '1.25rem', color: '#fff', marginTop: '0.25rem', marginBottom: '2rem' }}>{activeMindset.title}</h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {activeMindset.points.map((pt, idx) => (
              <div key={idx} className="glass-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Sparkles size={12} /> {pt.label}
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{pt.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Detailed Cards */}
      <section>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-subtitle">Case Records</span>
          <h2 className="section-title">Institutional Transformation</h2>
        </div>

        {/* Stories Tab switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {stories.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setActiveStoryIdx(idx)}
              className={`btn btn-sm ${activeStoryIdx === idx ? 'btn-primary' : 'btn-secondary'}`}
            >
              {st.clientName}
            </button>
          ))}
        </div>

        {/* Case Study Card */}
        {activeStory && (
          <div className="glass-panel" style={{
            padding: '3rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Metadata and Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={activeStory.logo}
                  alt={activeStory.clientName}
                  style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{activeStory.clientName}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Organization Partnership</span>
                </div>
              </div>

              <h4 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#fff', lineHeight: 1.3 }}>
                "{activeStory.title}"
              </h4>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {activeStory.transformation}
              </p>

              {/* Big Metric Box */}
              <div className="glass-card" style={{
                background: 'rgba(249, 115, 22, 0.05)',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                width: 'fit-content'
              }}>
                <TrendingUp size={24} color="var(--accent-orange)" />
                <div>
                  <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                    {activeStory.metric}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    Measured Growth Index
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Before & After comparison details and Testimonial quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Before/After list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>The Friction (Before)</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{activeStory.before}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', textTransform: 'uppercase', fontWeight: 600 }}>The Innovation Shift (After)</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{activeStory.after}</p>
                </div>
              </div>

              {/* Testimonial Quote */}
              <div style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                position: 'relative'
              }}>
                <Quote size={20} color="var(--accent-orange)" style={{ position: 'absolute', top: '12px', left: '12px', opacity: 0.15 }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem', paddingLeft: '0.5rem' }}>
                  "{activeStory.testimonial?.text}"
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{activeStory.testimonial?.author}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{activeStory.testimonial?.role}</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

    </div>
  );
}
