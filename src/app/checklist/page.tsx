"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import scholarshipsData from "@/data/scholarships.json";

// Document structure replicated from checklist.js
const defaultDocuments = [
  {
    id: "identity",
    title: "Identity & Core",
    items: [
      { id: "passport", text: "Valid Passport (min 6 months validity)", hint: "Need ASAP? Apply for e-Passport at Agargaon or regional passport office. Takes ~15-21 days." },
      { id: "photo", text: "Passport size photographs (White background)", hint: "Usually 35x45mm or 2x2 inches. Keep physical and scanned copies." },
      { id: "nid", text: "National ID Card or Birth Certificate (English)", hint: "If birth certificate is in Bangla, get it translated and notarized." }
    ]
  },
  {
    id: "academic",
    title: "Academic Records",
    items: [
      { id: "degree_cert", text: "Bachelor's/Master's Degree Certificate", hint: "Must be attested by your university. Provisional goes if original isn't issued yet." },
      { id: "transcript", text: "Official Transcripts", hint: "Must show all semesters. Get 3-4 sealed copies from your university Registrar." },
      { id: "hsc_ssc", text: "HSC & SSC Certificates + Marksheets", hint: "Must be attested by the Education Board if required (e.g., for CSC China)." }
    ]
  },
  {
    id: "language",
    title: "Language Proficiency",
    items: [
      { id: "ielts", text: "IELTS/TOEFL Score Report (if required)", hint: "Check if the scholarship accepts MOI. British Council/IDP issues it." },
      { id: "moi", text: "Medium of Instruction (MOI) Certificate", hint: "Get this from your university Registrar mentioning your degree was taught in English." }
    ]
  },
  {
    id: "statement",
    title: "Statements & Essays",
    items: [
      { id: "sop", text: "Statement of Purpose (SOP)", hint: "Max 2 pages usually. Do not copy from the internet." },
      { id: "study_plan", text: "Study Plan / Research Proposal", hint: "Mainly for Master's/PhD. Should align with the professor's research." }
    ]
  },
  {
    id: "reference",
    title: "Letters of Recommendation (LOR)",
    items: [
      { id: "lor1", text: "Academic LOR 1 (Professor/Assoc. Prof)", hint: "Must be on university letterhead with official seal and signature." },
      { id: "lor2", text: "Academic/Professional LOR 2", hint: "Can be from an employer if you have work experience." }
    ]
  },
  {
    id: "professional",
    title: "Professional & Extra-Curricular",
    items: [
      { id: "cv", text: "Europass/Standard CV", hint: "Max 2 pages. Include publications, work experience, and volunteering." },
      { id: "experience", text: "Work/Experience Certificates", hint: "If you mentioned work experience, you must provide proof." }
    ]
  },
  {
    id: "legal",
    title: "Legal & Medical",
    items: [
      { id: "medical", text: "Medical Fitness Certificate", hint: "Usually a specific form provided by the scholarship (e.g., Chinese Foreigner Physical Exam)." },
      { id: "pcc", text: "Police Clearance Certificate (PCC)", hint: "Apply online at pcc.police.gov.bd. Costs 500 BDT via sonali bank. Takes ~1-2 weeks." }
    ]
  }
];

function ChecklistContent() {
  const searchParams = useSearchParams();
  const [selectedSch, setSelectedSch] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setMounted(true);
    const paramId = searchParams.get("id");
    let initialSch = paramId || scholarshipsData[0].id;
    
    // Check if ID is valid
    if (!scholarshipsData.find(s => s.id === initialSch)) {
      initialSch = scholarshipsData[0].id;
    }
    
    setSelectedSch(initialSch);
    
    const saved = localStorage.getItem(`checklist_${initialSch}`);
    if (saved) {
      try { setCheckedItems(JSON.parse(saved)); } catch (e) {}
    } else {
      setCheckedItems({});
    }
  }, [searchParams]);

  // Save to LocalStorage on change
  useEffect(() => {
    if (mounted && selectedSch) {
      localStorage.setItem(`checklist_${selectedSch}`, JSON.stringify(checkedItems));
    }
  }, [checkedItems, selectedSch, mounted]);

  const handleSchChange = (id: string) => {
    setSelectedSch(id);
    const saved = localStorage.getItem(`checklist_${id}`);
    setCheckedItems(saved ? JSON.parse(saved) : {});
    // Update URL without page reload
    window.history.replaceState(null, '', `?id=${id}`);
  };

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const resetProgress = () => {
    if (confirm("Are you sure? This unchecks all items.")) {
      setCheckedItems({});
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const stats = useMemo(() => {
    let total = 0;
    let done = 0;
    defaultDocuments.forEach(sec => {
      sec.items.forEach(item => {
        total++;
        if (checkedItems[item.id]) done++;
      });
    });
    return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
  }, [checkedItems]);

  const dashOffset = 251.2 - (251.2 * stats.percent) / 100;

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <>
      <header className="page-header print-hide">
        <div className="container page-header-content">
          <span className="section-label" style={{ marginBottom: 'var(--space-4)' }}>Stay Organized</span>
          <h1>✅ Document Checklist</h1>
          <p>Generate a tailored checklist. Your progress saves automatically to your browser.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="container checklist-container">
          
          <aside className="checklist-sidebar print-hide">
            <div className="checklist-card" style={{ position: 'sticky', top: 'var(--space-4)' }}>
              
              <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                <label className="form-label">Target Scholarship</label>
                <select className="form-select" value={selectedSch} onChange={e => handleSchChange(e.target.value)}>
                  {scholarshipsData.map(s => <option key={s.id} value={s.id}>{s.flag} {s.name}</option>)}
                </select>
              </div>

              <div className="progress-container" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="8"
                            strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={dashOffset}
                            style={{ transition: 'stroke-dashoffset 0.5s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {stats.percent}%
                  </div>
                </div>
                <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)' }}>{stats.done} of {stats.total} documents ready</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handlePrint}>🖨️ Print / Save PDF</button>
                <button className="btn btn-outline" style={{ width: '100%' }} onClick={resetProgress}>🔄 Reset Progress</button>
                <Link href="/sop-helper" className="btn btn-outline" style={{ width: '100%' }}>✍️ Write SOP Now</Link>
              </div>

            </div>
          </aside>

          <main role="main" className="checklist-main">
            <div className="print-only">
              <h2>Document Checklist for: {scholarshipsData.find(s => s.id === selectedSch)?.name}</h2>
              <p>Generated by BDScholarship</p>
              <hr style={{ margin: 'var(--space-4) 0' }} />
            </div>

            {defaultDocuments.map(section => {
               const sectionDone = section.items.every(i => checkedItems[i.id]);
               return (
                 <div key={section.id} className="checklist-section fade-in-up">
                   <div className="checklist-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: sectionDone ? 'var(--color-primary-light)' : 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                     <h3 style={{ fontSize: 'var(--text-lg)', margin: 0, color: sectionDone ? 'var(--color-primary-dark)' : 'var(--text-primary)' }}>
                       {sectionDone ? '✅ ' : ''}{section.title}
                     </h3>
                   </div>
                   <div className="checklist-items" style={{ padding: 'var(--space-4) 0' }}>
                     {section.items.map(item => (
                       <label key={item.id} className={`checklist-item ${checkedItems[item.id] ? 'checked' : ''}`} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-2)', cursor: 'pointer', transition: 'all 0.2s', background: checkedItems[item.id] ? 'var(--color-primary-ultra-light)' : 'var(--card-bg)' }}>
                         <div className="checklist-checkbox" style={{ paddingTop: '2px' }}>
                           <input type="checkbox" checked={!!checkedItems[item.id]} onChange={() => toggleCheck(item.id)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                         </div>
                         <div className="checklist-content">
                           <div className="checklist-text" style={{ fontWeight: 500, fontSize: 'var(--text-base)', marginBottom: '4px', textDecoration: checkedItems[item.id] ? 'line-through' : 'none', color: checkedItems[item.id] ? 'var(--text-muted)' : 'var(--text-primary)' }}>{item.text}</div>
                           <div className="checklist-hint" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>💡 {item.hint}</div>
                         </div>
                       </label>
                     ))}
                   </div>
                 </div>
               );
            })}
          </main>

        </div>
      </section>
    </>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>Loading checklist...</div>
    }>
      <ChecklistContent />
    </Suspense>
  );
}
