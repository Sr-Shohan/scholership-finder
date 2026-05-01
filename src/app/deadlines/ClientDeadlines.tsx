"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { List, Calendar, CalendarPlus, CalendarDays, Filter, ChevronRight, Clock, MapPin, Search, X, GraduationCap, ArrowRight, Bell } from "lucide-react";

export default function ClientDeadlines({ initialScholarships }: { initialScholarships: any[] }) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [hidePast, setHidePast] = useState(false);
  const [degreeFilter, setDegreeFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const allCountries = useMemo(() => Array.from(new Set(initialScholarships.map(s => s.country))).sort(), [initialScholarships]);

  const today = new Date();
  today.setHours(0,0,0,0);

  const getUrgencyInfo = (deadlineDateStr: string) => {
    const d = new Date(deadlineDateStr);
    const diffDays = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return { label: 'Passed', color: '#8E8E93', gradient: 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)', bg: 'rgba(142,142,147,0.1)' };
    if (diffDays <= 30) return { label: 'Urgent', color: '#FF3B30', gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF2D55 100%)', bg: 'rgba(255,59,48,0.1)' };
    if (diffDays <= 60) return { label: 'Closing Soon', color: '#FF9500', gradient: 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)', bg: 'rgba(255,149,0,0.1)' };
    return { label: 'Upcoming', color: '#34C759', gradient: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)', bg: 'rgba(52,199,89,0.1)' };
  };

  const filtered = useMemo(() => {
    return initialScholarships.filter(s => {
      const isPast = new Date(s.deadline) < today;
      if (hidePast && isPast) return false;
      if (degreeFilter && !s.degrees.includes(degreeFilter)) return false;
      if (countryFilter && s.country !== countryFilter) return false;
      return true;
    }).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [initialScholarships, hidePast, degreeFilter, countryFilter]);

  const calendarGroups = useMemo(() => {
    const groups: Record<string, any[]> = {};
    for (const s of filtered) {
       const d = new Date(s.deadline);
       const monthName = d.toLocaleString('en-US', { month: 'long' });
       const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')} ${monthName} ${d.getFullYear()}`;
       if (!groups[key]) groups[key] = [];
       groups[key].push(s);
    }
    return groups;
  }, [filtered]);

  const handleAddCalendar = (e: React.MouseEvent, s: any) => {
    e.preventDefault();
    const endStr = s.deadline.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(s.name + ' Deadline')}&dates=${endStr}/${endStr}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .deadlines-hero-premium {
          background: var(--hero-bg);
          padding: calc(var(--nav-height) + var(--space-20)) 0 var(--space-24);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .deadlines-hero-premium::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: var(--hero-glow);
          pointer-events: none;
        }

        @media (max-width: 960px) {
          .deadlines-hero-premium {
            padding: calc(var(--nav-height) + var(--space-4)) 0 var(--space-8);
          }
          .deadlines-hero-premium h1 {
            font-size: 2.125rem !important;
          }
          .controls-floating-container {
            margin-top: 0 !important;
          }
        }

        .controls-floating-container {
          max-width: 1000px;
          margin: -60px auto 0;
          padding: 0 var(--container-padding);
          position: relative;
          z-index: 10;
        }

        .controls-glass-premium {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-3xl);
          padding: var(--space-4) var(--space-6);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-4);
          box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .toggle-switch-premium {
          background: rgba(0,0,0,0.05);
          padding: 4px;
          border-radius: var(--radius-full);
          display: flex;
        }

        .toggle-option-premium {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text-muted);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toggle-option-premium.active {
          background: white;
          color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* TIMELINE STYLES */
        .timeline-container-premium {
          position: relative;
          max-width: 900px;
          margin: var(--space-16) auto;
          padding-left: 40px;
        }

        .timeline-container-premium::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--color-primary) 0%, var(--border-color) 100%);
        }

        .timeline-card-premium {
          margin-bottom: var(--space-10);
          position: relative;
          text-decoration: none;
          display: block;
        }

        .timeline-card-premium::after {
          content: '';
          position: absolute;
          left: -46px;
          top: 30px;
          width: 14px;
          height: 14px;
          background: white;
          border: 3px solid var(--status-color, var(--color-primary));
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 0 4px rgba(255,255,255,1);
        }

        .timeline-card-inner {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--space-6);
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }

        .timeline-card-premium:hover .timeline-card-inner {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-xl);
        }

        .ticket-cut-edge {
          position: relative;
          border-right: 1px dashed var(--border-color);
          padding-right: var(--space-6);
        }

        .urgency-badge-ticket {
          padding: 4px 12px;
          background: var(--status-gradient);
          color: white;
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: inline-block;
          margin-bottom: var(--space-3);
        }

        /* MONTHLY VIEW UPGRADE */
        .month-block-premium {
          margin-bottom: var(--space-16);
        }

        .month-title-floating {
          font-size: 2.5rem;
          font-weight: 900;
          color: rgba(0,0,0,0.03);
          margin-bottom: -1rem;
          position: relative;
          z-index: 1;
        }

        .month-header-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--space-6);
        }

        .month-header-text {
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .month-count-badge {
          background: var(--bg-secondary);
          color: var(--text-muted);
          padding: 2px 10px;
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          font-weight: 700;
        }

        .calendar-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          transition: all 0.3s;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .calendar-card-premium:hover {
          background: white;
          border-color: var(--color-primary);
          box-shadow: var(--shadow-xl);
          transform: translateY(-6px);
        }

        @media (max-width: 600px) {
          .timeline-card-inner {
            grid-template-columns: 1fr;
          }
          .ticket-cut-edge {
            border-right: none;
            border-bottom: 1px dashed var(--border-color);
            padding-right: 0;
            padding-bottom: var(--space-4);
          }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="deadlines-hero-premium print-hide">
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: 'var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(52, 199, 89, 0.1)', color: '#34C759', padding: '8px 20px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Bell size={14} /> Never Miss a Window
          </div>
          <h1 className="fade-in-up" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 900, marginBottom: 'var(--space-4)', lineHeight: 1, letterSpacing: '-0.04em' }}>
            Global Scholarship <br/>
            <span style={{ background: 'linear-gradient(90deg, #34C759, #AF52DE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Timeline</span>
          </h1>
          <p className="fade-in-up" style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-lg)', lineHeight: 1.6 }}>
            Track every major application deadline curated specifically for Bangladeshi students. Sync events directly to your personal calendar.
          </p>
        </div>
      </section>

      {/* FLOATING CONTROLS */}
      <div className="controls-floating-container">
        <div className="controls-glass-premium fade-in-up">
           <div className="toggle-switch-premium">
              <button className={`toggle-option-premium ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                <List size={16} /> Vertical Timeline
              </button>
              <button className={`toggle-option-premium ${viewMode === 'calendar' ? 'active' : ''}`} onClick={() => setViewMode('calendar')}>
                <CalendarDays size={16} /> Monthly Grid
              </button>
           </div>

           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={hidePast} onChange={e => setHidePast(e.target.checked)} className="premium-checkbox" /> Hide Past
              </label>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="premium-select-deadlines" style={{ background: 'white' }} value={degreeFilter} onChange={e => setDegreeFilter(e.target.value)}>
                  <option value="">Degree Level</option>
                  <option value="Bachelor">Bachelor's</option>
                  <option value="Master">Master's</option>
                  <option value="PhD">Doctoral</option>
                </select>
                
                <select className="premium-select-deadlines" style={{ background: 'white' }} value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
                  <option value="">All Countries</option>
                  {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
           </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'var(--space-20)' }}>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-24)', marginTop: 'var(--space-10)' }}>
            <Search size={64} style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-6)', opacity: 0.3 }} />
            <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, marginBottom: 'var(--space-2)' }}>No deadlines found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>Adjust your filters to discover more opportunities.</p>
            <button className="btn btn-primary" onClick={() => { setHidePast(false); setDegreeFilter(''); setCountryFilter(''); }}>Show All Deadlines</button>
          </div>
        )}

        {viewMode === 'list' ? (
          <div className="timeline-container-premium fade-in-up">
            {filtered.map(s => {
              const info = getUrgencyInfo(s.deadline);
              return (
                <Link key={s.id} href={`/scholarships/${s.id}`} className="timeline-card-premium" style={{ '--status-color': info.color } as any}>
                  <div className="timeline-card-inner">
                    <div className="ticket-cut-edge">
                      <div className="urgency-badge-ticket" style={{ '--status-gradient': info.gradient } as any}>{info.label}</div>
                      <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{s.flag} {s.name}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} style={{ color: 'var(--color-primary)' }}/> {s.country}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GraduationCap size={14} style={{ color: 'var(--color-primary)' }}/> {s.degrees.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '120px' }}>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, marginBottom: '4px' }}>Deadline</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: info.color }}>{s.deadline}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button className="btn btn-outline" style={{ padding: '8px', borderRadius: '12px' }} onClick={e => handleAddCalendar(e, s)} title="Add to Calendar">
                          <CalendarPlus size={18} />
                        </button>
                        <div className="btn btn-primary" style={{ padding: '8px 12px', borderRadius: '12px', fontSize: '12px' }}>
                          Profile <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="fade-in-up" style={{ marginTop: 'var(--space-20)' }}>
            {Object.entries(calendarGroups).sort(([k1], [k2]) => k1.localeCompare(k2)).map(([key, items]) => {
               const displayMonth = key.split(' ').slice(1).join(' ');
               return (
                 <div key={key} className="month-block-premium">
                   <div className="month-title-floating">{displayMonth.split(' ')[0]}</div>
                   <div className="month-header-content">
                      <div style={{ background: 'var(--color-primary)', width: '8px', height: '24px', borderRadius: 'var(--radius-full)' }}></div>
                      <h2 className="month-header-text">{displayMonth}</h2>
                      <div className="month-count-badge">{items.length} Programs</div>
                   </div>
                   <div className="grid-3">
                     {items.map(s => {
                       const info = getUrgencyInfo(s.deadline);
                       const isPast = info.label === 'Passed';
                       return (
                         <Link key={s.id} href={`/scholarships/${s.id}`} className="calendar-card-premium" style={{ borderLeft: `8px solid ${info.color}`, opacity: isPast ? 0.7 : 1 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                             <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: info.color, textTransform: 'uppercase' }}>{s.deadline}</div>
                             <div style={{ background: info.bg, color: info.color, padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800 }}>{info.label}</div>
                           </div>
                           <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{s.name}</h3>
                           <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={12} /> {s.country}
                           </div>
                           <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end' }}>
                              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>Full Profile <ArrowRight size={12}/></span>
                           </div>
                         </Link>
                       );
                     })}
                   </div>
                 </div>
               );
            })}
          </div>
        )}

      </div>
    </>
  );
}
