import Link from "next/link";
import scholarships from "@/data/scholarships.json";

export default function Ielts() {
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

  return (
    <main role="main">
      <header className="page-header">
        <div className="container page-header-content">
          <span className="section-label" style={{ marginBottom: 'var(--space-4)' }}>IELTS & MOI Guide</span>
          <h1>📝 IELTS Information for BD Students</h1>
          <p>Learn which scholarships require IELTS, what a MOI letter is, how to get one from your BD university, and free resources to improve your score.</p>
        </div>
      </header>

      <section className="section-sm">
        <div className="container ielts-content" style={{ maxWidth: '960px', margin: '0 auto' }}>

          <div className="alert alert-success" style={{ marginBottom: 'var(--space-8)', fontSize: 'var(--text-base)' }}>
            <span style={{ fontSize: '1.5rem' }}>🎉</span>
            <span>
              <strong>Good news!</strong> Many top scholarships for Bangladeshi students do <strong>NOT require IELTS</strong>. A Medium of Instruction (MOI) letter from your university is enough. Scroll down to see which ones.
            </span>
          </div>

          <div className="info-card fade-in-up" id="no-ielts-scholarships">
            <h2>✅ Scholarships That Do NOT Require IELTS</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)', lineHeight: '1.7' }}>
              These scholarships accept a <strong>Medium of Instruction (MOI) letter</strong> instead of IELTS. This is a huge advantage for Bangladeshi students who studied in English-medium universities.
            </p>
            <div>
              {noIelts.map(s => (
                <Link key={s.id} href={`/scholarships/${s.id}`} className="no-ielts-card" style={{
                  background: 'linear-gradient(135deg, var(--color-primary-ultra-light) 0%, rgba(0,106,78,0.03) 100%)',
                  border: '2px solid var(--color-primary)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-3)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'all var(--transition-base)'
                }}>
                  <span className="no-ielts-flag" style={{ fontSize: '2.5rem', flexShrink: 0 }}>{s.flag}</span>
                  <div className="no-ielts-info" style={{ flex: 1 }}>
                    <div className="no-ielts-name" style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', marginBottom: '2px' }}>{s.name}</div>
                    <div className="no-ielts-country" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                      {s.country} · {s.degrees.join(', ')} · {s.moi_accepted ? '✅ MOI Accepted' : '✅ No IELTS Required'}
                    </div>
                  </div>
                  <span className="badge badge-green">No IELTS ✓</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="info-card fade-in-up">
            <h2>❓ What is a MOI Letter?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)', lineHeight: '1.7' }}>
              A <strong>Medium of Instruction (MOI) letter</strong> is an official document from your university confirming that your Bachelor's or Master's degree was taught entirely in English. It serves as proof of English proficiency in place of IELTS for many international scholarships.
            </p>

            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>How to Get a MOI Letter from Your BD University</h3>
            <div>
              <div className="moi-step" style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-color)' }}>
                <div className="moi-step-num" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)', flexShrink: 0 }}>1</div>
                <div className="moi-step-content">
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: '4px' }}>Visit or Email Your Registrar's Office</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Go to your university's Registrar office in person, or email them. Mention that you need a "Medium of Instruction Certificate" for an international scholarship application. Universities like DU, BUET, NSU, BRAC, DIU, AIUB, RUET, KUET all issue MOI letters regularly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card fade-in-up">
            <h2>📊 IELTS Score Requirements by Scholarship</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="score-table" role="table" aria-label="IELTS requirements per scholarship">
                <thead>
                  <tr>
                    <th scope="col">Scholarship</th>
                    <th scope="col">Country</th>
                    <th scope="col">IELTS Required?</th>
                    <th scope="col">Min. Score</th>
                    <th scope="col">MOI Accepted?</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map(s => (
                    <tr key={s.id}>
                      <td>{s.flag} {s.name}</td>
                      <td>{s.country}</td>
                      <td>
                        <span className={`score-badge ${s.ielts_required ? 'score-required' : 'score-na'}`}>
                          {s.ielts_required ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        {s.ielts_required ? (
                          <span className="score-badge score-required">6.0–7.0+</span>
                        ) : (
                          <span className="score-badge score-na">Not Required</span>
                        )}
                      </td>
                      <td>
                        <span className={`score-badge ${s.moi_accepted ? 'score-na' : 'score-required'}`}>
                          {s.moi_accepted ? 'Yes ✓' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
