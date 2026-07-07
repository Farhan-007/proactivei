import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Appointment scheduler state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [appointmentReserved, setAppointmentReserved] = useState(false);

  const datesList = [
    { label: "Wed", dateStr: "July 8" },
    { label: "Thu", dateStr: "July 9" },
    { label: "Fri", dateStr: "July 10" },
    { label: "Mon", dateStr: "July 13" },
    { label: "Tue", dateStr: "July 14" }
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "1:30 PM", "3:00 PM", "4:30 PM"];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const handleReserveAppointment = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime && appointmentName && appointmentEmail) {
      setAppointmentReserved(true);
    }
  };

  const resetAppointment = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setAppointmentName('');
    setAppointmentEmail('');
    setAppointmentReserved(false);
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Connect With Us</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Start the Conversation</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Have questions about our training tracks, corporate bootcamps, or frameworks? Reach out directly or schedule a brief consultation session.
        </p>
      </section>

      {/* Grid: Contact details & Interactive Scheduler */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '5rem',
        textAlign: 'left'
      }}>
        
        {/* Left Column: Direct Message Form & Coordinates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Form Panel */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Send an Inquiry</h3>
            
            {formSubmitted ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(249, 115, 22, 0.05)',
                border: '1px solid var(--accent-orange)',
                borderRadius: '8px',
                color: 'var(--accent-orange)'
              }}>
                <CheckCircle2 size={20} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Message received! We will reply within 24 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" required name="name" value={formData.name} onChange={handleFormChange} placeholder="Enter your name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" required name="email" value={formData.email} onChange={handleFormChange} placeholder="you@example.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea required rows={4} name="message" value={formData.message} onChange={handleFormChange} placeholder="What project challenge are you working on?" className="form-textarea" style={{ resize: 'none' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ gap: '0.5rem', justifyContent: 'center' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Coordinates */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>HQ Coordinates</h3>
            
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', alignItems: 'flex-start' }}>
              <MapPin size={18} color="var(--accent-orange)" style={{ marginTop: '0.15rem' }} />
              <div>
                <span style={{ display: 'block', fontWeight: 600, color: '#fff' }}>Cincinnati Lab</span>
                <span style={{ color: 'var(--text-secondary)' }}>120 Innovation Way, Suite 400, Cincinnati, OH 45202</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', alignItems: 'center' }}>
              <Mail size={18} color="var(--accent-orange)" />
              <div>
                <span style={{ display: 'block', fontWeight: 600, color: '#fff' }}>Email Address</span>
                <a href="mailto:hello@proactivei.edu" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>hello@proactivei.edu</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', alignItems: 'center' }}>
              <Phone size={18} color="var(--accent-orange)" />
              <div>
                <span style={{ display: 'block', fontWeight: 600, color: '#fff' }}>General Hotline</span>
                <a href="tel:+15135550190" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+1 (513) 555-0190</a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Consultation appointment scheduler */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <Calendar size={20} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Consultation Scheduler</h3>
          </div>

          {appointmentReserved ? (
            /* Success confirmation */
            <div style={{ textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <CheckCircle2 size={48} color="var(--accent-gold)" />
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Session Reserved!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                  Confirmed a 30-min innovation advisory meeting with <strong>{appointmentName}</strong> for <strong>{selectedDate.dateStr}</strong> at <strong>{selectedTime}</strong>. Check your inbox for Zoom links.
                </p>
              </div>
              <button onClick={resetAppointment} className="btn btn-secondary btn-sm">Schedule Another</button>
            </div>
          ) : (
            <form onSubmit={handleReserveAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Pick an open date and time slot below to schedule a quick 30-minute diagnostic session with our systems architect.
              </p>

              {/* Date pick list */}
              <div>
                <span className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>1. Select Date</span>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                  {datesList.map(dt => (
                    <button
                      key={dt.dateStr}
                      type="button"
                      onClick={() => { setSelectedDate(dt); setSelectedTime(null); }}
                      className={`btn btn-sm ${selectedDate?.dateStr === dt.dateStr ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flexDirection: 'column', padding: '0.5rem 0.75rem', gap: '0.1rem', minWidth: '60px' }}
                    >
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>{dt.label}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{dt.dateStr.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots picker (shows only if date is selected) */}
              {selectedDate && (
                <div>
                  <span className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>2. Select Time ({selectedDate.dateStr})</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`btn btn-sm ${selectedTime === slot ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                      >
                        <Clock size={12} /> {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Details input (shows only if time is selected) */}
              {selectedTime && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                  <span className="form-label">3. Confirm Details</span>
                  
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter full name" 
                      value={appointmentName} 
                      onChange={(e) => setAppointmentName(e.target.value)} 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="you@example.com" 
                      value={appointmentEmail} 
                      onChange={(e) => setAppointmentEmail(e.target.value)} 
                      className="form-input" 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ gap: '0.5rem', justifyContent: 'center' }}>
                    Book Appointment <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
