import React, { useState } from 'react';
import { Compass, Sparkles, Brain, Eye, Shield, Users, RefreshCw, Zap } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('framework');

  const values = [
    { title: "Curiosity", desc: "Always ask 'Why' and 'What if' to uncover hidden paths." },
    { title: "Empathy", desc: "Build for human contexts by walking in their shoes." },
    { title: "Courage", desc: "Embrace the fear of ambiguity and test crazy ideas." },
    { title: "Experimentation", desc: "Treat failure as data. Test quickly, iterate faster." },
    { title: "Systems Thinking", desc: "Analyze connections, feedback loops, and wider context." },
    { title: "Collaboration", desc: "Co-create solutions using diverse cognitive mindsets." }
  ];

  const methodologySteps = [
    { num: "01", title: "Observe Deeply", desc: "Immerse in user environments to spot unexpressed frustrations." },
    { num: "02", title: "Frame Problems", desc: "Convert observations into actionable, systemic questions." },
    { num: "03", title: "Generate & Select", desc: "Diverge to produce wild solutions, then converge with criteria." },
    { num: "04", title: "Prototype & Test", desc: "Construct low-cost mockups to check critical assumptions in hours." },
    { num: "05", title: "Iterate & Scale", desc: "Refine patterns repeatedly and prepare the solution for systems deployment." }
  ];

  return (
    <div style={{ paddingBottom: '5rem' }}>
      
      {/* Editorial Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-subtitle">Who We Are</span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            Transforming how the world observes, <br />
            thinks, and creates.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
            Proactive I is an innovation-driven human development initiative. We are not a traditional training institute. We focus on transforming mindsets through experiential learning, systems thinking, and human-centered problem solving.
          </p>
        </div>
      </section>

      {/* Mission & Vision Split Panel */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Mission</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0 1rem 0' }}>Empower with Frameworks</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              To empower individuals and organizations with the mindset, tools, and methodologies required to solve complex real-world problems through repeatable, scientific innovation.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Vision</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0.5rem 0 1rem 0' }}>Build Sustainable Futures</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              To build a generation of innovators capable of designing sustainable solutions for humanity by combining lateral creativity, scientific thinking, context-driven empathy, and relentless experimentation.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tabs (Human Design Framework vs Innovation Engineering Process) */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button 
            onClick={() => setActiveTab('framework')}
            className={`btn ${activeTab === 'framework' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Human Design Framework
          </button>
          <button 
            onClick={() => setActiveTab('methodology')}
            className={`btn ${activeTab === 'methodology' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Innovation Process
          </button>
        </div>

        {activeTab === 'framework' ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '1rem' }}>Developing Humans Before Products</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  One of Proactive I's foundational concepts is <strong>Human Design</strong>—a framework for developing essential human capabilities required for innovation and meaningful problem-solving.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  Instead of teaching isolated technical skills, the framework emphasizes multiple interconnected dimensions of personal and team cognitive growth.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent-orange)', marginTop: '0.2rem' }}><Brain size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Cognitive Flexibility</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Reframing assumptions and mapping complex alternative perspectives.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent-gold)', marginTop: '0.2rem' }}><Eye size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Unbiased Observation</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Seeing situations clearly without injecting personal or pre-established biases.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ color: 'var(--accent-blue)', marginTop: '0.2rem' }}><RefreshCw size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Resilience Loops</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Embracing failures as essential course corrections in the experimentation cycles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
              {methodologySteps.map((step) => (
                <div key={step.num} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-orange)', opacity: 0.35, fontFamily: 'monospace', lineHeight: 1 }}>
                    {step.num}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Core Values Section */}
      <section className="container">
        <div className="section-header">
          <span className="section-subtitle">Values We Live By</span>
          <h2 className="section-title">The Proactive Mindset</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {values.map((val) => (
            <div 
              key={val.title}
              className="glass-card"
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                borderLeft: '2px solid var(--accent-orange)'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{val.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
