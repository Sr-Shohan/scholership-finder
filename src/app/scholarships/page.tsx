import { Suspense } from "react";
import scholarships from "@/data/scholarships.json";
import ClientScholarshipFinder from "./ClientScholarshipFinder";
import { Search } from "lucide-react";

export const metadata = {
  title: "Find Scholarships — BDScholarship",
  description: "Search and filter 50+ fully funded international scholarships for Bangladeshi students. Filter by country, degree level, IELTS requirement, and deadline month.",
};

export default function ScholarshipsPage() {
  return (
    <main>
      <header className="scholarships-hero-premium print-hide">
        <div className="container">
          <div className="fade-in-up" style={{ marginBottom: 'var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#34C759', color: 'white', padding: '8px 20px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Search size={14} /> COMPREHENSIVE DATABASE
          </div>
          <h1 className="fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'white', marginBottom: 'var(--space-4)', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
            Find Your <span style={{ color: '#34C759' }}>Future</span> Abroad
          </h1>
          <p className="fade-in-up" style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-lg)', lineHeight: 1.6 }}>
            Explore 50+ fully funded international scholarships curated specifically for Bangladeshi students. Filter by country, degree, and requirements.
          </p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .scholarships-hero-premium {
            background: var(--hero-bg);
            padding: calc(var(--nav-height, 72px) + var(--space-20, 80px)) 0 var(--space-24, 96px);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .scholarships-hero-premium::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: var(--hero-glow);
            pointer-events: none;
          }

          @media (max-width: 960px) {
            .scholarships-hero-premium {
              padding: calc(var(--nav-height) + var(--space-4)) 0 var(--space-16);
            }
            .scholarships-hero-premium h1 {
              font-size: 2.125rem !important;
            }
          }
        `}} />
      </header>

      <Suspense fallback={<div className="container" style={{ padding: 'var(--space-20)', textAlign: 'center' }}>Loading the finder...</div>}>
        <ClientScholarshipFinder initialScholarships={scholarships} />
      </Suspense>
    </main>
  );
}
