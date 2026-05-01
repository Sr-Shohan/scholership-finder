"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Printer, RotateCcw, PenTool, Lightbulb, DownloadCloud, FileSignature, AlertCircle, FileCheck, Landmark } from "lucide-react";
import scholarshipsData from "@/data/scholarships.json";

// Document structure replicated from checklist.js
const defaultDocuments = [
  {
    id: "identity",
    title: "Core Identity Documents",
    items: [
      { id: 'passport', text: 'Valid Passport (Bio-page)', hint: 'Must have at least 1.5 years of validity remaining.' },
      { id: 'nid', text: 'National ID Card (NID)', hint: 'Keep both original and English translated notarized copies.' },
      { id: 'birth_cert', text: 'Birth Certificate', hint: 'Must be in English and registered online (17-digit).' },
      { id: 'photo', text: 'Passport Size Photographs', hint: 'White background, matte paper, 35x45mm usually.' }
    ]
  },
  {
    id: "academic",
    title: "Academic Records",
    items: [
      { id: 'bsc_cert', text: 'Bachelor’s Degree Certificate', hint: 'Must be attested by MOFA & Ministry of Education.' },
      { id: 'bsc_trans', text: 'Bachelor’s Transcript', hint: 'Official copy in sealed envelope or attested.' },
      { id: 'hsc_cert', text: 'HSC Certificate & Transcript', hint: 'Attested by Education Board and MOFA.' },
      { id: 'ssc_cert', text: 'SSC Certificate & Transcript', hint: 'Attested by Education Board and MOFA.' }
    ]
  },
  {
    id: "language",
    title: "Language Proficiency",
    items: [
      { id: 'ielts_cert', text: 'IELTS / TOEFL Certificate', hint: 'Check if validity is within 2 years.' },
      { id: 'moi_cert', text: 'Medium of Instruction (MOI) Letter', hint: 'Must explicitly state bachelor degree was taught entirely in English.' }
    ]
  },
  {
    id: "supporting",
    title: "Supporting Documents",
    items: [
      { id: 'sop', text: 'Statement of Purpose (SOP)', hint: 'Tailored specifically for this scholarship. Use our SOP Helper.' },
      { id: 'lor1', text: 'Recommendation Letter 1 (Academic)', hint: 'Signed by your university professor.' },
      { id: 'lor2', text: 'Recommendation Letter 2 (Professional/Academic)', hint: 'Signed and stamped with official letterhead.' },
      { id: 'cv', text: 'Europass / Standard CV', hint: 'Include publications, work experience, and accurate timelines.' }
    ]
  },
  {
    id: "legal",
    title: "Legal & Medical",
    items: [
      { id: 'pcc', text: 'Police Clearance Certificate (PCC)', hint: 'Apply online. Must be attested by MOFA.' },
      { id: 'medical', text: 'Standard Medical Certificate', hint: 'Signed by a registered doctor (BMDC valid).' }
    ]
  }
];

function ChecklistContent() {
  const searchParams = useSearchParams();
  const initialSelected = searchParams.get("id") || scholarshipsData[0].id;
  const [selectedSch, setSelectedSch] = useState(initialSelected);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSch = localStorage.getItem('checklist_target');
    const savedChecks = localStorage.getItem('checklist_data');
    if (savedSch) setSelectedSch(savedSch);
    if (savedChecks) {
      try {
        setCheckedItems(JSON.parse(savedChecks));
      } catch (e) {
        console.error("Failed to parse checklist items");
      }
    }
  }, []);

  const handleSchChange = (val: string) => {
    setSelectedSch(val);
    if (mounted) {
      localStorage.setItem('checklist_target', val);
    }
  };

  const toggleCheck = (id: string) => {
    const nextFn = (prev: any) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('checklist_data', JSON.stringify(next));
      return next;
    };
    setCheckedItems(nextFn);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all document progress?')) {
      setCheckedItems({});
      localStorage.removeItem('checklist_data');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalItems = defaultDocuments.reduce((sum, category) => sum + category.items.length, 0);
  const checkedCount = defaultDocuments.reduce((sum, category) => {
    return sum + category.items.filter(item => checkedItems[item.id]).length;
  }, 0);

  const stats = useMemo(() => {
    const percent = totalItems === 0 ? 0 : Math.round((checkedCount / totalItems) * 100);
    return { total: totalItems, done: checkedCount, percent };
  }, [totalItems, checkedCount]);

  const dashOffset = 251.2 - (251.2 * stats.percent) / 100;

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .checklist-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: var(--space-8);
          align-items: stretch;
        }
        
        .checklist-sidebar-premium {
          position: sticky;
          top: calc(var(--nav-height) + 20px);
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          box-shadow: var(--shadow-xl);
          backdrop-filter: blur(16px);
          z-index: 10;
        }

        .checklist-progress-ring {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 0 auto;
        }

        .progress-circle-bg {
          fill: none;
          stroke: var(--border-color);
          stroke-width: 10;
        }

        .progress-circle-fill {
          fill: none;
          stroke: var(--emerald-accent);
          stroke-width: 10;
          stroke-linecap: round;
          stroke-dasharray: 251.2;
          transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          filter: drop-shadow(0 0 6px rgba(52, 199, 89, 0.4));
        }

        .checklist-section-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          margin-bottom: var(--space-6);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
        }
        
        .checklist-section-premium:hover {
          box-shadow: var(--shadow-lg);
          border-color: rgba(0,106,78,0.3);
        }

        .checklist-header.completed {
          background: linear-gradient(135deg, rgba(0,106,78,0.1), rgba(0,106,78,0.05));
          border-bottom: 1px solid rgba(0,106,78,0.2);
        }

        .checklist-header {
          padding: var(--space-4) var(--space-6);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: var(--bg-secondary);
        }

        .checklist-items-grid {
          padding: var(--space-4) var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .checklist-item-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-4);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          background: var(--bg-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checklist-item-card:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-ultra-light);
        }

        .checklist-item-card.is-checked {
          background: var(--bg-secondary);
          border-color: transparent;
          opacity: 0.8;
        }

        .checklist-item-card.is-checked .item-title {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .custom-checkbox-premium {
          appearance: none;
          width: 24px;
          height: 24px;
          border: 2px solid var(--text-muted);
          border-radius: 6px;
          background-color: transparent;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          margin-top: 2px;
        }

        .custom-checkbox-premium:checked {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .custom-checkbox-premium:checked::after {
          content: '✓';
          position: absolute;
          color: white;
          font-size: 16px;
          font-weight: bold;
          left: 5px;
          top: -1px;
        }

        .premium-select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          background-color: var(--bg-secondary);
          border: 1.5px solid var(--border-color);
          color: var(--text-primary);
          padding: 14px 16px;
          padding-right: 48px;
          border-radius: var(--radius-xl);
          font-size: var(--text-base);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          box-shadow: var(--shadow-sm);
        }

        .premium-select:hover {
          border-color: var(--color-primary);
          background-color: var(--bg-primary);
        }

        .premium-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px var(--color-primary-ultra-light);
          background-color: var(--bg-primary);
        }

        .dashboard-header-premium {
          background: var(--hero-bg);
          padding: calc(var(--nav-height) + var(--space-20)) 0 var(--space-24);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .dashboard-header-premium::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: var(--hero-glow);
          pointer-events: none;
        }

        @media screen and (max-width: 960px) {
          .checklist-layout {
            grid-template-columns: 1fr;
          }
          .checklist-sidebar-premium {
            position: relative;
            top: 0;
            margin-bottom: var(--space-6);
          }
          .dashboard-header-premium {
            padding: calc(var(--nav-height) + var(--space-4)) 0 var(--space-8);
          }
          .dashboard-header-premium h1 {
            font-size: 2.125rem !important;
          }
        }
      `}} />

      {/* PAGE HEADER */}
      <header className="dashboard-header-premium print-hide">
        <div className="container text-center">
          <div className="badge" style={{ marginBottom: 'var(--space-4)', padding: '6px 16px', fontSize: '13px', background: 'var(--emerald-accent)', color: 'white', fontWeight: 800 }}>
            <FileCheck size={14} /> MASTER CHECKLIST
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: 'var(--space-4)', letterSpacing: '-0.02em', fontWeight: 800, color: 'white' }}>
            Your Document <span style={{ color: 'var(--emerald-accent)' }}>Arsenal</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Track everything you need to apply successfully. Progress is saved securely to your browser.
          </p>
        </div>
      </header>

      <section className="section-sm" style={{ paddingTop: 'var(--space-10)' }}>
        <div className="container">
          <div className="checklist-layout">
            
            {/* SIDEBAR UI */}
            <aside className="print-hide">
              <div className="checklist-sidebar-premium">
                
                <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
                  <label className="form-label" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Landmark size={16} style={{ color: 'var(--color-primary)' }}/> Target Scholarship
                  </label>
                  <select className="premium-select" value={selectedSch} onChange={e => handleSchChange(e.target.value)}>
                    {scholarshipsData.map(s => <option key={s.id} value={s.id}>{s.flag} {s.name}</option>)}
                  </select>
                </div>

                <div className="progress-container" style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
                  <div className="checklist-progress-ring">
                    <svg width="140" height="140" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="progress-circle-bg" />
                      <circle cx="50" cy="50" r="40" className="progress-circle-fill" strokeDashoffset={dashOffset} />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1, color: 'var(--text-primary)' }}>{stats.percent}%</span>
                    </div>
                  </div>
                  <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {stats.done} of {stats.total} documents ready
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start', padding: '14px 20px', fontSize: 'var(--text-md)' }} onClick={handlePrint}>
                    <DownloadCloud size={18} /> Download / Print PDF
                  </button>
                  <Link href="/sop-helper" className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start', padding: '14px 20px' }}>
                    <FileSignature size={18} /> Generate SOP Fast
                  </Link>
                  <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start', padding: '14px 20px', borderColor: 'transparent', color: 'var(--text-muted)' }} onClick={resetProgress}>
                    <RotateCcw size={18} /> Reset Progress
                  </button>
                </div>

              </div>
            </aside>

            {/* MAIN CHECKLIST UI */}
            <main role="main" style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, paddingBottom: 'var(--space-2)', borderBottom: '2px solid var(--emerald-accent)', display: 'inline-block', color: 'var(--text-primary)' }}>
                  Checklist: {scholarshipsData.find(s => s.id === selectedSch)?.name}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {defaultDocuments.map(section => {
                   const sectionDone = section.items.length > 0 && section.items.every(i => checkedItems[i.id]);
                   
                   return (
                     <div key={section.id} className="checklist-section-premium fade-in-up">
                       <div className={`checklist-header ${sectionDone ? 'completed' : ''}`}>
                         {sectionDone ? (
                           <CheckCircle size={22} style={{ color: 'var(--color-primary)' }} />
                         ) : (
                           <AlertCircle size={22} style={{ color: 'var(--text-muted)' }} />
                         )}
                         <h3 style={{ fontSize: 'var(--text-lg)', margin: 0, fontWeight: 700, color: sectionDone ? 'var(--color-primary-dark)' : 'var(--text-primary)' }}>
                           {section.title}
                         </h3>
                         <span style={{ marginLeft: 'auto', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>
                           {section.items.filter(i => checkedItems[i.id]).length} / {section.items.length}
                         </span>
                       </div>
                       
                       <div className="checklist-items-grid">
                         {section.items.map(item => (
                           <label key={item.id} className={`checklist-item-card ${checkedItems[item.id] ? 'is-checked' : ''}`}>
                             <input 
                               type="checkbox" 
                               className="custom-checkbox-premium"
                               checked={!!checkedItems[item.id]} 
                               onChange={() => toggleCheck(item.id)} 
                             />
                             <div style={{ flex: 1 }}>
                               <div className="item-title" style={{ fontWeight: 600, fontSize: 'var(--text-base)', marginBottom: '4px', color: 'var(--text-primary)', transition: 'color 0.2s' }}>
                                 {item.text}
                               </div>
                               <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.4 }}>
                                 <Lightbulb size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-warning)' }} /> 
                                 {item.hint}
                               </div>
                             </div>
                           </label>
                         ))}
                       </div>
                     </div>
                   );
                })}
              </div>
            </main>

          </div>
        </div>
      </section>
    </>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: 'var(--space-20)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Loading your checklist...</p>
      </div>
    }>
      <ChecklistContent />
    </Suspense>
  );
}
