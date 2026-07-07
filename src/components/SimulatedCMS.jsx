import React, { useState } from 'react';
import { X, Sparkles, Plus, RefreshCw, FileText, Check } from 'lucide-react';

export default function SimulatedCMS({ isOpen, onClose, onAddItem, onResetData }) {
  const [contentType, setContentType] = useState('article');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Dynamic fields
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Insights');
  
  // Program-specific
  const [duration, setDuration] = useState('4 Weeks');
  const [pricing, setPricing] = useState('$399');
  
  // Event-specific
  const [date, setDate] = useState('2026-10-10');
  const [time, setTime] = useState('6:00 PM - 7:30 PM EST');
  const [venue, setVenue] = useState('Online (Zoom)');

  // Resource-specific
  const [resType, setResType] = useState('Template');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let newItem = {
      id: `custom-${Date.now()}`,
      title,
      date: date || new Date().toISOString().split('T')[0]
    };

    if (contentType === 'article') {
      newItem = {
        ...newItem,
        summary,
        content: content || 'Standard content details of the newly created learning hub piece.',
        category,
        tags: [category, 'User Published'],
        author: { name: "Guest Creator", role: "Contributor", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
        readTime: "5 min read",
        featured: false
      };
    } else if (contentType === 'program') {
      newItem = {
        ...newItem,
        overview: summary,
        duration,
        pricing,
        objectives: ["Understand the primary tools and mental methodologies.", "Establish real-world feedback loops."],
        outcomes: ["A complete personal framework for practical problem-solving."],
        audience: ["Innovation Leaders", "Educators", "Students"],
        curriculum: [
          { step: "Session 1", title: "Core Concepts & Frameworks" },
          { step: "Session 2", title: "Active Design Lab" }
        ],
        featured: false
      };
    } else if (contentType === 'event') {
      newItem = {
        ...newItem,
        description: summary,
        time,
        venue,
        speakers: [{ name: "Guest Speaker", role: "Specialist", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" }],
        agenda: [{ time: "Start", title: "Introduction and Key Concepts" }],
        type: "upcoming",
        resources: []
      };
    } else if (contentType === 'resource') {
      newItem = {
        ...newItem,
        type: resType,
        description: summary,
        downloadUrl: "#",
        category: "Free",
        fileSize: "1.5 MB"
      };
    }

    onAddItem(contentType, newItem);
    setSuccessMsg(`Successfully published new ${contentType}!`);
    
    // Clear form
    setTitle('');
    setSummary('');
    setContent('');
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '440px',
      backgroundColor: '#0F1626',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.01)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="var(--accent-orange)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>Creator Studio</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={onResetData}
            title="Reset to default seed data"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.35rem',
              borderRadius: '6px',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.35rem',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div style={{
          background: 'rgba(249, 115, 22, 0.15)',
          color: 'var(--accent-orange)',
          padding: '0.75rem 1.5rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(249, 115, 22, 0.3)'
        }}>
          <Check size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} style={{ padding: '1.5rem', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          Welcome to the Proactive I content manager. Add articles, courses, downloads, or workshops here. It will immediately show up in search results and respective pages!
        </p>

        {/* Content Type Select */}
        <div className="form-group">
          <label className="form-label">Select Content Type</label>
          <select 
            className="form-select"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="article">Learning Hub Article</option>
            <option value="program">Academy Program</option>
            <option value="event">Ecosystem Event</option>
            <option value="resource">Resource Download</option>
          </select>
        </div>

        {/* Title Input */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            required
            placeholder={`Enter ${contentType} title`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Summary / Subtext */}
        <div className="form-group">
          <label className="form-label">
            {contentType === 'article' ? 'Summary' : contentType === 'program' ? 'Overview' : 'Description'}
          </label>
          <textarea
            required
            rows={3}
            placeholder={`Brief description of the ${contentType}...`}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="form-textarea"
            style={{ resize: 'none' }}
          />
        </div>

        {/* Contextual Options: Article */}
        {contentType === 'article' && (
          <>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Insights">Insights</option>
                <option value="Research">Research</option>
                <option value="Toolkits">Toolkits</option>
                <option value="Case Studies">Case Studies</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Body Content (Markdown Supported)</label>
              <textarea
                rows={5}
                placeholder="Write the full post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
              />
            </div>
          </>
        )}

        {/* Contextual Options: Program */}
        {contentType === 'program' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input
                type="text"
                placeholder="e.g. 4 Weeks"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Pricing</label>
              <input
                type="text"
                placeholder="e.g. $499"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        )}

        {/* Contextual Options: Event */}
        {contentType === 'event' && (
          <>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <input
                  type="text"
                  placeholder="e.g. 2:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Venue / Channel</label>
                <input
                  type="text"
                  placeholder="e.g. Zoom Link"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </>
        )}

        {/* Contextual Options: Resource */}
        {contentType === 'resource' && (
          <div className="form-group">
            <label className="form-label">Resource Format</label>
            <select className="form-select" value={resType} onChange={(e) => setResType(e.target.value)}>
              <option value="Template">Interactive Canvas / Template</option>
              <option value="Worksheet">PDF Worksheet / Checklist</option>
              <option value="Playbook">Systems Playbook</option>
              <option value="eBook">E-Book</option>
            </select>
          </div>
        )}

        {/* Submit */}
        <button type="submit" className="btn btn-primary" style={{ marginTop: 'auto', width: '100%', gap: '0.5rem' }}>
          <Plus size={18} /> Publish to Live Feed
        </button>
      </form>
    </div>
  );
}
