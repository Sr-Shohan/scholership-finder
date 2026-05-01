"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function ClientDeadlines({ initialScholarships }: { initialScholarships: any[] }) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [hidePast, setHidePast] = useState(false);
  const [degreeFilter, setDegreeFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const allCountries = useMemo(() => Array.from(new Set(initialScholarships.map(s => s.country))).sort(), [initialScholarships]);

  const today = new Date();
  today.setHours(0,0,0,0);

  const getUrgencyClass = (deadlineDateStr: string) => {
    const d = new Date(deadlineDateStr);
    const diffDays = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'past';
    if (diffDays <= 30) return 'urgent';
    if (diffDays <= 60) return 'soon';
    return 'safe';
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

  // Calendar grouping
  const calendarGroups = useMemo(() => {
    const groups: Record<string, any[]> = {};
    for (const s of filtered) {
       const d = new Date(s.deadline);
       // Create key "2026-03 MonthName" for consistent sorting
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
    <section className="section-sm">
      <div className="container">
        
        {/* Controls */}
        <div className="deadlines-controls">
          <div className="view-toggle">
            <button className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setViewMode('list')}>📝 List View</button>
            <button className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setViewMode('calendar')}>📅 By Month</button>
          </div>
          
          <div className="deadline-filters">
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={hidePast} onChange={e => setHidePast(e.target.checked)} /> Hide Past
            </label>
            <select className="form-select" value={degreeFilter} onChange={e => setDegreeFilter(e.target.value)}>
              <option value="">All Degrees</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>
            <select className="form-select" value={countryFilter} onChange={e => setCountryFilter(e.target.value)}>
              <option value="">All Countries</option>
              {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="empty-state" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
            <h3>No deadlines match your filters</h3>
            <button className="btn btn-outline" onClick={() => { setHidePast(false); setDegreeFilter(''); setCountryFilter(''); }}>Reset Filters</button>
          </div>
        )}

        {viewMode === 'list' ? (
          <div className="deadlines-list fade-in-up">
            {filtered.map(s => {
              const uClass = getUrgencyClass(s.deadline);
              return (
                <div key={s.id} className={`deadline-item ${uClass === 'past' ? 'past' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-4)', background: 'var(--card-bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-3)', border: '1px solid var(--border-color)', borderLeft: `4px solid ${uClass === 'urgent' ? 'var(--color-accent)' : uClass === 'soon' ? 'var(--color-warning)' : uClass === 'safe' ? 'var(--color-success)' : 'var(--text-muted)'}` }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <div className="deadline-date" style={{ fontWeight: 'bold', fontSize: 'var(--text-lg)' }}>{s.deadline}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                      {uClass === 'past' ? 'Passed' : uClass === 'urgent' ? 'Closing Soon' : uClass === 'soon' ? 'Approaching' : 'Upcoming'}
                    </div>
                  </div>
                  <div style={{ flex: '2 1 300px' }}>
                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                      <Link href={`/scholarships/${s.id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>{s.flag} {s.name}</Link>
                    </h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{s.country} · {s.degrees.join(', ')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-outline" style={{ padding: '8px 12px', fontSize: 'var(--text-sm)' }} onClick={e => handleAddCalendar(e, s)}>+ Cal</button>
                    <Link href={`/scholarships/${s.id}`} className="btn btn-primary" style={{ padding: '8px 12px', fontSize: 'var(--text-sm)' }}>Details</Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="calendar-view fade-in-up">
            {Object.entries(calendarGroups).sort(([k1], [k2]) => k1.localeCompare(k2)).map(([key, items]) => {
               const displayMonth = key.split(' ').slice(1).join(' ');
               return (
                 <div key={key} style={{ marginBottom: 'var(--space-8)' }}>
                   <h2 style={{ paddingBottom: 'var(--space-2)', borderBottom: '2px solid var(--border-color)', marginBottom: 'var(--space-4)' }}>🗓️ {displayMonth}</h2>
                   <div className="grid-2">
                     {items.map(s => {
                       const uClass = getUrgencyClass(s.deadline);
                       return (
                         <div key={s.id} className={`card ${uClass === 'past' ? 'blur-past' : ''}`} style={{ borderLeft: `4px solid ${uClass === 'urgent' ? 'var(--color-accent)' : uClass === 'soon' ? 'var(--color-warning)' : uClass === 'safe' ? 'var(--color-success)' : 'var(--text-muted)'}` }}>
                           <h3 style={{ fontSize: 'var(--text-base)' }}>{s.name}</h3>
                           <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>{s.country}</div>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <span style={{ fontWeight: 'bold' }}>{s.deadline}</span>
                             <Link href={`/scholarships/${s.id}`} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: 'var(--text-xs)' }}>View</Link>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
