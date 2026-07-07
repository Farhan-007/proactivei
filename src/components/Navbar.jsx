"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar({ onSearchClick, creatorMode, setCreatorMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const pathname = usePathname();

  const currentPage = pathname === '/' ? 'home' : pathname.replace(/^\//, '');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'events', label: 'Events' }
  ];

  const exploreLinks = [
    { id: 'learning-hub', label: 'Learning Hub' },
    { id: 'resources', label: 'Resources' },
    { id: 'community', label: 'Community' },
    { id: 'success-stories', label: 'Impact' },
    { id: 'media', label: 'Media' }
  ];

  const rightLinks = [
    { id: 'shop', label: 'Shop' },
    { id: 'contact', label: 'Contact' }
  ];

  const getHref = (pageId) => pageId === 'home' ? '/' : `/${pageId}`;

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '0',
      zIndex: 90,
      margin: '1rem auto',
      width: 'calc(100% - 2rem)',
      maxWidth: '1280px',
      borderRadius: '24px',
      padding: '0.75rem 1.5rem',
      border: '1px solid var(--glass-border)',
      boxShadow: 'var(--glass-shadow)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
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
          <span style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-sans)',
            background: 'linear-gradient(to right, var(--text-primary), var(--text-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            PROACTIVE I
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-only" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={getHref(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === link.id ? 'var(--accent-orange)' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: currentPage === link.id ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                padding: '0.5rem 0.25rem',
                position: 'relative',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              {link.label}
              {currentPage === link.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--accent-glow)',
                  borderRadius: '9999px'
                }} />
              )}
            </Link>
          ))}

          {/* Custom Explore Dropdown Menu */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setExploreDropdownOpen(true)}
            onMouseLeave={() => setExploreDropdownOpen(false)}
          >
            <button
              onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: exploreLinks.map(l => l.id).includes(currentPage) ? 'var(--accent-orange)' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: exploreLinks.map(l => l.id).includes(currentPage) ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                padding: '0.5rem 0.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              Explore <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>

            {exploreDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '160px',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  zIndex: 110,
                  background: 'var(--bg-secondary)'
                }}
              >
                {exploreLinks.map((item) => (
                  <Link
                    key={item.id}
                    href={getHref(item.id)}
                    onClick={() => setExploreDropdownOpen(false)}
                    style={{
                      background: currentPage === item.id ? 'var(--accent-glow)' : 'transparent',
                      border: 'none',
                      color: currentPage === item.id ? '#fff' : 'var(--text-primary)',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== item.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== item.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {rightLinks.map((link) => (
            <Link
              key={link.id}
              href={getHref(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === link.id ? 'var(--accent-orange)' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: currentPage === link.id ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                padding: '0.5rem 0.25rem',
                position: 'relative',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              {link.label}
              {currentPage === link.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--accent-glow)',
                  borderRadius: '9999px'
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* Actions (Search, Mobile Burger) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          position: 'relative'
        }}>

          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Global Search"
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px'
            }}
          >
            <Search size={18} />
          </button>

          {/* Simulated CMS Trigger Button (hidden) */}
          {false && (
            <button
              onClick={() => setCreatorMode(!creatorMode)}
              className={`btn btn-sm ${creatorMode ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: creatorMode ? 'none' : '1px solid rgba(249, 115, 22, 0.4)',
                boxShadow: creatorMode ? '0 0 15px rgba(249, 115, 22, 0.3)' : 'none'
              }}
            >
              <Sparkles size={14} color={creatorMode ? '#000' : 'var(--accent-orange)'} />
              <span className="desktop-only">{creatorMode ? 'Creator Studio (Active)' : 'Creator Space'}</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary mobile-only"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'none', // controlled by media queries in CSS
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            boxShadow: 'var(--glass-shadow)',
            zIndex: 99
          }}
        >
          {[...navLinks, ...exploreLinks, ...rightLinks].map((link) => (
            <Link
              key={link.id}
              href={getHref(link.id)}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === link.id ? 'var(--accent-orange)' : 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: currentPage === link.id ? '600' : '400',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.5rem 0.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                textDecoration: 'none',
                display: 'block',
                transition: 'var(--transition-fast)'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Responsive Inline Styles for Mobile Layout Toggle */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
