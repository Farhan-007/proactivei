import React, { useState } from 'react';
import { MessageSquare, Flame, Trophy, Award, Send, Users, ShieldCheck } from 'lucide-react';

export default function Community() {
  const [activeChannel, setActiveChannel] = useState('systems-mapping');
  const [commentInput, setCommentInput] = useState('');
  
  // Mock Channel Messages
  const [messages, setMessages] = useState({
    'systems-mapping': [
      { author: "Sarah Jenkins", role: "NexGen Product Lead", text: "Has anyone mapped the positive loop feedback dynamics in supply chains? I'm trying to figure out why scaling always bottlenecks dispatch velocity.", date: "2 hours ago" },
      { author: "Prof. Alan Vance", role: "Cognitive Scientist", text: "Check out chapter 4 of the Systems Playbook. Usually, dispatch bottlenecking is caused by delayed feedback between load-balancing sensors.", date: "1 hour ago" }
    ],
    'design-thinking': [
      { author: "David Kim", role: "UX Designer", text: "When doing empathy interviews for government transit, how do you handle users who refuse to discuss emotional friction?", date: "1 day ago" },
      { author: "Meera Nair", role: "Proactive I Chief Learning Officer", text: "Don't ask about transit directly. Ask them to narrate their morning step-by-step. The emotional friction will leak out in their detailing.", date: "18 hours ago" }
    ],
    'creativity-lab': [
      { author: "Jessie L.", role: "Student Pioneer", text: "The lateral card 'reverse constraints' just helped me redesign a classroom trashcan prototype. So simple but powerful!", date: "3 days ago" }
    ]
  });

  const handlePostMessage = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newMessage = {
      author: "You (Practitioner)",
      role: "Ecosystem Member",
      text: commentInput,
      date: "Just now"
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...prev[activeChannel], newMessage]
    }));
    setCommentInput('');
  };

  const activeMessages = messages[activeChannel] || [];

  const communityChallenges = {
    title: "The Constraint-Based Office Redesign",
    reward: "150 points • Featured on Showcase",
    rules: [
      "Limit your layout redesign to exactly 3 pieces of furniture.",
      "Isolate and remove the object you use the most for 2 hours.",
      "Post a 150-word synthesis of how your cognitive focus changed."
    ]
  };

  const showcaseMembers = [
    { name: "Sarah Jenkins", role: "VP of Product, NexGen", location: "Cincinnati, OH", achievement: "Scaled Last-Mile Innovation Squad from 1 to 5 concurrent tracks.", badge: "Gold Innovator" },
    { name: "Dr. Elena Rostova", role: "Academic Director", location: "Athens, GA", achievement: "Restructured middle-school biology curriculum into experiential loops.", badge: "System Architect" },
    { name: "Robert K. Chen", role: "Civic Innovation Fellow", location: "Seattle, WA", achievement: "Redesigned city transit mapping workflows using user empathy guides.", badge: "Empathy Lead" }
  ];

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Practitioner Ecosystem</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Member Community</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Connect with 5,000+ researchers, engineers, educators, and leaders who use active experimentation systems to reshape their workspaces.
        </p>
      </section>

      {/* Grid Content: Discussion Panel & Weekly Challenge Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '5rem',
        textAlign: 'left'
      }}>
        
        {/* Left: Chat/Forum Panels */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <MessageSquare size={20} color="var(--accent-orange)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Ecosystem Forums</h3>
          </div>

          {/* Channel Selectors */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {Object.keys(messages).map(chan => (
              <button
                key={chan}
                onClick={() => setActiveChannel(chan)}
                className={`btn btn-sm ${activeChannel === chan ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', textTransform: 'none', letterSpacing: 'normal' }}
              >
                #{chan}
              </button>
            ))}
          </div>

          {/* Messages Log Thread */}
          <div style={{
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingRight: '0.5rem',
            maxHeight: '300px'
          }}>
            {activeMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '1rem', 
                  border: '1px solid rgba(255,255,255,0.03)',
                  background: 'rgba(255,255,255,0.01)',
                  borderRadius: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>{msg.author}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.role}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.date}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Form input message */}
          <form onSubmit={handlePostMessage} style={{ display: 'flex', position: 'relative', marginTop: 'auto' }}>
            <input
              type="text"
              required
              placeholder={`Send message to #${activeChannel}...`}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                borderRadius: '9999px',
                paddingRight: '3rem',
                fontSize: '0.85rem',
                paddingVertical: '0.6rem'
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '4px',
                top: '4px',
                bottom: '4px',
                background: 'var(--accent-glow)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000'
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Right: Challenge Sidebar */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <Trophy size={20} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Weekly Challenge</h3>
          </div>

          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>ACTIVE CHALLENGE</span>
            <h4 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{communityChallenges.title}</h4>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{communityChallenges.reward}</span>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {communityChallenges.rules.map((rule, idx) => (
                <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', position: 'relative', paddingLeft: '1.25rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>★</span> {rule}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => alert("Write your synthesis in a comment on #creativity-lab to participate!")} 
            className="btn btn-outline btn-sm"
            style={{ marginTop: 'auto' }}
          >
            Submit Synthesis
          </button>
        </div>

      </div>

      {/* Member Showcase Section */}
      <section style={{ textAlign: 'left' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Impact Makers</span>
          <h2 className="section-title">Practitioner Showcase</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {showcaseMembers.map((member, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={12} /> {member.badge}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.location}</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.25rem' }}>{member.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                <strong>Impact:</strong> {member.achievement}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
