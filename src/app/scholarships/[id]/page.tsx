import { notFound } from "next/navigation";
import scholarships from "@/data/scholarships.json";
import Link from "next/link";
import ClientDetailActions from "./ClientDetailActions";

// Generate static pages at build time! (SSG)
export function generateStaticParams() {
  return scholarships.map((s) => ({
    id: s.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const scholarship = scholarships.find((s) => s.id === params.id);
  if (!scholarship) return { title: "Not Found" };
  
  return {
    title: `${scholarship.name} — BDScholarship`,
    description: `${scholarship.name} — ${scholarship.country}. ${scholarship.description.substring(0, 160)}`,
  };
}

export default function ScholarshipDetail({ params }: { params: { id: string } }) {
  const scholarship = scholarships.find((s) => s.id === params.id);

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
      {/* PAGE HEADER */}
      <header className="page-header" aria-label="Scholarship header">
        <div className="container">
          <Link href="/scholarships" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-sm)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
            ← Back to Scholarships
          </Link>
          <div className="detail-hero-flag" aria-hidden="true" style={{ fontSize: '4rem', marginBottom: 'var(--space-2)' }}>{scholarship.flag}</div>
          <div className="detail-name" style={{ fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))', fontWeight: 'var(--font-extrabold)', color: 'var(--color-white)', marginBottom: 'var(--space-2)' }}>{scholarship.name}</div>
          <div className="detail-country" style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-4)' }}>📍 {scholarship.country}</div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
            {scholarship.degrees.map(d => (
              <span key={d} className={`badge badge-${d === 'Bachelor' ? 'blue' : d === 'Master' ? 'green' : 'orange'}`} style={{ fontSize: 'var(--text-xs)', padding: '4px 12px' }}>{d}</span>
            ))}
            {scholarship.ielts_required ? (
              <span className="badge" style={{ background: 'rgba(244,42,65,0.2)', color: 'white' }}>IELTS Required</span>
            ) : (
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>✓ No IELTS</span>
            )}
            
            {isPast ? (
              <span className="badge" style={{ background: 'rgba(244,42,65,0.8)', color: 'white' }}>⚠️ Deadline Passed</span>
            ) : isUrgent ? (
              <span className="badge" style={{ borderLeft: '3px solid var(--color-accent)', background: 'var(--bg-secondary)' }}>🔴 Closing Soon</span>
            ) : null}
          </div>

          <div className="detail-meta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <div className="detail-meta-item" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
              <div className="detail-meta-label" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Application Deadline</div>
              <div className="detail-meta-value" style={{ fontSize: 'var(--text-base)', fontWeight: 'bold' }}>{scholarship.deadline}</div>
            </div>
            <div className="detail-meta-item" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
              <div className="detail-meta-label" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Min. CGPA</div>
              <div className="detail-meta-value" style={{ fontSize: 'var(--text-base)', fontWeight: 'bold' }}>{scholarship.min_cgpa} / 4.0</div>
            </div>
            <div className="detail-meta-item" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
              <div className="detail-meta-label" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>IELTS</div>
              <div className="detail-meta-value" style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>
                {scholarship.ielts_required ? '✗ Required' : scholarship.moi_accepted ? '✓ MOI Accepted' : '✓ Not Required'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: 'var(--space-10) var(--container-padding)' }}>
        <div className="detail-layout" style={{ display: 'grid', gap: 'var(--space-8)', alignItems: 'start' }}>
          
          <main role="main" className="detail-main" style={{ gridColumn: '1' }}>
            <div className="detail-card fade-in-up" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>📖 Overview</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{scholarship.description}</p>
            </div>

            <div className="detail-card fade-in-up" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>💰 What&apos;s Covered</h2>
              <div className="alert alert-success" style={{ marginBottom: 0 }}>
                <span>✅</span>
                <span>{scholarship.funding}</span>
              </div>
            </div>

            <div className="fade-in-up" style={{ background: 'linear-gradient(135deg, var(--color-primary-ultra-light) 0%, rgba(0,106,78,0.03) 100%)', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-xl)' }}>🇧🇩 How Bangladeshi Students Apply</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 'var(--space-4)' }}>{scholarship.bd_specific_notes}</p>
              
              {scholarship.bd_sending_partner && (
                <div className="alert alert-info" style={{ marginBottom: 0 }}>
                  <span>ℹ️</span>
                  <span><strong>BD Sending Partner:</strong> {scholarship.bd_sending_partner}</span>
                </div>
              )}
            </div>

            <div className="detail-card fade-in-up" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>🏷️ Tags</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {scholarship.tags.map(t => (
                  <span key={t} className="badge badge-gray">{t.replace(/_/g, ' ')}</span>
                ))}
              </div>
            </div>
          </main>

          {/* Client-side actions and timer */}
          <aside className="detail-sidebar" style={{ gridColumn: '2', position: 'sticky', top: 'var(--space-4)' }}>
            <ClientDetailActions scholarship={scholarship} isPast={isPast} daysLeft={daysLeft} />
          </aside>
        </div>
      </div>
    </>
  );
}
