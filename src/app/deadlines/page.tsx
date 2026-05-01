import scholarships from "@/data/scholarships.json";
import ClientDeadlines from "./ClientDeadlines";

export const metadata = {
  title: "Deadline Tracker — BDScholarship",
  description: "Track all upcoming fully funded scholarship deadlines for Bangladeshi students. Calendar and list views available.",
};

export default function DeadlinesPage() {
  return (
    <main>
      <ClientDeadlines initialScholarships={scholarships} />
    </main>
  );
}
