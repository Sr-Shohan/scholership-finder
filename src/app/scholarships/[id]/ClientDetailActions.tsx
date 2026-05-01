"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Share2, Calendar, FileCheck, Info, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

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
      <style dangerouslySetInnerHTML={{__html: `
        .countdown-premium {
          background: linear-gradient(135deg, #001a14 0%, #004d39 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          color: white;
          margin-bottom: var(--space-5);
          text-align: center;
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
        }

        .countdown-premium::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(52, 199, 89, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .time-box-premium {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          padding: 8px;
          min-width: 60px;
        }

        .time-value-premium {
          font-size: var(--text-xl);
          font-weight: 800;
          color: #34C759;
          font-variant-numeric: tabular-nums;
        }

        .time-label-premium {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          font-weight: 700;
        }

        .action-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          margin-bottom: var(--space-5);
          box-shadow: var(--shadow-md);
        }

        .sidebar-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          border-radius: var(--radius-xl);
          font-size: var(--text-sm);
          font-weight: 700;
          transition: all 0.2s;
          margin-bottom: var(--space-3);
          cursor: pointer;
        }

        .btn-apply {
          background: var(--color-primary);
          color: white;
          border: none;
          box-shadow: 0 8px 16px -4px rgba(0, 106, 78, 0.3);
        }

        .btn-apply:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -4px rgba(0, 106, 78, 0.4);
        }

        .btn-secondary-action {
          background: var(--bg-secondary);
          border: 1.5px solid var(--border-color);
          color: var(--text-primary);
        }

        .btn-secondary-action:hover {
          background: var(--bg-primary);
          border-color: var(--color-primary);
        }

        .info-row-premium {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .info-row-premium:last-child {
          border-bottom: none;
        }
      `}} />

      {/* Countdown Card */}
      <div className="countdown-premium">
        <h4 style={{ fontSize: 'var(--text-xs)', opacity: 0.8, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <Clock size={14} /> Deadline Countdown
        </h4>
        
        {isPast ? (
          <div style={{ padding: 'var(--space-2)' }}>
            <AlertTriangle className="text-danger" style={{ margin: '0 auto var(--space-2)' }} size={32} />
            <p style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>Deadline Passed</p>
            <p style={{ opacity: 0.6, fontSize: 'var(--text-xs)' }}>Stay tuned for the next cycle.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <div className="time-box-premium"><span className="time-value-premium">{timeLeft?.d ?? '--'}</span><span className="time-label-premium">Days</span></div>
            <div className="time-box-premium"><span className="time-value-premium">{timeLeft?.h ?? '--'}</span><span className="time-label-premium">Hrs</span></div>
            <div className="time-box-premium"><span className="time-value-premium">{timeLeft?.m ?? '--'}</span><span className="time-label-premium">Min</span></div>
            <div className="time-box-premium"><span className="time-value-premium">{timeLeft?.s ?? '--'}</span><span className="time-label-premium">Sec</span></div>
          </div>
        )}
        <div style={{ marginTop: 'var(--space-4)', fontSize: '11px', opacity: 0.5, fontWeight: 600 }}>
          Closing on {scholarship.deadline}
        </div>
      </div>

      {/* Actions */}
      <div className="action-card-premium">
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} style={{ color: 'var(--color-primary)' }}/> Fast Actions
        </h3>
        
        <a href={scholarship.apply_link} target="_blank" rel="noopener noreferrer" className="sidebar-btn btn-apply" style={{ textDecoration: 'none' }}>
          <ExternalLink size={18} /> Apply Officially
        </a>
        
        <button className="sidebar-btn btn-secondary-action" onClick={shareScholarship}>
          <Share2 size={18} /> Share With Friends
        </button>
        
        <button className="sidebar-btn btn-secondary-action" onClick={addToGoogleCalendar}>
          <Calendar size={18} /> Remind on Calendar
        </button>
        
        <Link href={`/checklist?id=${scholarship.id}`} className="sidebar-btn btn-secondary-action" style={{ textDecoration: 'none', marginBottom: 0 }}>
          <FileCheck size={18} /> Document Generator
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="action-card-premium">
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>Snapshot</h3>
        <div className="info-row-premium">
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>Opens</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>{scholarship.deadline_opens}</span>
        </div>
        <div className="info-row-premium">
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>IELTS</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>{scholarship.ielts_required ? 'Required' : 'Not Required'}</span>
        </div>
        <div className="info-row-premium">
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>Min. GPA</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>{scholarship.min_cgpa} / 4.0</span>
        </div>
        <div className="info-row-premium">
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>MOI OK?</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: scholarship.moi_accepted ? 'var(--color-primary)' : 'inherit' }}>{scholarship.moi_accepted ? <><CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }}/> Yes</> : 'No'}</span>
        </div>
      </div>
    </>
  );
}
