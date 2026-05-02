"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import scholarships from "@/data/scholarships.json";
import { Search, Clock, FileText, PenTool, CheckCircle2, XCircle, Timer, Globe2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, GraduationCap, MapPin, ChevronRight, Compass } from "lucide-react";

export default function Home() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const keywords = ["Germany", "Masters", "USA", "PhD", "Full Fund", "UK", "CSC", "Europe", "Italy", "Japan"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [keywords.length]);

  const stats = {
    total: scholarships.length,
    countries: new Set(scholarships.map((s) => s.country)).size,
    bdPartners: new Set(scholarships.map((s) => s.bd_sending_partner).filter(p => p && p !== 'Apply directly to university')).size,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcoming = scholarships
    .filter(s => new Date(s.deadline) >= today)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const getDaysLeft = (dateStr: string) => {
    const diffTime = Math.abs(new Date(dateStr).getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <main role="main">
      <style dangerouslySetInnerHTML={{__html: `
        .premium-hero {
          background: var(--hero-bg);
          padding: calc(var(--nav-height) + var(--space-20)) 0 var(--space-24);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 960px) {
          .premium-hero {
            padding: calc(var(--nav-height) + var(--space-8)) 0 var(--space-8);
          }
          .hero-title-premium {
            font-size: 2rem !important;
            line-height: 1.1 !important;
          }
          .hero-subtitle-premium {
            font-size: 0.9rem !important;
            margin-bottom: var(--space-6);
            padding: 0 var(--space-4);
          }
          .hero-search-input-wrap {
            padding: 0 var(--space-4);
          }
          .hero-search-input {
            padding: 14px 105px 14px 54px !important;
            font-size: 0.875rem !important;
          }
          .hero-search-icon-wrap {
            left: 18px !important;
          }
          .hero-search-icon-wrap svg {
            width: 18px !important;
            height: 18px !important;
          }
          .hero-search-input::placeholder {
            font-size: 0.85rem;
          }
          .hero-search-btn {
            padding: 8px 16px !important;
            font-size: 11px !important;
            right: 8px !important;
          }
        }

        .premium-hero::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: var(--hero-glow);
          pointer-events: none;
        }

        .hero-title-premium {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: var(--space-8);
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-subtitle-premium {
          font-size: clamp(var(--text-lg), 2vw, var(--text-xl));
          color: rgba(255,255,255,0.8);
          max-width: 700px;
          margin: 0 auto var(--space-10);
          line-height: 1.6;
        }

        .stats-bar-premium {
          background: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: var(--space-8) 0;
          margin-top: -60px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 960px) {
          .stats-bar-premium {
            margin-top: 0;
          }
        }

        .stats-container-premium {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-6);
        }

        .stat-card-premium {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: var(--space-6);
          border-radius: var(--radius-2xl);
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card-premium:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-lg);
        }

        .feature-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card-premium:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(0,106,78,0.2);
        }

        .feature-card-premium::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 4px;
          background: var(--color-primary);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card-premium:hover::after {
          opacity: 1;
        }

        .comparison-premium {
          background: white;
          border-radius: var(--radius-2xl);
          border: 1px solid var(--border-color);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: var(--shadow-xl);
        }

        .country-card-premium {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: var(--space-4);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          transition: all 0.2s;
        }

        .country-card-premium:hover {
          background: var(--bg-primary);
          border-color: var(--color-primary);
          transform: scale(1.02);
          box-shadow: var(--shadow-md);
        }
      `}} />

      {/* HERO SECTION */}
      <header className="premium-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: '#34C759', color: 'white', padding: '6px 16px', marginBottom: 'var(--space-8)', fontWeight: 800, fontSize: '13px' }}>
            <Globe2 size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> 100% FREE FOR BANGLADESHI STUDENTS
          </div>
          <h1 className="hero-title-premium fade-in-up">
            Find Your Path to a <br/>
            <span style={{ color: '#34C759' }}>Fully Funded</span> Education
          </h1>
          <p className="hero-subtitle-premium fade-in-up">
            The largest database of international scholarships specifically curated for BD students. 
            Includes IELTS mappings, MOI guides, and BD-specific sending partner info.
          </p>
          <form action="/scholarships" method="GET" className="fade-in-up hero-search-input-wrap" style={{ maxWidth: '750px', margin: '0 auto', width: '100%', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div className="hero-search-icon-wrap" style={{ position: 'absolute', left: '26px', color: 'var(--color-primary)', display: 'flex' }}>
                <Search size={22} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                name="q"
                placeholder={`Search "${keywords[placeholderIndex]}"...`} 
                className="hero-search-input"
                style={{
                  width: '100%',
                  padding: '24px 140px 24px 64px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'white',
                  fontSize: '1.125rem',
                  color: '#001a14',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  outline: 'none',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.3s'
                }}
              />
              <button 
                type="submit"
                className="btn btn-primary hero-search-btn"
                style={{
                  position: 'absolute',
                  right: '10px',
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '14px',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 12px rgba(0,106,78,0.2)'
                }}
              >
                FIND NOW
              </button>
            </div>
            <div style={{ marginTop: 'var(--space-10)', display: 'flex', justifyContent: 'center' }}>
               <Link href="/scholarships" className="fade-in-up" style={{ color: '#34C759', fontSize: '15px', textDecoration: 'none', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(52, 199, 89, 0.1)', padding: '10px 24px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 199, 89, 0.2)', transition: 'all 0.3s' }}>
                 <Compass size={18} /> EXPLORE ALL SCHOLARSHIPS <ArrowRight size={18} />
               </Link>
            </div>
          </form>
        </div>
      </header>

      {/* STATS SECTION */}
      <section className="stats-bar-premium">
        <div className="container">
          <div className="stats-container-premium">
            <div className="stat-card-premium fade-in-up">
              <div style={{ color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 900, marginBottom: '4px' }}>{stats.total}+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Programs</div>
            </div>
            <div className="stat-card-premium fade-in-up" style={{ animationDelay: '100ms' }}>
              <div style={{ color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 900, marginBottom: '4px' }}>{stats.countries}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Destination Regions</div>
            </div>
            <div className="stat-card-premium fade-in-up" style={{ animationDelay: '200ms' }}>
               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                  <ShieldCheck size={44} style={{ color: '#34C759' }} strokeWidth={2.5}/>
               </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>No Hidden Paywalls</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section" style={{ padding: 'var(--space-24) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <div className="badge badge-green" style={{ marginBottom: '12px' }}>OUR MISSION</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900 }}>Simplify Your Application</h2>
          </div>
          <div className="grid-2">
            <div className="feature-card-premium fade-in-up">
              <div style={{ width: '48px', height: '48px', background: 'rgba(52, 199, 89, 0.1)', color: '#34C759', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Intelligent Matching</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Filter opportunities by Master's/PhD, specific country, or IELTS requirement. We highlight MOI letter acceptance specifically for BD institutions.</p>
            </div>
            <div className="feature-card-premium fade-in-up" style={{ animationDelay: '100ms' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 122, 255, 0.1)', color: '#007AFF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Deadline Monitoring</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Stay ahead of global timers. Access real-time countdowns, urgency sorting, and instant Google Calendar exports for every scholarship.</p>
            </div>
            <div className="feature-card-premium fade-in-up" style={{ animationDelay: '200ms' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(255, 149, 0, 0.1)', color: '#FF9500', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Document Generation</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Get a precise, BD-exclusive document roadmap. Know exactly where to apply for PCC, Ministry/Embassy attestations, and UGC verification.</p>
            </div>
            <div className="feature-card-premium fade-in-up" style={{ animationDelay: '300ms' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(175, 82, 222, 0.1)', color: '#AF52DE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <PenTool size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Guidance Outlines</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Generate personalized Statement of Purpose (SOP) structures with our guided form, engineered to address common pitfalls for Bangladeshi applicants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="section bg-secondary" style={{ padding: 'var(--space-20) 0' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900 }}>Why Use BDScholarship?</h2>
          </div>
          <div className="comparison-premium fade-in-up">
            <table className="comparison-table" style={{ margin: 0, border: 'none' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '24px' }}>Expertise Layer</th>
                  <th style={{ padding: '24px' }}>Generic Global Sites</th>
                  <th style={{ padding: '24px' }}>Local Agencies</th>
                  <th style={{ padding: '24px', background: 'var(--color-primary-ultra-light)', color: 'var(--color-primary-dark)' }}>BDScholarship Official</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Local Nuance</td>
                  <td><XCircle size={18} style={{ color: '#FF3B30' }} /> Standardized</td>
                  <td><XCircle size={18} style={{ color: '#FF3B30' }} /> Variable</td>
                  <td style={{ background: 'rgba(52, 199, 89, 0.05)', fontWeight: 700 }}>100% BD Student Verified</td>
                </tr>
                <tr>
                  <td>Transparency</td>
                  <td>Partial</td>
                  <td>Often Kept Secret</td>
                  <td style={{ background: 'rgba(52, 199, 89, 0.05)', fontWeight: 700 }}>Fully Open Data Archive</td>
                </tr>
                <tr>
                  <td>Financial Cost</td>
                  <td>Free (Ads supported)</td>
                  <td>৳20,000–৳50,000</td>
                  <td style={{ background: 'rgba(52, 199, 89, 0.05)', color: '#34C759', fontWeight: 900 }}>Absolutely Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* UPCOMING DEADLINES SECTION */}
      <section className="section" style={{ padding: 'var(--space-24) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="badge badge-accent" style={{ marginBottom: '12px' }}><Sparkles size={14}/> HOT OPPORTUNITIES</div>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900 }}>Closing Search Cycles</h2>
            </div>
            <Link href="/deadlines" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>Explore Full Timeline <ArrowRight size={18} /></Link>
          </div>
          
          <div className="grid-3">
            {upcoming.map(s => {
              const daysLeft = getDaysLeft(s.deadline);
              return (
                <Link href={`/scholarships/${s.id}`} key={s.id} className="card fade-in-up" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                    <span style={{ fontSize: '2.5rem' }}>{s.flag}</span>
                    <span style={{ background: 'rgba(255, 59, 48, 0.1)', color: '#FF3B30', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 800 }}>
                      <Timer size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {daysLeft} Days Remaining
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, marginBottom: '4px', color: 'var(--text-primary)' }}>{s.name}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14}/> {s.country} · <GraduationCap size={14}/> {s.degrees[0]}
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{s.deadline}</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: 'var(--text-sm)' }}>View <ChevronRight size={14} style={{ verticalAlign: 'middle' }}/></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* COUNTRY EXPLORE SECTION */}
      <section className="section bg-secondary" style={{ padding: 'var(--space-20) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900 }}>Popular Destinations</h2>
          </div>
          <div className="country-grid fade-in-up">
            {[
              { c: "Hungary", e: "🇭🇺" }, { c: "Turkey", e: "🇹🇷" }, { c: "United Kingdom", e: "🇬🇧" },
              { c: "USA", e: "🇺🇸" }, { c: "Japan", e: "🇯🇵" }, { c: "Germany", e: "🇩🇪" },
              { c: "South Korea", e: "🇰🇷" }, { c: "Australia", e: "🇦🇺" }, { c: "China", e: "🇨🇳" },
              { c: "Sweden", e: "🇸🇪" }, { c: "Italy", e: "🇮🇹" }, { c: "Romania", e: "🇷🇴" }
            ].map(country => (
              <Link href={`/scholarships?country=${encodeURIComponent(country.c)}`} key={country.c} className="country-card-premium">
                <span style={{ fontSize: '24px' }}>{country.e}</span>
                <span className="country-name">{country.c}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
