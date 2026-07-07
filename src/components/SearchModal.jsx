import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Calendar, Box, FileText, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, data, setCurrentPage, setSelectedItem }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter content
  const filteredPrograms = data.programs.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.overview.toLowerCase().includes(query.toLowerCase())
  );

  const filteredEvents = data.events.filter(e => 
    e.title.toLowerCase().includes(query.toLowerCase()) || 
    e.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = data.articles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.summary.toLowerCase().includes(query.toLowerCase())
  );

  const filteredResources = data.resources.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.description.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredPrograms.length + filteredEvents.length + filteredArticles.length + filteredResources.length;

  const handleItemClick = (pageId, item) => {
    setCurrentPage(pageId);
    if (setSelectedItem) {
      setSelectedItem(item);
    }
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '4rem 1rem 1rem 1rem',
      zIndex: 1000,
    }} onClick={onClose}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '650px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.12)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <Search size={20} color="var(--accent-orange)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search programs, articles, events, playbooks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flexGrow: 1,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.05rem',
              outline: 'none',
              width: '100%'
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results Area */}
        <div style={{
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          textAlign: 'left'
        }}>
          {query.trim() === '' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Type to search Proactive I Knowledge Platform</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Try: "Systems thinking", "Design Thinking", "Empathy", "Workbook"</span>
            </div>
          ) : totalResults === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
              <span>No results found matching "{query}"</span>
            </div>
          ) : (
            <>
              {/* Programs */}
              {filteredPrograms.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Box size={14} color="var(--accent-orange)" />
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Programs ({filteredPrograms.length})</h5>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredPrograms.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => handleItemClick('programs', p)}
                        className="search-item"
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#fff' }}>{p.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.duration} • {p.pricing}</div>
                        </div>
                        <ArrowRight size={14} className="search-arrow" style={{ opacity: 0.5, transition: 'var(--transition-fast)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {filteredEvents.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Calendar size={14} color="var(--accent-gold)" />
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Events ({filteredEvents.length})</h5>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredEvents.map(e => (
                      <div 
                        key={e.id}
                        onClick={() => handleItemClick('events', e)}
                        className="search-item"
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#fff' }}>{e.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{e.date} • {e.venue}</div>
                        </div>
                        <ArrowRight size={14} className="search-arrow" style={{ opacity: 0.5, transition: 'var(--transition-fast)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles (Learning Hub) */}
              {filteredArticles.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <BookOpen size={14} color="var(--accent-blue)" />
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Articles ({filteredArticles.length})</h5>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredArticles.map(a => (
                      <div 
                        key={a.id}
                        onClick={() => handleItemClick('learning-hub', a)}
                        className="search-item"
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#fff' }}>{a.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{a.category} • {a.readTime}</div>
                        </div>
                        <ArrowRight size={14} className="search-arrow" style={{ opacity: 0.5, transition: 'var(--transition-fast)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {filteredResources.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <FileText size={14} color="var(--accent-purple)" />
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Resources ({filteredResources.length})</h5>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredResources.map(r => (
                      <div 
                        key={r.id}
                        onClick={() => handleItemClick('resources', r)}
                        className="search-item"
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#fff' }}>{r.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.type} • {r.fileSize}</div>
                        </div>
                        <ArrowRight size={14} className="search-arrow" style={{ opacity: 0.5, transition: 'var(--transition-fast)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style>{`
        .search-item:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .search-item:hover .search-arrow {
          transform: translateX(4px);
          opacity: 1 !important;
          color: var(--accent-orange);
        }
      `}</style>
    </div>
  );
}
