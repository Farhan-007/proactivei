import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Clock, ArrowLeft, User, Calendar, Tag } from 'lucide-react';

export default function LearningHub({ articles, selectedItem, setSelectedItem }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Research', 'Insights', 'Toolkits', 'Case Studies'];

  // Sync search selected item (if clicking a search result in the global search modal)
  const activeArticle = selectedItem && articles.find(a => a.id === selectedItem.id);

  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (art) => {
    setSelectedItem(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeed = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {activeArticle ? (
        /* --- ARTICLE DETAIL VIEW --- */
        <article style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'left', padding: '4rem 0' }}>
          {/* Back Action */}
          <button 
            onClick={handleBackToFeed}
            className="btn btn-secondary btn-sm"
            style={{ marginBottom: '2.5rem', gap: '0.35rem' }}
          >
            <ArrowLeft size={16} /> Back to Learning Hub
          </button>

          {/* Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span className="badge badge-primary">{activeArticle.category}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={14} /> {activeArticle.readTime}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={14} /> {activeArticle.date}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '2.85rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '2rem',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}>
            {activeArticle.title}
          </h1>

          {/* Author info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--glass-border)',
            marginBottom: '2rem'
          }}>
            <img 
              src={activeArticle.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
              alt={activeArticle.author?.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{activeArticle.author?.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activeArticle.author?.role}</span>
            </div>
          </div>

          {/* Summary Quote */}
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--accent-orange)',
            borderLeft: '3px solid var(--accent-orange)',
            paddingLeft: '1.5rem',
            margin: '2rem 0',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}>
            "{activeArticle.summary}"
          </p>

          {/* Content Body Rendering */}
          <div 
            className="article-body-content"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
            dangerouslySetInnerHTML={{ 
              __html: activeArticle.content
                // Very basic parser to render header markdown mock to HTML
                .replace(/## (.*)/g, '<h3 style="color:#fff; font-size:1.5rem; margin-top:2.5rem; font-weight:700;">$1</h3>')
                .replace(/\* \*\*(.*?)\*\*(.*)/g, '<li style="margin-left: 1.25rem; font-size: 0.95rem;"><strong style="color:#fff;">$1</strong>$2</li>')
                .replace(/\n\n/g, '<p style="margin-bottom: 0.5rem;"></p>')
            }} 
          />

          {/* Tags */}
          {activeArticle.tags && (
            <div style={{ marginTop: '3.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              {activeArticle.tags.map((tag, i) => (
                <span key={i} className="badge badge-blue" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      ) : (
        /* --- FEED VIEW --- */
        <>
          {/* Page Title */}
          <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
            <span className="section-subtitle">Central Repository</span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Learning Hub</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
              Explore framework documents, research papers, systems playbooks, and insights written by innovation scientists and engineers.
            </p>
          </section>

          {/* Search and Category Filter Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', width: '100%', borderRadius: '9999px', fontSize: '0.85rem', paddingVertical: '0.6rem' }}
              />
            </div>
          </div>

          {/* Articles Feed */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            textAlign: 'left'
          }}>
            {filteredArticles.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                No articles match your selection.
              </div>
            ) : (
              filteredArticles.map(art => (
                <div 
                  key={art.id}
                  onClick={() => handleArticleClick(art)}
                  className="glass-panel hover-grow"
                  style={{
                    padding: '2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{art.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Clock size={12} /> {art.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', lineHeight: '1.3' }}>
                    {art.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', flexGrow: 1, lineHeight: '1.5' }}>
                    {art.summary}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '1rem',
                    marginTop: '0.5rem'
                  }}>
                    <img 
                      src={art.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                      alt={art.author?.name}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{art.author?.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{art.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

    </div>
  );
}
