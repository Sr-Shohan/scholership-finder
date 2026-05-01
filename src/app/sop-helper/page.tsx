"use client";

import { useState } from "react";
import Link from "next/link";
import scholarshipsData from "@/data/scholarships.json";
import { PenTool, CheckCircle2, ChevronRight, ChevronLeft, Copy, Printer, Lightbulb, AlertTriangle, FileText, Sparkles } from "lucide-react";

export default function SopHelperPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    university: "",
    scholarshipInfo: "",
    academicBg: "",
    thesis: "",
    whyCountry: "",
    whyUni: "",
    futureGoal: "",
    bdImpact: ""
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, boolean> = {};
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = true;
      if (!formData.field) newErrors.field = true;
    } else if (currentStep === 2) {
      if (!formData.academicBg) newErrors.academicBg = true;
    } else if (currentStep === 3) {
      if (!formData.whyCountry) newErrors.whyCountry = true;
      if (!formData.whyUni) newErrors.whyUni = true;
    } else if (currentStep === 4) {
      if (!formData.futureGoal) newErrors.futureGoal = true;
      if (!formData.bdImpact) newErrors.bdImpact = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(s => Math.min(s + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = async () => {
    const text = document.getElementById('sopOutputText')?.innerText;
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main role="main">
      <style dangerouslySetInnerHTML={{__html: `
        .sop-hero-premium {
          background: linear-gradient(135deg, #001a14 0%, #006a4e 100%);
          padding: calc(var(--nav-height) + var(--space-20)) 0 var(--space-24);
          color: white;
          text-align: center;
          position: relative;
        }

        @media (max-width: 960px) {
          .sop-hero-premium {
            padding: calc(var(--nav-height) + var(--space-4)) 0 var(--space-8);
          }
          .sop-hero-premium h1 {
            font-size: 2.125rem !important;
          }
          .sop-card-premium {
            padding: var(--space-6);
          }
          .sop-paper-preview {
            padding: 30px 20px !important;
          }
          .grid-layout-sop {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
          .step-label-sop {
            display: none;
          }
        }

        .sop-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-xl);
          margin-bottom: var(--space-10);
        }

        .step-pill-premium {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          position: relative;
        }

        .premium-input-sop {
          width: 100%;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          padding: 14px 18px;
          border-radius: var(--radius-xl);
          font-size: var(--text-base);
          transition: all 0.2s;
          color: var(--text-primary);
        }

        .premium-input-sop:focus {
          border-color: var(--color-primary);
          background: white;
          outline: none;
          box-shadow: 0 0 0 4px var(--color-primary-ultra-light);
        }

        .premium-textarea-sop {
          width: 100%;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          padding: 16px 18px;
          border-radius: var(--radius-xl);
          font-size: var(--text-base);
          transition: all 0.2s;
          color: var(--text-primary);
          line-height: 1.6;
          resize: vertical;
        }

        .premium-textarea-sop:focus {
          border-color: var(--color-primary);
          background: white;
          outline: none;
          box-shadow: 0 0 0 4px var(--color-primary-ultra-light);
        }

        .sop-paper-preview {
          background: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 60px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          font-family: 'Inter', serif;
          line-height: 1.8;
          color: #1a1a1a;
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .sop-paper-preview::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 10px;
          background: var(--color-primary);
        }

        .mistake-list-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          transition: background 0.2s;
        }

        .mistake-list-item:hover {
          background: rgba(255, 59, 48, 0.05);
        }
      `}} />

      <header className="sop-hero-premium">
        <div className="container">
          <div className="badge" style={{ background: '#34C759', color: 'white', padding: '6px 16px', marginBottom: 'var(--space-6)', fontWeight: 800 }}>
             <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> AI-POWERED OUTLINER
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 'var(--space-4)', letterSpacing: '-0.03em' }}>
            Write Your <span style={{ color: '#34C759' }}>Winning</span> SOP
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)' }}>
            Guidance designed by successful scholars to help Bangladeshi students avoid common pitfalls and impress admissions committees.
          </p>
        </div>
      </header>

      <section className="section" style={{ marginTop: '-80px', paddingBottom: 'var(--space-20)' }}>
        <div className="container">
          
          <div className="grid-layout-sop" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-10)', alignItems: 'start' }}>
            
            <main>
              {/* Progress UI */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-12)', position: 'relative', padding: '0 var(--space-4)' }}>
                 <div style={{ position: 'absolute', top: '20px', left: '0', right: '0', height: '4px', background: 'var(--border-color)', zIndex: 1, borderRadius: '2px' }}></div>
                 <div style={{ position: 'absolute', top: '20px', left: '0', width: `${((step - 1) / 4) * 100}%`, height: '4px', background: 'var(--color-primary)', zIndex: 1, transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '2px' }}></div>
                 
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div className="step-pill-premium" style={{ 
                        background: step > i ? 'var(--color-primary)' : step === i ? 'var(--color-primary)' : 'white',
                        border: `2px solid ${step >= i ? 'var(--color-primary)' : 'var(--border-color)'}`,
                        color: step > i ? 'white' : step === i ? 'white' : 'var(--text-muted)',
                        boxShadow: step === i ? '0 0 20px rgba(0,106,78,0.3)' : 'none'
                      }}>
                        {step > i ? '✓' : i}
                      </div>
                      <span className="step-label-sop" style={{ fontSize: '11px', fontWeight: 800, color: step >= i ? 'var(--text-primary)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {i===1 ? 'Intro' : i===2 ? 'Academic' : i===3 ? 'Motivation' : i===4 ? 'Impact' : 'Preview'}
                      </span>
                   </div>
                 ))}
              </div>

              {/* Form Content */}
              <div className="sop-card-premium fade-in-up">
                {step === 1 && (
                  <div>
                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>The Foundation</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>Hook the committee with a professional introduction.</p>
                    
                    <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>FULL NAME</label>
                       <input type="text" name="name" className="premium-input-sop" value={formData.name} onChange={handleInputChange} placeholder="As per your passport" />
                       {errors.name && <div style={{ color: '#FF3B30', fontSize: '11px', marginTop: '6px', fontWeight: 700 }}>Name is required</div>}
                    </div>
                    <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>TARGET PROGRAM</label>
                       <input type="text" name="field" className="premium-input-sop" value={formData.field} onChange={handleInputChange} placeholder="e.g. Master's in Artificial Intelligence" />
                    </div>
                    <div className="form-group">
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>TARGET SCHOLARSHIP</label>
                       <select name="scholarshipInfo" className="premium-input-sop" value={formData.scholarshipInfo} onChange={handleInputChange}>
                          <option value="">General Application</option>
                          {scholarshipsData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                       </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>Academic Pedigree</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>Demonstrate your technical depth and research potential.</p>
                    
                    <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>ACADEMIC BACKGROUND</label>
                       <textarea name="academicBg" className="premium-textarea-sop" rows={3} value={formData.academicBg} onChange={handleInputChange} placeholder="Major projects, CGPA highlights, or key courses..."></textarea>
                    </div>
                    <div className="form-group">
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>MAJOR PROJECTS / THESIS</label>
                       <textarea name="thesis" className="premium-textarea-sop" rows={4} value={formData.thesis} onChange={handleInputChange} placeholder="Describe a specific problem you solved during your undergrad in BD..."></textarea>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>Why This Program?</h2>
                     <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>PROGRAM ALIGNMENT</label>
                       <textarea name="whyUni" className="premium-textarea-sop" rows={3} value={formData.whyUni} onChange={handleInputChange} placeholder="Mention specific labs, professors, or curriculum strengths..."></textarea>
                    </div>
                    <div className="form-group">
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>WHY THIS DESTINATION?</label>
                       <textarea name="whyCountry" className="premium-textarea-sop" rows={3} value={formData.whyCountry} onChange={handleInputChange} placeholder="e.g. Germany's industrial heritage or Hungary's research ecosystem..."></textarea>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>Vision & Impact</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>Crucial for funding: How will you help Bangladesh?</p>
                     <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>SHORT-TERM CAREER GOALS</label>
                       <textarea name="futureGoal" className="premium-textarea-sop" rows={3} value={formData.futureGoal} onChange={handleInputChange} placeholder="Research, industry roles, or entrepreneurship..."></textarea>
                    </div>
                    <div className="form-group">
                       <label style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'block', color: 'var(--text-primary)' }}>CONTRIBUTION TO BANGLADESH</label>
                       <textarea name="bdImpact" className="premium-textarea-sop" rows={4} value={formData.bdImpact} onChange={handleInputChange} placeholder="How will your chosen field solve a specific problem in BD (Economy, Health, Traffic)?"></textarea>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                     <div style={{ background: 'rgba(52, 199, 89, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
                        <CheckCircle2 size={40} style={{ color: '#34C759' }} />
                     </div>
                     <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>Your Blueprint is Ready</h2>
                     <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-8)' }}>We've structured your thoughts into a professional scholarship essay format.</p>
                     <button className="btn btn-primary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                        Scroll to Output ↓
                     </button>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-color)' }}>
                  <button onClick={prevStep} disabled={step === 1} className="btn btn-outline" style={{ opacity: step === 1 ? 0 : 1 }}>
                    <ChevronLeft size={18} /> Previous
                  </button>
                  {step < 5 ? (
                    <button onClick={nextStep} className="btn btn-primary">
                      Next Step <ChevronRight size={18} />
                    </button>
                  ) : (
                    <div style={{ width: '100px' }}></div>
                  )}
                </div>
              </div>

              {step === 5 && (
                <div className="fade-in-up" id="sopOutput">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                     <h2 style={{ fontWeight: 900, fontSize: 'var(--text-xl)' }}>Final Draft Outline</h2>
                     <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-outline" onClick={handleCopy}>
                           {copied ? <><CheckCircle2 size={16}/> Copied</> : <><Copy size={16}/> Copy Text</>}
                        </button>
                        <button className="btn btn-primary" onClick={() => window.print()}>
                           <Printer size={16}/> Print PDF
                        </button>
                     </div>
                  </div>
                  <div className="sop-paper-preview" id="sopOutputText">
                     <p style={{ marginBottom: '30px', fontWeight: 700 }}>[Paragraph 1: Professional Hook & Intent]</p>
                     <p>The academic pursuit of {formData.field} represents more than just a degree; it is a vital step toward addressing systemic challenges in Bangladesh. I, {formData.name}, am writing to formally express my interest in enrolling at {formData.university || '[University Name]'} {formData.scholarshipInfo ? `under the prestigious ${formData.scholarshipInfo}` : ''}.</p>
                     
                     <p style={{ margin: '30px 0 10px', fontWeight: 700 }}>[Paragraph 2: Academic Foundations]</p>
                     <p>My academic record reflects a consistent commitment to excellence. {formData.academicBg} This foundation was further solidified during my major research project. {formData.thesis} Through this, I developed the analytical rigor required for success in your program.</p>
                     
                     <p style={{ margin: '30px 0 10px', fontWeight: 700 }}>[Paragraph 3: Why This Institution?]</p>
                     <p>Choosing {formData.university || '[University Name]'} was a deliberate decision. I am particularly impressed by {formData.whyUni} Additionally, the experience of studying in {formData.whyCountry || '[Country]'} will allow me to {formData.whyCountry} - providing a global perspective essential for my growth.</p>
                     
                     <p style={{ margin: '30px 0 10px', fontWeight: 700 }}>[Paragraph 4: Career Vison & Home Impact]</p>
                     <p>Following the completion of my studies, my immediate objective is to {formData.futureGoal} Beyond personal career milestones, my primary motivation is to return to Bangladesh. {formData.bdImpact} I am determined to utilize the high-level expertise gained from your institution to solve real-world problems in my home country.</p>
                     
                     <p style={{ margin: '30px 0 10px', fontWeight: 700 }}>[Paragraph 5: Final Call to Action]</p>
                     <p>In summary, I am ready to embrace the challenges of your rigorous academic environment. I look forward to contributing my unique Bangladeshi perspectives to your diverse student body while building the expertise required to drive progress in my field.</p>
                  </div>
                </div>
              )}
            </main>

            <aside style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-4))' }}>
              <div className="sop-card-premium" style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 900, marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Lightbulb size={18} style={{ color: 'var(--color-warning)' }} /> Expert Tips
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div className="mistake-list-item">
                    <AlertTriangle size={16} style={{ color: '#FF3B30', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '12px', lineHeight: 1.5 }}><strong>No "Childhood Stories":</strong> Avoid starting with "Since I was a child...". Start with a current professional challenge.</div>
                  </div>
                  <div className="mistake-list-item">
                    <AlertTriangle size={16} style={{ color: '#FF3B30', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '12px', lineHeight: 1.5 }}><strong>Emphasize Return:</strong> Funding committees want to see how you will help Bangladesh, not how you will settle abroad.</div>
                  </div>
                  <div className="mistake-list-item">
                    <AlertTriangle size={16} style={{ color: '#FF3B30', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '12px', lineHeight: 1.5 }}><strong>Be Specific:</strong> Instead of "I want to help poor people," say "I want to implement digital micro-finance models for rural weavers in Tangail."</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', color: 'white' }}>
                 <FileText size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                 <h4 style={{ fontWeight: 800, marginBottom: '8px' }}>Need a Review?</h4>
                 <p style={{ fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>Join our community group to get your SOP peer-reviewed by successful scholars.</p>
                 <button className="btn btn-white" style={{ width: '100%', marginTop: '16px', fontSize: '12px' }}>Join Community</button>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}
