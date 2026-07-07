import React, { useState } from 'react';
import { Download, Sparkles, Check, ClipboardList, HelpCircle, ArrowRight, RefreshCcw } from 'lucide-react';

export default function Resources({ resources }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ catalyst: 0, creator: 0, prototyper: 0, traditional: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleDownload = (e, resId) => {
    e.preventDefault();
    if (downloadingId) return;

    setDownloadingId(resId);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadingId(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Quiz Data
  const questions = [
    {
      q: "1. How does your team typically react when an initiative fails?",
      options: [
        { text: "We trace the system loops and feedback triggers to adapt.", type: "catalyst" },
        { text: "We talk to users immediately to figure out what friction they faced.", type: "creator" },
        { text: "We rapidly sketch a different version and test it within 24 hours.", type: "prototyper" },
        { text: "We abandon it or search for who made the error.", type: "traditional" }
      ]
    },
    {
      q: "2. What is the primary factor driving your design process?",
      options: [
        { text: "Structuring mental triggers and lateral constraints.", type: "catalyst" },
        { text: "Conducting qualitative empathy interviews and observation.", type: "creator" },
        { text: "Building cardboard, digital, or paper mockups to test quickly.", type: "prototyper" },
        { text: "Adhering to standard technical specifications & plans.", type: "traditional" }
      ]
    },
    {
      q: "3. How do you map out complex organizational problems?",
      options: [
        { text: "Using systems diagrams, causal loops, and impact matrices.", type: "catalyst" },
        { text: "Creating user personas, empathy maps, and journey paths.", type: "creator" },
        { text: "Building quick models to simulate workflows in real-time.", type: "prototyper" },
        { text: "Holding a standard meeting to list tasks in spreadsheet tables.", type: "traditional" }
      ]
    },
    {
      q: "4. What is your preferred speed of validation?",
      options: [
        { text: "Evaluating systemic risks and metrics before scaling.", type: "catalyst" },
        { text: "Conducting iterative co-creation sessions with customers.", type: "creator" },
        { text: "Launching low-cost experiments within 1-2 days.", type: "prototyper" },
        { text: "Running a 6-month planning phase to ensure zero flaws.", type: "traditional" }
      ]
    }
  ];

  const handleAnswerSelect = (type) => {
    setScores(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentPageScores({ catalyst: 0, creator: 0, prototyper: 0, traditional: 0 });
  };

  const setCurrentPageScores = (vals) => {
    setScores(vals);
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setQuizStarted(false);
  };

  // Archetype results calculation
  const getArchetype = () => {
    const { catalyst, creator, prototyper, traditional } = scores;
    const maxVal = Math.max(catalyst, creator, prototyper, traditional);
    
    if (maxVal === catalyst) {
      return {
        name: "Systems Catalyst",
        desc: "You prioritize loop dynamics, feedback systems, and strategic mapping. You search for leverage points in complex networks.",
        course: "Innovation Engineering Masterclass"
      };
    } else if (maxVal === creator) {
      return {
        name: "Empathetic Creator",
        desc: "You start and end with the human context. Empathy maps, user observations, and qualitative research are your superpowers.",
        course: "Design Thinking Practitioner Bootcamp"
      };
    } else if (maxVal === prototyper) {
      return {
        name: "Rapid Prototyper",
        desc: "You build to think. You prefer concrete, rough mockups over theoretical debates, testing assumptions in real-time.",
        course: "Creativity Labs & Bootcamps"
      };
    } else {
      return {
        name: "Traditional Planner",
        desc: "You lean towards static plan structures and security. You can benefit immensely from building comfort with ambiguity and failure loops.",
        course: "Human Design & Leadership Framework"
      };
    }
  };

  const archetype = quizCompleted ? getArchetype() : null;

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Playbooks & Assessments</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Resources & Assessments</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Equip yourself with practical templates, rapid worksheets, and ebooks, or assess your organization's innovation score.
        </p>
      </section>

      {/* Interactive Self-Assessment Quiz Section */}
      <section className="glass-panel" style={{
        maxWidth: '800px',
        margin: '0 auto 5rem auto',
        padding: '3rem 2rem',
        border: '1px solid rgba(249,115,22,0.2)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--accent-glow)',
          color: '#000',
          padding: '0.25rem 1rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Sparkles size={12} /> INTERACTIVE DIAGNOSTIC
        </div>

        {!quizStarted ? (
          /* Start Screen */
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Find Your Innovation Archetype</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '550px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Take our 4-question interactive assessment to discover your thinking style and see what methodology will best accelerate your project velocity.
            </p>
            <button onClick={() => setQuizStarted(true)} className="btn btn-primary">
              Start Free Assessment <ArrowRight size={16} />
            </button>
          </div>
        ) : quizCompleted ? (
          /* Results Screen */
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Your Archetype is</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.25rem 0 1rem 0', color: '#fff' }}>{archetype.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              {archetype.desc}
            </p>

            <div className="glass-card" style={{
              maxWidth: '500px',
              margin: '0 auto 2.5rem auto',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px dashed var(--accent-orange)',
              padding: '1.5rem',
              textAlign: 'left'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Recommended Track</span>
              <h4 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{archetype.course}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                This curriculum directly maps to your current strengths and offers tools to bridge critical gaps.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={resetQuiz} className="btn btn-secondary" style={{ gap: '0.35rem' }}>
                <RefreshCcw size={16} /> Take Again
              </button>
              <a href="#programs" className="btn btn-primary">Explore This Course</a>
            </div>
          </div>
        ) : (
          /* Question Screen */
          <div style={{ textAlign: 'left' }}>
            {/* Progress bar */}
            <div style={{ background: 'rgba(255,255,255,0.06)', height: '4px', borderRadius: '2px', marginBottom: '2.5rem', overflow: 'hidden' }}>
              <div style={{
                background: 'var(--accent-glow)',
                height: '100%',
                width: `${((currentQuestion) / questions.length) * 100}%`,
                transition: 'var(--transition-smooth)'
              }} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>
              {questions[currentQuestion].q}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {questions[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelect(opt.type)}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    padding: '1rem 1.5rem',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Resources Catalog List */}
      <section>
        <div className="section-header">
          <span className="section-subtitle">Playbook Catalog</span>
          <h2 className="section-title">Free & Premium Downloads</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          textAlign: 'left'
        }}>
          {resources.map(res => {
            const isDownloading = downloadingId === res.id;
            return (
              <div 
                key={res.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.75rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Download Progress Bar Layer */}
                {isDownloading && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '3px',
                    background: 'var(--accent-glow)',
                    width: `${downloadProgress}%`,
                    transition: 'width 0.2s ease'
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{res.type}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{res.fileSize}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{res.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', flexGrow: 1, lineHeight: '1.5' }}>
                  {res.description}
                </p>

                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '1rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{res.category}</span>
                  <button 
                    onClick={(e) => handleDownload(e, res.id)}
                    className={`btn btn-sm ${isDownloading ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ gap: '0.35rem', paddingHorizontal: '0.85rem' }}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      downloadProgress >= 100 ? (
                        <>
                          <Check size={14} color="var(--accent-orange)" /> Ready
                        </>
                      ) : (
                        `Downloading ${downloadProgress}%`
                      )
                    ) : (
                      <>
                        <Download size={14} /> Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
