import { notFound } from "next/navigation";
import scholarships from "@/data/scholarships.json";
import Link from "next/link";
import ClientDetailActions from "./ClientDetailActions";
import { ChevronLeft, MapPin, GraduationCap, FileCheck, Award, Info, BookOpen, Briefcase, Tag, CheckCircle2, AlertCircle } from "lucide-react";

// Generate static pages at build time! (SSG)
export function generateStaticParams() {
  return scholarships.map((s) => ({
    id: s.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = scholarships.find((s) => s.id === id);
  if (!scholarship) return { title: "Not Found" };
  
  return {
    title: `${scholarship.name} — BDScholarship`,
    description: `${scholarship.name} — ${scholarship.country}. ${scholarship.description.substring(0, 160)}`,
  };
}

export default async function ScholarshipDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = scholarships.find((s) => s.id === id);

  if (!scholarship) {
    notFound();
  }

  // Pre-calculate days left on server
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(scholarship.deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isPast = daysLeft <= 0;
  const isUrgent = daysLeft > 0 && daysLeft <= 30;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .detail-hero-premium {
          background: linear-gradient(135deg, #001a14 0%, #006a4e 100%);
          padding: calc(var(--nav-height) + var(--space-6)) 0 var(--space-12);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .detail-hero-premium::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-flag-floating {
          font-size: 2.5rem;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          margin-bottom: var(--space-4);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
        }

        .detail-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .detail-card-premium:hover {
          box-shadow: var(--shadow-xl);
          border-color: rgba(0,106,78,0.2);
        }

        .detail-card-premium::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 4px; height: 100%;
          background: var(--color-primary);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .detail-card-premium:hover::before {
          opacity: 1;
        }

        .section-icon-box {
          width: 40px;
          height: 40px;
          background: var(--color-primary-ultra-light);
          color: var(--color-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-4);
        }

        .meta-stat-premium {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-stat-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          font-weight: 800;
        }

        .meta-stat-value {
          font-size: var(--text-base);
          font-weight: 800;
        }

        .bd-special-card {
          background: linear-gradient(135deg, var(--color-primary-ultra-light) 0%, rgba(0,106,78,0.03) 100%);
          border: 2px solid var(--color-primary);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          position: relative;
        }

        .bd-badge-floating {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--color-primary);
          color: white;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }

        @media (max-width: 960px) {
          .detail-layout {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          .detail-sidebar {
            position: relative !important;
            top: 0 !important;
            order: -1; /* Move call to action to top on mobile */
          }
        }

        @media (max-width: 768px) {
          .detail-hero-premium {
            padding: calc(var(--nav-height) + var(--space-8)) 0 var(--space-12);
          }
          .hero-flag-floating {
            position: relative;
            left: 0;
            top: 0;
            width: 60px;
            height: 60px;
            font-size: 2rem;
            margin-bottom: var(--space-6);
          }
          .meta-stats-grid {
             grid-template-columns: 1fr 1fr !important;
             gap: var(--space-6) !important;
             margin-top: var(--space-8) !important;
          }
          .detail-card-premium, .bd-special-card {
            padding: var(--space-6);
          }
          .bd-badge-floating {
            position: relative;
            top: 0;
            right: 0;
            display: inline-block;
            margin-bottom: var(--space-4);
          }
        }

        @media (max-width: 480px) {
          .meta-stats-grid {
             grid-template-columns: 1fr !important;
          }
        }
      `}} />

      {/* PAGE HEADER */}
      <header className="detail-hero-premium" aria-label="Scholarship header">
        <div className="container">
          <Link href="/scholarships" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-4)', textDecoration: 'none' }} className="hover-translate-x">
            <ChevronLeft size={14} /> Back to Search
          </Link>
          
          <div className="hero-flag-floating fade-in-up">{scholarship.flag}</div>
          
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: 'var(--space-2)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {scholarship.name}
            </h1>
            <div style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-6)' }}>
              <MapPin size={18} style={{ color: '#34C759' }} /> {scholarship.country}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {scholarship.degrees.map(d => (
                <span key={d} className="badge" style={{ background: d === 'Bachelor' ? '#007AFF' : d === 'Master' ? '#34C759' : '#FF9500', color: 'white', padding: '4px 12px', fontSize: '11px', fontWeight: 800 }}>
                  <GraduationCap size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }}/> {d}
                </span>
              ))}
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', padding: '4px 12px', fontSize: '11px', fontWeight: 800 }}>
                {scholarship.ielts_required ? 'IELTS Required' : '✓ No IELTS'}
              </span>
            </div>

            <div className="meta-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-10)', marginTop: 'var(--space-10)' }}>
              <div className="meta-stat-premium">
                <span className="meta-stat-label">Application Cycle</span>
                <span className="meta-stat-value">{scholarship.deadline}</span>
              </div>
              <div className="meta-stat-premium">
                <span className="meta-stat-label">Academic Merit</span>
                <span className="meta-stat-value">{scholarship.min_cgpa} GPA</span>
              </div>
              <div className="meta-stat-premium">
                <span className="meta-stat-label">Financial Status</span>
                <span className="meta-stat-value">Fully Funded</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: 'var(--space-12) var(--container-padding)' }}>
        <div className="detail-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-10)', alignItems: 'start' }}>
          
          <main role="main" className="detail-main">
            
            {/* OVERVIEW */}
            <div className="detail-card-premium fade-in-up">
              <div className="section-icon-box"><BookOpen size={20} /></div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Opportunity Overview</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: 'var(--text-base)' }}>{scholarship.description}</p>
            </div>

            {/* COVERAGE */}
            <div className="detail-card-premium fade-in-up">
              <div className="section-icon-box" style={{ background: 'rgba(52, 199, 89, 0.1)', color: '#34C759' }}><Award size={20} /></div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Scholarship Benefits</h2>
              <div style={{ background: '#f8f9fa', borderLeft: '4px solid #34C759', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '12px' }}>
                <CheckCircle2 size={24} style={{ color: '#34C759', flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: '#1a1a1a', lineHeight: 1.5 }}>{scholarship.funding}</span>
              </div>
            </div>

            {/* BD SPECIFIC */}
            <div className="bd-special-card fade-in-up">
              <div className="bd-badge-floating">Bangladesh Exclusive</div>
              <div className="section-icon-box"><Briefcase size={20} /></div>
              <h2 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>How Bangladeshi Students Apply</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)' }}>{scholarship.bd_specific_notes}</p>
              
              {scholarship.bd_sending_partner && (
                <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', display: 'flex', gap: '15px' }}>
                   <div style={{ background: 'var(--color-primary-ultra-light)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Info size={18} style={{ color: 'var(--color-primary)' }} />
                   </div>
                   <div>
                    <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.05em' }}>Required Sending Partner</div>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{scholarship.bd_sending_partner}</div>
                   </div>
                </div>
              )}
            </div>

            {/* TAGS */}
            <div className="detail-card-premium fade-in-up" style={{ marginBottom: 0 }}>
              <div className="section-icon-box" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-muted)' }}><Tag size={20} /></div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Classification</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {scholarship.tags.map(t => (
                  <span key={t} className="badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '6px 14px', textTransform: 'capitalize' }}>
                    {t.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="detail-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-4))' }}>
            <ClientDetailActions scholarship={scholarship} isPast={isPast} daysLeft={daysLeft} />
          </aside>
        </div>
      </div>
    </>
  );
}
