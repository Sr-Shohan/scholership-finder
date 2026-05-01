"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Scholarship {
  id: string;
  name: string;
  deadline: string;
  bd_sending_partner: string;
  apply_link: string;
  deadline_opens: string;
  degrees: string[];
  ielts_required: boolean;
  moi_accepted: boolean;
  min_cgpa: number;
}

export default function ClientDetailActions({ 
  scholarship, 
  isPast, 
  daysLeft 
}: { 
  scholarship: Scholarship; 
  isPast: boolean; 
  daysLeft: number;
}) {
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    if (isPast) return;
    
    const deadlineTime = new Date(scholarship.deadline + "T23:59:59").getTime();
    
    const update = () => {
      const now = new Date().getTime();
      const distance = deadlineTime - now;
      
      if (distance < 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      
      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };
    
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [scholarship.deadline, isPast]);

  const addToGoogleCalendar = () => {
    const title = encodeURIComponent(`${scholarship.name} Deadline`);
    let details = `Application deadline for ${scholarship.name}.`;
    if (scholarship.bd_sending_partner) {
      details += `\nBD Sending Partner: ${scholarship.bd_sending_partner}`;
    }
    const endStr = scholarship.deadline.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${endStr}/${endStr}&details=${encodeURIComponent(details)}`;
    window.open(url, '_blank');
  };

  const shareScholarship = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${scholarship.name} for BD Students`,
          text: `Check out this fully funded scholarship for Bangladeshi students!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  return (
    <>
      {/* Countdown Card */}
      <div className="countdown-card" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-5)', color: 'white', marginBottom: 'var(--space-5)', textAlign: 'center' }}>
        <h4 style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⏰ Deadline Countdown</h4>
        
        {isPast ? (
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>This deadline has passed.</p>
        ) : (
          <div className="countdown-timer" style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
            <div className="countdown-box"><div className="countdown-number">{timeLeft?.d ?? '--'}</div><div className="countdown-label">Days</div></div>
            <div className="countdown-box"><div className="countdown-number">{timeLeft?.h ?? '--'}</div><div className="countdown-label">Hours</div></div>
            <div className="countdown-box"><div className="countdown-number">{timeLeft?.m ?? '--'}</div><div className="countdown-label">Mins</div></div>
            <div className="countdown-box"><div className="countdown-number">{timeLeft?.s ?? '--'}</div><div className="countdown-label">Secs</div></div>
          </div>
        )}
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-3)' }}>
          {scholarship.deadline}
        </p>
      </div>

      {/* Actions */}
      <div className="sidebar-action-card" style={{ background: 'var(--card-bg)', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>🚀 Quick Actions</h3>
        <a href={scholarship.apply_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-3)' }}>
          Apply Now ↗
        </a>
        <button className="btn btn-outline" onClick={shareScholarship} style={{ width: '100%', marginBottom: 'var(--space-3)' }}>
          📤 Share Scholarship
        </button>
        <button className="btn btn-outline" onClick={addToGoogleCalendar} style={{ width: '100%', marginBottom: 'var(--space-3)' }}>
          📅 Add Deadline to Calendar
        </button>
        <Link href={`/checklist?id=${scholarship.id}`} className="btn btn-outline" style={{ width: '100%' }}>
          ✅ Full Checklist Generator
        </Link>
      </div>

      {/* Quick Info */}
      <div className="detail-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>📋 Quick Info</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Opens</span>
            <span style={{ fontWeight: 600 }}>{scholarship.deadline_opens}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Deadline</span>
            <span style={{ fontWeight: 600, color: daysLeft <= 30 ? 'var(--color-accent)' : 'var(--text-primary)' }}>{scholarship.deadline}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Levels</span>
            <span style={{ fontWeight: 600 }}>{scholarship.degrees.join(', ')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--text-muted)' }}>IELTS</span>
            <span style={{ fontWeight: 600 }}>{scholarship.ielts_required ? 'Required' : scholarship.moi_accepted ? 'MOI OK' : 'Not Required'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Min CGPA</span>
            <span style={{ fontWeight: 600 }}>{scholarship.min_cgpa} / 4.0</span>
          </div>
        </div>
      </div>
    </>
  );
}
