import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, CheckCircle2, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, bookingItem }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Instagram',
  });
  const [loading, setLoading] = useState(false);
  const [processingName, setProcessingName] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setProcessingName(false);
      setErrorMsg('');
      setTicketId('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !bookingItem) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrorMsg('');
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isWorkshop = bookingItem.id === 'evt-1' || bookingItem.title?.includes("Innovation Engineering");

  const handleWorkshopNext = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setProcessingName(true);
      setTimeout(() => {
        setProcessingName(false);
        setStep(2);
      }, 200);
    }
  };

  const localTicketId = () => {
    const eventID = "IE";
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return eventID + '-SATNA-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const sheetUrl = "https://script.google.com/macros/s/AKfycbxVOBebB5dl4zQUvUhOJcyeSm8wDKzLXpIVIPI1XLxsUiosnmMXXlnGJxp9Q8WiByo-/exec";

    // Normalize phone to match GAS cleanPhone logic
    const rawPhone = formData.phone || "";
    const normalizedPhone = rawPhone.replace(/\D/g, "").replace(/^91(\d{10})$/, "$1");

    // Fast local duplicate check (same browser)
    const registered = JSON.parse(localStorage.getItem("proactivei_registered") || "[]");
    if (registered.includes(normalizedPhone)) {
      setErrorMsg("This phone number is already registered.");
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      phone: normalizedPhone,
      email: formData.email || "",
      source: formData.source || "",
      ticketId: localTicketId(),
    };

    fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setLoading(false);
        if (data && data.success) {
          // Use GAS-generated ticketId (source of truth in sheet)
          registered.push(normalizedPhone);
          localStorage.setItem("proactivei_registered", JSON.stringify(registered));
          setTicketId(data.ticketId || payload.ticketId);
          setStep(3);
        } else {
          // GAS rejected — e.g. duplicate phone from another device
          setErrorMsg(data?.message || "Registration failed. Please try again.");
        }
      })
      .catch(() => {
        setErrorMsg("A network error occurred. Please check your connection and try again.");
        setLoading(false);
      });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1000,
    }} onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '1px solid var(--glass-border)',
          background: 'var(--bg-secondary)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 1.75rem',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {isWorkshop ? 'Special Workshop Reservation' : 'Program Registration'}
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {isWorkshop ? 'Innovation Engineering Workshop' : bookingItem.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', textAlign: 'left' }}>
          {isWorkshop && step !== 3 ? (
            processingName ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4.5rem 0', gap: '1rem' }}>
                <style>{`
                  @keyframes modal-spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
                <div style={{
                  width: '36px',
                  height: '36px',
                  border: '3px solid var(--bg-tertiary)',
                  borderTop: '3px solid var(--accent-orange)',
                  borderRadius: '50%',
                  animation: 'modal-spin 0.6s linear infinite'
                }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Processing details...
                </span>
              </div>
            ) : (
              <form onSubmit={step === 1 ? handleWorkshopNext : handleFormSubmit}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  background: 'var(--bg-tertiary)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={16} style={{ color: 'var(--accent-orange)' }} />
                    <strong>24–26 July 2026</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={16} style={{ color: 'var(--accent-orange)' }} />
                    <strong>Satna, Madhya Pradesh</strong>
                  </div>
                  <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '0.5rem', paddingTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {step === 1 ? 'Step 1: Tell us your name.' : 'Step 2: Contact info to confirm your seat.'}
                  </div>
                </div>

                {step === 1 ? (
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="form-input"
                        style={{ paddingLeft: '2.5rem', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px', height: '42px' }}
                        autoFocus
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Phone Number</label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="form-input"
                          style={{ paddingLeft: '2.5rem', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px', height: '42px' }}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Email (Optional)</label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com (optional)"
                          className="form-input"
                          style={{ paddingLeft: '2.5rem', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px', height: '42px' }}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>How did you hear about us?</label>
                      <select
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        className="form-select"
                        style={{
                          width: '100%',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: '10px',
                          height: '42px',
                          padding: '0 0.75rem',
                          color: 'var(--text-primary)',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="Friend">Friend</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {errorMsg && (
                  <div style={{
                    color: '#EF4444',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                {step === 1 ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      height: '46px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'var(--accent-glow)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                      marginBottom: '1.25rem'
                    }}
                  >
                    Continue <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                      style={{
                        width: '100%',
                        height: '46px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'var(--accent-glow)',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {loading ? 'Reserving Seat...' : 'Reserve My Seat'}
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          textDecoration: 'underline'
                        }}
                      >
                        Back to Name
                      </button>
                    </div>
                  </>
                )}

                <div style={{
                  textAlign: 'center',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                  fontSize: '0.8rem',
                  lineHeight: '1.4',
                  color: 'var(--text-secondary)'
                }}>
                  <strong>No upfront payment.</strong><br />
                  You decide what it's worth after the workshop.
                </div>
              </form>
            )
          ) : step === 3 ? (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                border: '2px dashed #10B981'
              }}>
                <CheckCircle2 size={32} color="#10B981" />
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ✔ Registration Successful
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500', marginBottom: '1.75rem' }}>
                We'll contact you within 24 hours.
              </p>

              {/* WhatsApp Community Banner */}
              <div style={{
                background: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.2)',
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Meanwhile join our WhatsApp Community
                </span>

                <a
                  href="https://chat.whatsapp.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 2rem',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.35)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.25)';
                  }}
                >
                  Join WhatsApp
                </a>
              </div>

              {/* Booking Summary Ticket */}
              <div className="glass-panel" style={{
                padding: '1.25rem',
                border: '1px dashed var(--glass-border)',
                background: 'var(--bg-tertiary)',
                borderRadius: '14px',
                marginBottom: '1.75rem',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ticket Reference:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{ticketId || "Pending Confirmation"}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Event Location:</span>
                  <span style={{ fontWeight: 600 }}>Satna, Madhya Pradesh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phone Number:</span>
                  <span style={{ fontWeight: 600 }}>{formData.phone}</span>
                </div>
                {formData.email && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                    <span style={{ fontWeight: 600 }}>{formData.email}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Channel:</span>
                  <span style={{ fontWeight: 600 }}>{formData.source}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={onClose} className="btn btn-secondary">
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Fallback generic forms for other items */
            <form onSubmit={handleFormSubmit}>
              <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Participant Information</h4>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

