"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, GraduationCap, Award, Clock, FileCheck, ShieldAlert, X, ChevronRight, CheckCircle2 } from "lucide-react";

export default function ClientScholarshipFinder({ initialScholarships }: { initialScholarships: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedIelts, setSelectedIelts] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [sortParam, setSortParam] = useState<string>("deadline");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize from URL params only once on mount
  useEffect(() => {
    const q = searchParams.get("q"); if (q) setSearch(q);
    const country = searchParams.get("country"); if (country) setSelectedCountries(country.split(','));
    const degree = searchParams.get("degree"); if (degree) setSelectedDegrees(degree.split(','));
    const ielts = searchParams.get("ielts"); if (ielts) setSelectedIelts(ielts);
    const m = searchParams.get("month"); if (m) setSelectedMonth(m);
  }, []); // Run only once

  // Derived distinct countries list
  const allCountries = useMemo(() => Array.from(new Set(initialScholarships.map(s => s.country))).sort(), [initialScholarships]);

  // Handle URL updates
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (selectedCountries.length) params.set("country", selectedCountries.join(','));
    if (selectedDegrees.length) params.set("degree", selectedDegrees.join(','));
    if (selectedIelts !== 'all') params.set("ielts", selectedIelts);
    if (selectedMonth) params.set("month", selectedMonth);
    
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [search, selectedCountries, selectedDegrees, selectedIelts, selectedMonth]);

  // Filter Logic
  const filteredScholarships = useMemo(() => {
    let result = initialScholarships.filter(s => {
      const searchMatch = search.trim() === "" || 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.country.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));

      const countryMatch = selectedCountries.length === 0 || selectedCountries.includes(s.country);
      const degreeMatch = selectedDegrees.length === 0 || selectedDegrees.some((d: string) => s.degrees.includes(d));

      let ieltsMatch = true;
      if (selectedIelts === 'no') ieltsMatch = !s.ielts_required;
      else if (selectedIelts === 'moi') ieltsMatch = s.moi_accepted || !s.ielts_required;
      else if (selectedIelts === 'yes') ieltsMatch = s.ielts_required;

      let monthMatch = true;
      if (selectedMonth) {
        const dMonth = new Date(s.deadline).getMonth() + 1;
        monthMatch = dMonth === parseInt(selectedMonth);
      }

      return searchMatch && countryMatch && degreeMatch && ieltsMatch && monthMatch;
    });

    return result.sort((a, b) => {
      if (sortParam === 'name') return a.name.localeCompare(b.name);
      if (sortParam === 'country') return a.country.localeCompare(b.country);
      const today = new Date();
      today.setHours(0,0,0,0);
      const isAPast = new Date(a.deadline) < today;
      const isBPast = new Date(b.deadline) < today;
      if (isAPast && !isBPast) return 1;
      if (!isAPast && isBPast) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [initialScholarships, search, selectedCountries, selectedDegrees, selectedIelts, selectedMonth, sortParam]);

  const toggleArrayItem = (arr: string[], item: string) => arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
  
  const getDaysLeft = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - new Date().setHours(0,0,0,0);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const clearAllFilters = () => {
    setSelectedCountries([]);
    setSelectedDegrees([]);
    setSelectedIelts('all');
    setSelectedMonth('');
    setSearch('');
  };

  const activeFilterCount = selectedCountries.length + selectedDegrees.length + (selectedIelts !== 'all' ? 1 : 0) + (selectedMonth ? 1 : 0);

  const filterContentHtml = (
    <div className="filter-content-v3">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontWeight: 900, fontSize: '18px' }}>Smart Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} style={{ background: 'none', border: 'none', color: '#006A4E', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Reset All</button>
        )}
      </div>

      <div className="filter-group-v3">
        <div className="filter-head-v3"><MapPin size={14}/> Top Countries</div>
        <div className="filter-options-v3">
          {allCountries.slice(0, 15).map(c => (
            <label key={c} className="check-label-v3">
              <input 
                type="checkbox" 
                checked={selectedCountries.includes(c)} 
                onChange={() => setSelectedCountries(prev => toggleArrayItem(prev, c))} 
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group-v3">
        <div className="filter-head-v3"><GraduationCap size={14}/> Degree Level</div>
        <div className="filter-options-v3">
          {['Bachelor', 'Master', 'PhD'].map(d => (
            <label key={d} className="check-label-v3">
              <input 
                type="checkbox" 
                checked={selectedDegrees.includes(d)} 
                onChange={() => setSelectedDegrees(prev => toggleArrayItem(prev, d))} 
              />
              <span>{d}'s Degree</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group-v3">
        <div className="filter-head-v3"><FileCheck size={14}/> IELTS Policy</div>
        <div className="radio-stack-v3">
          {[
            { id: 'all', label: 'Any Policy' },
            { id: 'no', label: 'No IELTS Required' },
            { id: 'moi', label: 'MOI Accepted' },
            { id: 'yes', label: 'IELTS Required' }
          ].map(opt => (
            <label key={opt.id} className={`radio-label-v3 ${selectedIelts === opt.id ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="ielts" 
                  checked={selectedIelts === opt.id} 
                  onChange={() => setSelectedIelts(opt.id)} 
                />
                {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group-v3" style={{ marginBottom: 0 }}>
        <div className="filter-head-v3"><Clock size={14}/> Opening Month</div>
        <select className="select-v3" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i+1} value={String(i+1)}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .scholarship-finder-v3 {
          padding-bottom: 80px;
          background: #f1f4f2; /* Slightly darker to make cards pop */
          min-height: 100vh;
        }

        .search-overlap-v3 {
          max-width: 1000px;
          margin: -40px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 50;
        }

        .search-bar-v3 {
          background: var(--bg-primary, #fff);
          border: 1px solid var(--border-color, #eee);
          border-radius: 24px;
          display: flex;
          align-items: center;
          padding: 8px 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .search-bar-v3 input {
          flex: 1;
          border: none;
          padding: 16px;
          font-size: 18px;
          font-weight: 500;
          outline: none;
          background: transparent;
          color: var(--text-primary, #000);
        }

        .layout-v3 {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
          margin-top: 80px;
          align-items: start;
        }

        .sidebar-v3 {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #eee);
          border-radius: 24px;
          padding: 30px;
          position: sticky;
          top: 100px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .filter-group-v3 { margin-bottom: 30px; }
        .filter-head-v3 { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        .filter-head-v3 svg { color: #006A4E; }

        .check-label-v3 { display: flex; align-items: center; gap: 10px; font-size: 14px; padding: 6px 0; cursor: pointer; color: #444; }
        .check-label-v3 input { width: 18px; height: 18px; accent-color: #006A4E; }

        .radio-stack-v3 { display: flex; flex-direction: column; gap: 8px; }
        .radio-label-v3 { padding: 10px 15px; border-radius: 12px; border: 1px solid #eee; font-size: 13px; cursor: pointer; transition: 0.2s; background: #fff; }
        .radio-label-v3:hover { background: #f0fdf4; border-color: #006A4E; }
        .radio-label-v3.active { background: #006A4E; color: #fff; border-color: #006A4E; }
        .radio-label-v3 input { display: none; }

        .select-v3 { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #eee; background: #fff; outline: none; }

        .card-grid-v3 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 25px;
        }

        .card-v3 {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #eee);
          border-radius: 20px;
          padding: 25px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .card-v3:hover { transform: translateY(-5px); border-color: #006A4E; box-shadow: 0 15px 30px rgba(0,0,0,0.08); }

        .card-flag-v3 { font-size: 40px; margin-bottom: 15px; }
        .card-title-v3 { font-size: 18px; font-weight: 800; line-height: 1.3; margin-bottom: 5px; color: #111; }
        .card-loc-v3 { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #666; margin-bottom: 15px; font-weight: 600; }

        .card-badges-v3 { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .badge-v3 { padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: #f0fdf4; color: #166534; border: 1px solid #dcfce7; }

        .card-foot-v3 { margin-top: auto; padding-top: 15px; border-top: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; color: #888; }

        .mobile-bar-v3 { display: none; position: sticky; top: 72px; z-index: 100; background: #fff; border-bottom: 1px solid #eee; padding: 12px 0; margin-bottom: 20px; }

        .filter-drawer-v3 { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; visibility: hidden; opacity: 0; transition: 0.3s; display: flex; justify-content: flex-end; }
        .filter-drawer-v3.open { visibility: visible; opacity: 1; }
        .filter-drawer-v3 .panel { width: 80%; max-width: 350px; background: #fff; height: 100%; transform: translateX(100%); transition: 0.3s; padding: 25px; overflow-y: auto; }
        .filter-drawer-v3.open .panel { transform: translateX(0); }

        @media (max-width: 1024px) {
          .layout-v3 { grid-template-columns: 1fr; gap: 0; margin-top: 20px; }
          .sidebar-v3 { display: none; }
          .mobile-bar-v3 { display: block; margin-top: 60px; }
          .search-bar-v3 input { font-size: 16px; }
        }
      `}} />

      <div className="scholarship-finder-v3">
        <div className="search-overlap-v3">
           <div className="search-bar-v3">
              <div style={{ paddingLeft: '15px', color: '#006A4E' }}><Search size={22} /></div>
              <input 
                type="text" 
                placeholder="Search scholarships..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', padding: '10px', color: '#888', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              )}
           </div>
        </div>

        <div className="mobile-bar-v3">
           <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                style={{ background: '#006A4E', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                 <SlidersHorizontal size={16}/> Filters {activeFilterCount > 0 && <span>({activeFilterCount})</span>}
              </button>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#888' }}>
                 {filteredScholarships.length} RESULTS
              </div>
           </div>
        </div>

        <div className="container">
           <div className="layout-v3">
              <aside className="sidebar-v3">
                 {filterContentHtml}
              </aside>

              <main>
                 <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 900 }}>Curated Opportunities</div>
                    <select 
                      className="select-v3" 
                      style={{ width: 'auto', padding: '8px 30px 8px 15px', borderRadius: '30px', fontSize: '12px', fontWeight: 700 }}
                      value={sortParam}
                      onChange={e => setSortParam(e.target.value)}
                    >
                       <option value="deadline">Nearest Deadline</option>
                       <option value="name">Name A-Z</option>
                       <option value="country">Country A-Z</option>
                    </select>
                 </div>

                 <div className="card-grid-v3">
                    {filteredScholarships.map(s => {
                       const daysLeft = getDaysLeft(s.deadline);
                       const isPast = daysLeft <= 0;
                       return (
                          <Link key={s.id} href={`/scholarships/${s.id}`} className="card-v3" style={{ opacity: isPast ? 0.6 : 1 }}>
                             <div className="card-flag-v3">{s.flag}</div>
                             <h3 className="card-title-v3">{s.name}</h3>
                             <div className="card-loc-v3"><MapPin size={14}/> {s.country}</div>
                             
                             <div className="card-badges-v3">
                                <span className="badge-v3">{s.degrees[0]}</span>
                                <span className="badge-v3" style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#dbeafe' }}>{s.ielts_required ? 'IELTS REQ' : 'NO IELTS'}</span>
                             </div>

                             <div className="card-foot-v3">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                   <Clock size={12} /> {isPast ? 'EXPIRED' : s.deadline}
                                </div>
                                <div style={{ color: '#006A4E', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                   VIEW <ChevronRight size={14} />
                                </div>
                             </div>
                          </Link>
                       );
                    })}
                 </div>

                 {filteredScholarships.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                       <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>No results match your search</h3>
                       <p style={{ color: '#666', marginBottom: '25px' }}>Try clearing some filters to see more opportunities.</p>
                       <button className="btn btn-primary" onClick={clearAllFilters}>Reset Filters</button>
                    </div>
                 )}
              </main>
           </div>
        </div>
      </div>

      <div className={`filter-drawer-v3 ${isMobileFilterOpen ? 'open' : ''}`} onClick={() => setIsMobileFilterOpen(false)}>
         <div className="panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
               <h2 style={{ fontSize: '20px', fontWeight: 900, margin: 0 }}>Filters</h2>
               <button onClick={() => setIsMobileFilterOpen(false)} style={{ background: 'none', border: 'none' }}><X size={28}/></button>
            </div>
            {filterContentHtml}
            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingBottom: '120px' }}>
               <button className="btn btn-outline" style={{ padding: '15px' }} onClick={() => { clearAllFilters(); setIsMobileFilterOpen(false); }}>Reset</button>
               <button className="btn btn-primary" onClick={() => setIsMobileFilterOpen(false)}>Done</button>
            </div>
         </div>
      </div>
    </>
  );
}
