"use client";

import Link from "next/link";
import { FormEvent } from "react";

export default function About() {
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate sending email / displaying toast
    alert("✅ Message sent! We'll get back to you within 48 hours.");
  };

  const handleContributeSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("🙏 Thank you! We'll review the scholarship and publish it within 72 hours.");
  };

  return (
    <main role="main">
      <header className="page-header">
        <div className="container page-header-content">
          <span className="section-label" style={{ marginBottom: 'var(--space-4)' }}>Our Story</span>
          <h1>About BDScholarship 🇧🇩</h1>
          <p>Born from a simple belief: every deserving Bangladeshi student should have access to the information, tools, and guidance needed to win a scholarship — regardless of their financial background.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="container about-content">

          {/* Mission Statement */}
          <div className="mission-hero fade-in-up">
            <div className="mission-quote">
              "We believe no Bangladeshi student should <br/>
              <span className="accent">miss a scholarship</span><br />
              because they couldn't afford a counselor."
            </div>
            <p className="mission-sub">— The BDScholarship Team</p>
          </div>

          {/* Our Values */}
          <div className="about-card fade-in-up">
            <h2>💚 Our Values</h2>
            <div className="team-values">
              <div className="value-card">
                <div className="value-icon">🆓</div>
                <div className="value-title">Always Free</div>
                <div className="value-desc">Every tool, every scholarship, every guide — completely free. No paywalls, no subscriptions, no catch.</div>
              </div>
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <div className="value-title">BD-Specific</div>
                <div className="value-desc">Built specifically for Bangladeshi students, with local contacts, BD sending partners, and MOI guidance.</div>
              </div>
              <div className="value-card">
                <div className="value-icon">✅</div>
                <div className="value-title">Verified Info</div>
                <div className="value-desc">All scholarship data is sourced directly from official government and university websites and kept up to date.</div>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <div className="value-title">Community-Driven</div>
                <div className="value-desc">We grow through student contributions. If you know a scholarship we've missed, share it with us!</div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="about-card fade-in-up">
            <h2>⚙️ How BDScholarship Works</h2>
            <div>
              <div className="how-step">
                <div className="how-step-icon">🔍</div>
                <div className="how-step-text">
                  <h4>We Research Scholarships</h4>
                  <p>Our team researches official scholarship websites, government portals, and embassy announcements to compile accurate, BD-specific information. We prioritize scholarships with clear Bangladeshi quotas or sending partners.</p>
                </div>
              </div>
              <div className="how-step">
                <div className="how-step-icon">✍️</div>
                <div className="how-step-text">
                  <h4>We Write BD-Specific Guides</h4>
                  <p>For each scholarship, we add information that no other site provides — including UGC/Embassy contacts, MOI acceptance details, BD sending partners, and tips from past recipients.</p>
                </div>
              </div>
              <div className="how-step">
                <div className="how-step-icon">🛠️</div>
                <div className="how-step-text">
                  <h4>We Build Free Tools</h4>
                  <p>Deadline tracker, document checklist generator, SOP helper — tools that previously cost ৳15,000–৳50,000 through counselors, now available completely free.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="about-card fade-in-up" id="contact">
            <h2>📧 Contact Us</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)', lineHeight: '1.7' }}>
              Have a question, found an error, or want to collaborate? We'd love to hear from you. We typically respond within 24–48 hours.
            </p>
            <form className="contact-form" id="contactForm" onSubmit={handleContactSubmit} noValidate aria-label="Contact form">
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">Your Name *</label>
                  <input className="form-input" type="text" id="contactName" placeholder="Md. Rahul Islam" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Email Address *</label>
                  <input className="form-input" type="email" id="contactEmail" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactMessage">Message *</label>
                <textarea className="form-textarea" id="contactMessage" rows={5} placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" id="contactSubmitBtn" style={{ alignSelf: 'flex-start' }}>
                📨 Send Message
              </button>
            </form>
          </div>

          {/* Contribute a Scholarship */}
          <div className="about-card fade-in-up" id="contribute">
            <h2>🤝 Contribute a Scholarship</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)', lineHeight: '1.7' }}>
              Know a scholarship that we haven't listed yet? Help us help more Bangladeshi students by submitting the details below. We'll review and publish it within 72 hours.
            </p>

            <form className="contact-form" id="contributeForm" onSubmit={handleContributeSubmit} noValidate aria-label="Contribute a scholarship form">
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contribScholarshipName">Scholarship Name *</label>
                  <input className="form-input" type="text" id="contribScholarshipName" placeholder="e.g. Swedish Institute Scholarship" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contribCountry">Country *</label>
                  <input className="form-input" type="text" id="contribCountry" placeholder="e.g. Sweden" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contribApplyLink">Official Application Link *</label>
                <input className="form-input" type="url" id="contribApplyLink" placeholder="https://..." required />
              </div>
              <button type="submit" className="btn btn-primary" id="contributeSubmitBtn" style={{ alignSelf: 'flex-start' }}>
                📤 Submit Scholarship
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
