import Link from "next/link";
import scholarships from "@/data/scholarships.json";

export default function Home() {
  const stats = {
    total: scholarships.length,
    countries: new Set(scholarships.map((s) => s.country)).size,
    bdPartners: new Set(scholarships.map((s) => s.bd_sending_partner).filter(p => p && p !== 'Apply directly to university')).size,
  };

  // Find 3 upcoming deadlines (filtering out past)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcoming = scholarships
    .filter(s => new Date(s.deadline) >= today)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  // Helper formatting distance
  const getDaysLeft = (dateStr: string) => {
    const diffTime = Math.abs(new Date(dateStr).getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <main role="main">
      {/* HERO SECTION */}
      <header className="hero">
        <div className="container hero-content">
          <div className="badge badge-accent fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
            <span className="live-dot"></span>
            100% Free · For Bangladeshi Students
          </div>
          <h1 className="hero-title fade-in-up" style={{ animationDelay: '100ms' }}>
            Find Your Fully Funded Scholarship <span className="floating-emoji">🇧🇩</span>
          </h1>
          <p className="hero-subtitle fade-in-up" style={{ animationDelay: '200ms' }}>
            The largest database of fully funded international scholarships specifically curated for BD students. 
            Includes IELTS requirements, BD-specific sending partners, and exact application deadlines.
          </p>
          <div className="hero-actions fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/scholarships" className="btn btn-primary btn-lg">🔍 Find Scholarships</Link>
            <Link href="/checklist" className="btn btn-white btn-lg pulse">📄 Check Your Docs</Link>
          </div>
        </div>
        <div className="hero-wave"></div>
      </header>

      {/* QUICK STATS */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{stats.total}+</div>
              <div className="stat-label">Fully Funded Scholarships</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.countries}+</div>
              <div className="stat-label">Destination Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">💯</div>
              <div className="stat-label">Free Forever. No Paywalls.</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">BD</div>
              <div className="stat-label">Curated for Bangladeshis</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span className="section-label">Everything You Need</span>
            <h2>We Make Applying Simple</h2>
          </div>
          <div className="grid-2 fade-in-up">
            <div className="card feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Smart Finding</h3>
              <p className="feature-desc">Filter by Master's/PhD, country, or IELTS requirement. We highlight whether you can use a Medium of Instruction (MOI) letter instead of IELTS.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">⏰</div>
              <h3 className="feature-title">Deadline Tracker</h3>
              <p className="feature-desc">Never miss a date. View countdowns, sort by urgency, and add deadlines directly to your Google Calendar.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">📄</div>
              <h3 className="feature-title">BD-Specific Checklist</h3>
              <p className="feature-desc">Generate a custom document checklist telling you exactly where to get your MOI, PCC, and Ministry attestations in Bangladesh.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">✍️</div>
              <h3 className="feature-title">SOP Helper</h3>
              <p className="feature-desc">Generate a personalized Statement of Purpose outline with a 5-step guided form designed to avoid common BD student mistakes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US vs OTHERS */}
      <section className="section bg-secondary">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span className="section-label">The Reality</span>
            <h2>Why BDScholarship Exists</h2>
          </div>
          <div style={{ overflowX: 'auto' }} className="fade-in-up">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Generic Global Sites</th>
                  <th>Costly Agencies</th>
                  <th><span className="logo-emoji">🇧🇩</span> BDScholarship</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Information Focus</td>
                  <td>Global (Often irrelevant)</td>
                  <td>Only partner unis</td>
                  <td><span className="check">✓</span> 100% BD Student Focused</td>
                </tr>
                <tr>
                  <td>BD Sending Partners listed?</td>
                  <td><span className="cross">✕</span> No</td>
                  <td><span className="cross">✕</span> Kept Secret</td>
                  <td><span className="check">✓</span> Yes (UGC, MoE, etc.)</td>
                </tr>
                <tr>
                  <td>MOI Acceptance Info</td>
                  <td><span className="cross">✕</span> Rare</td>
                  <td><span className="cross">✕</span> They sell IELTS courses</td>
                  <td><span className="check">✓</span> Yes, clearly marked</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>Free (but bad quality)</td>
                  <td>৳20k–৳50k</td>
                  <td><span className="check">✓</span> <span className="highlight-green">100% Free Forever</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* UPCOMING DEADLINES PREVIEW */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-label">Time Sensitive</span>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: '8px' }}>🔴 Act Fast: Closing Soon</h2>
            </div>
            <Link href="/deadlines" className="btn btn-outline">View All Deadlines →</Link>
          </div>
          
          <div className="grid-3" id="homeDeadlinesGrid">
            {upcoming.map(s => {
              const daysLeft = getDaysLeft(s.deadline);
              return (
                <div key={s.id} className="card fade-in-up" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                    <span style={{ fontSize: '2rem' }}>{s.flag}</span>
                    <span className="badge badge-accent">🔴 {daysLeft} Days Left</span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>{s.name}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-4)' }}>
                    📍 {s.country} · 🎓 {s.degrees.join(', ')}
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-3)', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{s.deadline}</span>
                    <Link href={`/scholarships/${s.id}`} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>See Details</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COUNTRY EXPLORE SECTION */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Explore by Destination</span>
            <h2>Where do you want to study?</h2>
          </div>
          <div className="country-grid fade-in-up">
            {[
              { c: "Hungary", e: "🇭🇺" }, { c: "Turkey", e: "🇹🇷" }, { c: "United Kingdom", e: "🇬🇧" },
              { c: "USA", e: "🇺🇸" }, { c: "Japan", e: "🇯🇵" }, { c: "Germany", e: "🇩🇪" },
              { c: "South Korea", e: "🇰🇷" }, { c: "Australia", e: "🇦🇺" }, { c: "China", e: "🇨🇳" },
              { c: "Sweden", e: "🇸🇪" }, { c: "Italy", e: "🇮🇹" }, { c: "Romania", e: "🇷🇴" },
              { c: "Switzerland", e: "🇨🇭" }, { c: "Slovakia", e: "🇸🇰" }, { c: "New Zealand", e: "🇳🇿" }
            ].map(country => (
              <Link href={`/scholarships?country=${encodeURIComponent(country.c)}`} key={country.c} className="country-card">
                <span className="country-flag">{country.e}</span>
                <span className="country-name">{country.c}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
