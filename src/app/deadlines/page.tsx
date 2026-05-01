import scholarships from "@/data/scholarships.json";
import ClientDeadlines from "./ClientDeadlines";

export const metadata = {
  title: "Deadline Tracker — BDScholarship",
  description: "Track all upcoming fully funded scholarship deadlines for Bangladeshi students. Calendar and list views available.",
};

export default function DeadlinesPage() {
  return (
    <>
      <header className="page-header">
        <div className="container page-header-content">
          <span className="section-label" style={{ marginBottom: 'var(--space-4)' }}>Never Miss a Date</span>
          <h1>📅 Deadline Tracker</h1>
          <p>Sort, filter, and add deadlines directly to your Google Calendar.</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
            <span className="legend-item"><span className="legend-color" style={{ background: 'var(--color-accent)' }}></span> &lt;30 days</span>
            <span className="legend-item"><span className="legend-color" style={{ background: 'var(--color-warning)' }}></span> &lt;60 days</span>
            <span className="legend-item"><span className="legend-color" style={{ background: 'var(--color-success)' }}></span> 60+ days</span>
            <span className="legend-item"><span className="legend-color" style={{ background: 'var(--text-muted)' }}></span> Past</span>
          </div>
        </div>
      </header>

      <ClientDeadlines initialScholarships={scholarships} />
    </>
  );
}
