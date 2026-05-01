"use client";

import { useState } from "react";
import Link from "next/link";
import scholarshipsData from "@/data/scholarships.json";

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
    bdImpact: "" // BD-specific impact
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

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
      if (!formData.university) newErrors.university = true;
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
      alert("✅ Copied to clipboard!");
    }
  };

  return (
    <>
      <header className="page-header print-hide">
        <div className="container page-header-content">
          <span className="section-label" style={{ marginBottom: 'var(--space-4)' }}>Write a Winning Essay</span>
          <h1>✍️ SOP Outline Generator</h1>
          <p>Answer a few questions to generate a customized, 5-paragraph Statement of Purpose structure designed to avoid common BD student mistakes.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="container">
          
          <div className="sop-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 'var(--space-8)', alignItems: 'start' }}>
            <main role="main" className="sop-main">
              
              <div className="sop-progress print-hide" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-8)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '4px', background: 'var(--border-color)', zIndex: 1 }}></div>
                <div style={{ position: 'absolute', top: '15px', left: '0', width: `${((step - 1) / 4) * 100}%`, height: '4px', background: 'var(--color-primary)', zIndex: 1, transition: 'width 0.3s ease' }}></div>
                
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`step-indicator ${step >= i ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative', width: '20%' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: step >= i ? 'var(--color-primary)' : 'var(--bg-secondary)', border: `2px solid ${step >= i ? 'var(--color-primary)' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step >= i ? 'white' : 'var(--text-muted)', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', transition: 'all 0.3s ease' }}>{i}</div>
                    <span style={{ fontSize: '12px', color: step >= i ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: step >= i ? 600 : 400, textAlign: 'center' }}>
                      {i===1 ? 'Intro' : i===2 ? 'Academic' : i===3 ? 'Why?' : i===4 ? 'Goals' : 'Result'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="sop-form-container print-hide">
                {step === 1 && (
                  <div className="sop-step fade-in-up">
                    <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>Step 1: The Basics (Introduction)</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>💡 Avoid jumping straight into your childhood. The committee reads 1000s of essays. Start with a hook about the field.</p>
                    
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className={`form-input ${errors.name ? 'error' : ''}`} name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Rahul Islam" />
                      {errors.name && <div className="error-text" style={{ color: 'var(--color-accent)', fontSize: '12px', marginTop: '4px' }}>This field is required</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Target Degree & Field</label>
                      <input type="text" className={`form-input ${errors.field ? 'error' : ''}`} name="field" value={formData.field} onChange={handleInputChange} placeholder="e.g. Master's in Data Science" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Target University (Optional, use if applying to one)</label>
                      <input type="text" className={`form-input ${errors.university ? 'error' : ''}`} name="university" value={formData.university} onChange={handleInputChange} placeholder="e.g. University of Debrecen" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Target Scholarship (if applicable)</label>
                      <select className="form-select" name="scholarshipInfo" value={formData.scholarshipInfo} onChange={handleInputChange}>
                        <option value="">General SOP (No specific scholarship)</option>
                        {scholarshipsData.map(s => <option key={s.id} value={s.name}>{s.name} ({s.country})</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="sop-step fade-in-up">
                    <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>Step 2: Academic Background</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>💡 Don't just list courses from your transcript. Focus on a specific project, thesis, or problem you solved in BD.</p>
                    
                    <div className="form-group">
                      <label className="form-label">What is your current/past academic background?</label>
                      <textarea className={`form-textarea ${errors.academicBg ? 'error' : ''}`} name="academicBg" value={formData.academicBg} onChange={handleInputChange} rows={3} placeholder="e.g. I completed my B.Sc. in CSE from BUET..."></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">What was your thesis/major project? What impact did it have?</label>
                      <textarea className="form-textarea" name="thesis" value={formData.thesis} onChange={handleInputChange} rows={4} placeholder="e.g. My thesis focused on identifying crop diseases using CNNs specifically tailored for Bangladeshi farmers..."></textarea>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="sop-step fade-in-up">
                    <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>Step 3: Why This Program & Country?</h2>
                    
                    <div className="form-group">
                      <label className="form-label">Why do you want to study in this specific country?</label>
                      <textarea className={`form-textarea ${errors.whyCountry ? 'error' : ''}`} name="whyCountry" value={formData.whyCountry} onChange={handleInputChange} rows={3} placeholder="e.g. Japan leads in earthquake engineering..."></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Why this university/scholarship?</label>
                      <textarea className={`form-textarea ${errors.whyUni ? 'error' : ''}`} name="whyUni" value={formData.whyUni} onChange={handleInputChange} rows={3} placeholder="e.g. Professor XYZ's lab perfectly aligns with my interest in..."></textarea>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="sop-step fade-in-up">
                    <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>Step 4: Goals & BD Impact</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>⚠️ Crucial for BD Students: Show how this degree will help Bangladesh. Avoid saying "I want to settle abroad."</p>
                    
                    <div className="form-group">
                      <label className="form-label">What are your immediate post-graduation goals?</label>
                      <textarea className={`form-textarea ${errors.futureGoal ? 'error' : ''}`} name="futureGoal" value={formData.futureGoal} onChange={handleInputChange} rows={3} placeholder="e.g. I intend to pursue a PhD / return as a researcher in a BD policy institute..."></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">How will this help Bangladesh specifically? (The "Home Impact")</label>
                      <textarea className={`form-textarea ${errors.bdImpact ? 'error' : ''}`} name="bdImpact" value={formData.bdImpact} onChange={handleInputChange} rows={3} placeholder="e.g. I plan to tackle Dhaka's traffic management using the ML techniques I will learn..."></textarea>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="sop-step fade-in-up">
                    <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🎉</div>
                      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Your Outline is Ready!</h2>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>Scroll down to copy your personalized SOP structure based on your inputs.</p>
                      <button className="btn btn-primary btn-lg" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>View Output ↓</button>
                    </div>
                  </div>
                )}

                <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-6)' }}>
                  {step > 1 ? (
                    <button className="btn btn-outline" onClick={prevStep}>← Previous</button>
                  ) : <div></div>}
                  {step < 5 && (
                    <button className="btn btn-primary" onClick={nextStep}>Next Step →</button>
                  )}
                </div>
              </div>

              {step === 5 && (
                <div className="sop-output fade-in-up" id="sopOutput" style={{ marginTop: 'var(--space-8)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <div style={{ padding: 'var(--space-4) var(--space-6)', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>📄 Generated Outline</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={handleCopy}>📋 Copy Text</button>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => window.print()}>🖨️ Print PDF</button>
                    </div>
                  </div>
                  <div className="sop-output-text" id="sopOutputText" style={{ padding: 'var(--space-6)', whiteSpace: 'pre-wrap', lineHeight: '1.8', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)' }}>
                    {/* Paragraph 1: Intro */}
                    <strong>[Paragraph 1: The Hook & Introduction]</strong>{"\n"}
                    The rapidly evolving landscape of [Broad Field] presents unique challenges and opportunities, particularly in developing nations like Bangladesh. It is with a profound desire to contribute to this field that I, {formData.name}, submit my application for the {formData.field} at {formData.university || '[University Name]'} {formData.scholarshipInfo ? `under the ${formData.scholarshipInfo}` : ''}.
                    {"\n\n"}
                    
                    {/* Paragraph 2: Background */}
                    <strong>[Paragraph 2: Academic & Professional Background]</strong>{"\n"}
                    My academic journey has built a strong foundation. {formData.academicBg} During my studies, I encountered specific problems which led to my major project/thesis. {formData.thesis} This practical experience honed my analytical skills, but also highlighted the limitations of my current knowledge, motivating me to seek advanced education.
                    {"\n\n"}

                    {/* Paragraph 3: Why Them */}
                    <strong>[Paragraph 3: Why This Program & Destination?]</strong>{"\n"}
                    I am specifically drawn to {formData.university || '[University Name]'} because of {formData.whyUni} Furthermore, studying in {formData.whyCountry || '[Country]'} offers distinct advantages. {formData.whyCountry} The rigorous academic environment and exposure to international perspectives will be instrumental in bridging my knowledge gaps.
                    {"\n\n"}

                    {/* Paragraph 4: Future Goals & Home Impact */}
                    <strong>[Paragraph 4: Career Goals & Impact on Bangladesh]</strong>{"\n"}
                    Upon completion of this degree, my immediate objective is to {formData.futureGoal} Ultimately, I am committed to returning to Bangladesh to apply my expertise. {formData.bdImpact} I firmly believe that this program will empower me to be a catalyst for change in my home country.
                    {"\n\n"}

                    {/* Paragraph 5: Conclusion */}
                    <strong>[Paragraph 5: Conclusion]</strong>{"\n"}
                    In conclusion, I am confident that my academic rigor, coupled with a deep sense of purpose, makes me an ideal candidate for this program. I am eager to bring my unique perspectives from Bangladesh to your diverse classroom while absorbing the invaluable knowledge your institution provides.
                  </div>
                </div>
              )}
            </main>

            <aside className="sop-sidebar print-hide" style={{ display: 'none' }}>
               {/* Mobile hiding logic via CSS is tricky inline, assume hidden on small screens */}
            </aside>
            <div className="desktop-sidebar" style={{ position: 'sticky', top: 'var(--space-4)' }}>
               <div className="info-card" style={{ padding: 'var(--space-5)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>⚠️ 7 Fatal SOP Mistakes for BD Students</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                    <li><strong style={{ color: 'var(--color-accent)' }}>1. The "Childhood Story":</strong> "Since I was 5 years old I loved computers..." - <em>Overused. Start with a professional hook.</em></li>
                    <li><strong style={{ color: 'var(--color-accent)' }}>2. Plagiarism:</strong> Copying paragraphs from the internet. Universities use Turnitin.</li>
                    <li><strong style={{ color: 'var(--color-accent)' }}>3. Summarizing the CV:</strong> Don't just list what you did. Explain <em>why</em> you did it.</li>
                    <li><strong style={{ color: 'var(--color-accent)' }}>4. The "Settle Abroad" Vibe:</strong> Fully funded scholarships want you to help your home country. Emphasize returning.</li>
                    <li><strong style={{ color: 'var(--color-accent)' }}>5. Over-flattery:</strong> "Your university is the most glorious in the universe..." - <em>Keep it professional.</em></li>
                    <li><strong style={{ color: 'var(--color-accent)' }}>6. Vague Goals:</strong> "I want to help society." - <em>How? Be specific (e.g., "I want to improve the power grid efficiency in rural BD by 15%").</em></li>
                    <li><strong style={{ color: 'var(--color-accent)' }}>7. Bad Formatting:</strong> Use size 11/12 font (Times/Arial), 1.5 line spacing, and max 2 pages.</li>
                  </ul>
                </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
