"use client";

import Link from "next/link";
import scholarships from "@/data/scholarships.json";
import { BookOpen, CheckCircle2, ChevronRight, Copy, GraduationCap, Info, MapPin, Search, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Ielts() {
  const [copied, setCopied] = useState(false);
  const noIelts = scholarships.filter((s) => !s.ielts_required);

  const copyTemplate = `[University Official Letterhead]

Date: DD Month YYYY

TO WHOM IT MAY CONCERN

Subject: Medium of Instruction Certificate

This is to certify that Mr./Ms. [Full Name], bearing Student ID [XXXX], has successfully completed the Bachelor's/Master's degree programme in [Department Name] from [University Name].

We hereby confirm that the medium of instruction for all courses and academic activities throughout the 4-year/2-year programme was exclusively the English language.

This certificate is issued for the purpose of scholarship/admission application and is true and correct to the best of our knowledge.

Sincerely,
_______________________
Name of Registrar
Registrar
University Name
Seal & Signature`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main role="main">
      <style dangerouslySetInnerHTML={{__html: `
        .ielts-hero-premium {
          background: linear-gradient(135deg, #001a14 0%, #006a4e 100%);
          padding: calc(var(--nav-height) + var(--space-20)) 0 var(--space-24);
          color: white;
          text-align: center;
          position: relative;
        }

        .ielts-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          box-shadow: var(--shadow-md);
        }

        .no-ielts-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-5);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          text-decoration: none;
          color: inherit;
          margin-bottom: var(--space-3);
          transition: all 0.2s;
        }

        .no-ielts-item:hover {
          transform: translateX(6px);
          border-color: var(--color-primary);
          background: white;
          box-shadow: var(--shadow-lg);
        }

        .template-box-premium {
          background: #f8f9fa;
          border: 1.5px dashed #006a4e;
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          position: relative;
          font-family: 'Courier New', Courier, monospace;
          font-size: var(--text-sm);
          line-height: 1.6;
          color: #333;
          white-space: pre-wrap;
        }

        .copy-btn-premium {
          position: absolute;
          top: 10px;
          right: 10px;
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn-premium:hover {
          background: var(--color-primary-dark);
          transform: scale(1.05);
        }

        .step-bubble {
          width: 40px;
          height: 40px;
          background: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          flex-shrink: 0;
        }

        .badge-ielts {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }
      `}} />

      <header className="ielts-hero-premium">
        <div className="container">
          <div className="badge" style={{ background: '#34C759', color: 'white', padding: '6px 16px', marginBottom: 'var(--space-6)', fontWeight: 800 }}>
             ENGLISH PROFICIENCY HUB
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 'var(--space-4)', letterSpacing: '-0.03em' }}>
            IELTS & <span style={{ color: '#34C759' }}>MOI</span> Specialist Guide
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)' }}>
            Learn how to navigate English requirements for Bangladeshi students. Many top universities accept your local medium of instruction as proof.
          </p>
        </div>
      </header>

      <section className="section" style={{ marginTop: '-60px' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* GOOD NEWS ALERT */}
          <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 'var(--space-10)', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ background: 'rgba(52, 199, 89, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
               <ShieldCheck size={32} style={{ color: '#34C759' }} />
            </div>
            <div>
               <h3 style={{ fontWeight: 900, fontSize: 'var(--text-xl)', marginBottom: '4px' }}>IELTS is Optional for 60% of Programs</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>Most Bangladeshi universities are recognized for English medium teaching. A Medium of Instruction (MOI) letter is all you need.</p>
            </div>
          </div>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* NO IELTS LIST */}
            <div className="ielts-card-premium fade-in-up">
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} style={{ color: '#34C759' }} /> Programs Accepting MOI
              </h2>
              <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
                {noIelts.map(s => (
                  <Link key={s.id} href={`/scholarships/${s.id}`} className="no-ielts-item">
                    <span style={{ fontSize: '2rem' }}>{s.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 'var(--text-base)', marginBottom: '2px' }}>{s.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{s.country} · {s.degrees[0]}</div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'var(--color-primary)' }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* MOI GUIDE */}
            <div className="ielts-card-premium fade-in-up" style={{ animationDelay: '100ms' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Info size={24} style={{ color: 'var(--color-primary)' }} /> Why MOI Matters
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
                A <strong>Medium of Instruction (MOI)</strong> certificate is a globally recognized document from your university Registrar confirming your entire curriculum was taught in English.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="step-bubble">1</div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px' }}>Visit Registrar Office</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Go to your Controller or Registrar office. All major BD universities (DU, BUET, NSU, AIUB, etc.) issue this.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="step-bubble">2</div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px' }}>Request Transcript Proof</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Ensure it mentions "The course was conducted exclusively in English".</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TEMPLATE SECTION */}
          <div className="ielts-card-premium fade-in-up">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={24} style={{ color: 'var(--color-primary)' }} /> Official MOI Template
                </h2>
                <button className="copy-btn-premium" onClick={handleCopy}>
                  {copied ? <><CheckCircle2 size={14}/> COPIED</> : <><Copy size={14}/> COPY TEMPLATE</>}
                </button>
             </div>
             <div className="template-box-premium">
               {copyTemplate}
             </div>
          </div>

          {/* SCORE TABLE */}
          <div className="ielts-card-premium fade-in-up">
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-6)' }}>Full Requirement Matrix</h2>
            <div style={{ overflowX: 'auto' }}>
               <table className="comparison-table" style={{ border: 'none', margin: 0 }}>
                 <thead>
                   <tr style={{ background: 'var(--bg-secondary)' }}>
                     <th>Opportunity</th>
                     <th>Region</th>
                     <th>IELTS Req?</th>
                     <th>Min. Band</th>
                     <th>MOI Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {scholarships.slice(0, 15).map(s => (
                     <tr key={s.id}>
                       <td style={{ fontWeight: 700, fontSize: '13px' }}>{s.flag} {s.name}</td>
                       <td style={{ fontSize: '12px' }}>{s.country}</td>
                       <td>
                          <span className="badge-ielts" style={{ background: s.ielts_required ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)', color: s.ielts_required ? '#FF3B30' : '#34C759' }}>
                            {s.ielts_required ? 'Mandatory' : 'Optional'}
                          </span>
                       </td>
                       <td style={{ fontWeight: 800 }}>{s.ielts_required ? '6.5+' : '—'}</td>
                       <td>
                          {s.moi_accepted ? <span style={{ color: '#34C759', fontWeight: 800 }}>✓ Accepted</span> : <span style={{ color: 'var(--text-muted)' }}>Not Official</span>}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
            <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
               <Link href="/scholarships" className="btn btn-primary">Find Your Scholarship <ArrowRight size={18}/></Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
