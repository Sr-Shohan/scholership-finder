"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { Heart, Globe2, ShieldCheck, Users, Search, PenTool, Wrench, Mail, Share2, Send } from "lucide-react";

export default function About() {
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("✅ Message sent! We'll get back to you within 48 hours.");
  };

  const handleContributeSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("🙏 Thank you! We'll review the scholarship and publish it within 72 hours.");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .about-hero-premium {
          background: var(--hero-bg);
          padding: calc(var(--nav-height) + var(--space-20)) 0 var(--space-24);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 960px) {
          .about-hero-premium {
            padding: calc(var(--nav-height) + var(--space-4)) 0 var(--space-8);
          }
        }

        .about-hero-premium::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: var(--hero-glow);
          pointer-events: none;
        }

        .mission-quote-premium {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          line-height: 1.4;
          font-weight: 800;
          color: white;
          max-width: 900px;
          margin: 0 auto;
          letter-spacing: -0.02em;
        }

        .mission-quote-premium .highlight {
          color: var(--emerald-accent);
          position: relative;
          display: inline-block;
        }

        .mission-quote-premium .highlight::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 8px;
          background: var(--color-primary-ultra-light);
          z-index: -1;
        }

        .value-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .value-card-premium:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(0,106,78,0.3);
        }

        .value-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--color-primary-ultra-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .how-it-works-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-8);
          margin-top: var(--space-10);
        }

        .step-card {
          position: relative;
          padding: var(--space-8);
          background: var(--bg-secondary);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--border-color);
        }

        .form-card-premium {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-10);
          box-shadow: var(--shadow-lg);
        }

        .section-header-premium {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--space-8);
          font-size: var(--text-2xl);
          font-weight: 800;
        }
      `}} />

      <main role="main">
        {/* HERO SECTION */}
        <header className="about-hero-premium print-hide">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="badge" style={{ background: 'var(--emerald-accent)', color: 'white', marginBottom: 'var(--space-8)', padding: '6px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
              <Globe2 size={14} /> OUR STORY
            </div>
            <div className="mission-quote-premium fade-in-up">
              "We believe no Bangladeshi student should <br />
              <span className="highlight">miss a scholarship opportunity</span><br />
              because they couldn't afford a counselor."
            </div>
            <p className="fade-in-up" style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              — The BDScholarship Team
            </p>
          </div>
        </header>

        <section className="section">
          <div className="container">

            {/* Our Values - Grid */}
            <div style={{ marginBottom: 'var(--space-20)' }} className="fade-in-up">
              <h2 className="section-header-premium">
                <Heart size={28} style={{ color: 'var(--color-primary)' }} /> Core Values
              </h2>
              <div className="grid-2" style={{ gap: 'var(--space-6)' }}>
                
                <div className="value-card-premium">
                  <div className="value-icon-box"><Globe2 size={24} /></div>
                  <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>Always Free</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Every tool, every scholarship database link, every guide is completely free. No paywalls, no hidden subscription traps, no premium counselor tiers.
                  </p>
                </div>
                
                <div className="value-card-premium">
                  <div className="value-icon-box" style={{ background: 'rgba(255,152,0,0.1)', color: '#E65100' }}><ShieldCheck size={24} /></div>
                  <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>Verified Information</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Information is sourced strictly directly from official government and university websites and curated by human reviewers to ensure complete accuracy.
                  </p>
                </div>

                <div className="value-card-premium">
                  <div className="value-icon-box" style={{ background: 'rgba(23,162,184,0.1)', color: '#17a2b8' }}><Users size={24} /></div>
                  <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>Community Driven</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    We scale through the contributions of alumni and prospective students. If our community spots a missed scholarship, they ensure it's listed within 72 hours.
                  </p>
                </div>

                <div className="value-card-premium">
                  <div className="value-icon-box" style={{ background: 'rgba(244,42,65,0.1)', color: '#f42a41' }}><Search size={24} /></div>
                  <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>BD-Specific Nuance</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Global lists lack context. We map out BD-specific sending partners, outline UGC attestation rules, and specify exactly which universities accept an MOI.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div style={{ marginBottom: 'var(--space-20)' }} className="fade-in-up" id="how-it-works">
              <h2 className="section-header-premium">
                <Wrench size={28} style={{ color: 'var(--color-primary)' }} /> How We Work
              </h2>
              <div className="how-it-works-grid">
                
                <div className="step-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
                    <div className="value-icon-box" style={{ width: '40px', height: '40px' }}><Search size={20} /></div>
                    <h4 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Database Curation</h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Our volunteers scrape official embassy announcements and Ministry of Education circulars to compile centralized, highly vetted timelines for Bangladeshi citizens.</p>
                </div>

                <div className="step-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
                    <div className="value-icon-box" style={{ width: '40px', height: '40px' }}><PenTool size={20} /></div>
                    <h4 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Contextual Guides</h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>We attach application templates, SOP structures, and document attestation cheat sheets directly into the details of the scholarship pages.</p>
                </div>

                <div className="step-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
                    <div className="value-icon-box" style={{ width: '40px', height: '40px' }}><Wrench size={20} /></div>
                    <h4 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Building Tools</h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>We engineer interactive tools—like the Document Arsenal Checklist and Deadline Trackers—that historically cost tens of thousands of taka via agencies.</p>
                </div>

              </div>
            </div>

            {/* FORMS SECTION */}
            <div className="grid-2 fade-in-up" style={{ gap: 'var(--space-8)', alignItems: 'start' }}>
              
              {/* Contact Form */}
              <div className="form-card-premium" id="contact">
                <h2 style={{ fontSize: 'var(--text-2xl)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-2)' }}>
                  <Mail size={24} style={{ color: 'var(--color-primary)' }}/> Get in Touch
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                  Found a bug? Need clarification? Want to write an article?
                </p>
                <form id="contactForm" onSubmit={handleContactSubmit} noValidate>
                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Your Name</label>
                    <input className="form-input" type="text" placeholder="Sarah Rahman" required style={{ padding: '14px', borderRadius: 'var(--radius-lg)' }}/>
                  </div>
                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
                    <input className="form-input" type="email" placeholder="sarah@example.com" required style={{ padding: '14px', borderRadius: 'var(--radius-lg)' }}/>
                  </div>
                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Message</label>
                    <textarea className="form-textarea" rows={4} placeholder="How can we assist you today?" required style={{ padding: '14px', borderRadius: 'var(--radius-lg)' }}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 'var(--text-base)' }}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </div>

              {/* Contribute Form */}
              <div className="form-card-premium" id="contribute">
                <h2 style={{ fontSize: 'var(--text-2xl)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-2)' }}>
                  <Share2 size={24} style={{ color: 'var(--color-primary)' }}/> Submit a Scholarship
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                  Know about a great master's or PhD program that we are missing? Drop the official URL here.
                </p>
                <form id="contributeForm" onSubmit={handleContributeSubmit} noValidate>
                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Scholarship Title</label>
                    <input className="form-input" type="text" placeholder="e.g. Swedish Institute Scholarship" required style={{ padding: '14px', borderRadius: 'var(--radius-lg)' }}/>
                  </div>
                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Country</label>
                    <input className="form-input" type="text" placeholder="e.g. Sweden" required style={{ padding: '14px', borderRadius: 'var(--radius-lg)' }}/>
                  </div>
                  <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="form-label" style={{ fontWeight: 600 }}>Official Application Link</label>
                    <input className="form-input" type="url" placeholder="https://..." required style={{ padding: '14px', borderRadius: 'var(--radius-lg)' }}/>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 'var(--text-base)', background: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
                    <Send size={18} /> Submit to Database
                  </button>
                </form>
              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}
