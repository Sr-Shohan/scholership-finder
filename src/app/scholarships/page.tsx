import { Suspense } from "react";
import scholarships from "@/data/scholarships.json";
import ClientScholarshipFinder from "./ClientScholarshipFinder";

export const metadata = {
  title: "Find Scholarships — BDScholarship",
  description: "Search and filter 50+ fully funded international scholarships for Bangladeshi students. Filter by country, degree level, IELTS requirement, and deadline month.",
};

export default function ScholarshipsPage() {
  return (
    <>
      <header className="page-header" aria-label="Page header">
        <div className="container page-header-content">
          <span className="section-label" style={{ marginBottom: 'var(--space-4)' }}>50+ Scholarships</span>
          <h1>Find Your Scholarship 🔍</h1>
          <p>Filter by country, degree level, IELTS requirement, and more. All scholarships include BD-specific application guidance.</p>
        </div>
      </header>

      <Suspense fallback={<div className="container">Loading filters...</div>}>
        <ClientScholarshipFinder initialScholarships={scholarships} />
      </Suspense>
    </>
  );
}
