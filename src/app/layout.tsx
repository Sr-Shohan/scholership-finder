import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import ThemeToggle from "./components/ThemeToggle"; // We will create this

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: "BDScholarship — Full Scholarship Platform for BD Students",
  description: "Find fully funded international scholarships for Bangladeshi students. Track deadlines, get MOI guidance, SOP templates, and checklist generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`} style={{ fontFamily: 'var(--font-body)' }}>
        
        {/* NAVBAR */}
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <div className="container navbar-inner">
            <Link href="/" className="navbar-logo">
              <span className="logo-emoji">🇧🇩</span>
              <span className="logo-text">BD<span className="logo-accent">Scholarship</span></span>
            </Link>
            <ul className="nav-links">
              <li><Link href="/scholarships" className="nav-link">🔍 Scholarships</Link></li>
              <li><Link href="/deadlines" className="nav-link">📅 Deadlines</Link></li>
              <li><Link href="/checklist" className="nav-link">✅ Checklist</Link></li>
              <li><Link href="/sop-helper" className="nav-link">✍️ SOP Helper</Link></li>
              <li><Link href="/ielts" className="nav-link">📝 IELTS</Link></li>
              <li><Link href="/about" className="nav-link">ℹ️ About</Link></li>
            </ul>
            <div className="navbar-actions">
              <ThemeToggle />
              <button className="hamburger" aria-label="Menu" id="mobileMenuBtn">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </nav>
        
        {/* MOBILE NAV (hidden by default) */}
        <nav className="mobile-nav" id="mobileNavMenu">
          <Link href="/scholarships" className="nav-link">🔍 Scholarships</Link>
          <Link href="/deadlines" className="nav-link">📅 Deadlines</Link>
          <Link href="/checklist" className="nav-link">✅ Checklist</Link>
          <Link href="/sop-helper" className="nav-link">✍️ SOP Helper</Link>
          <Link href="/ielts" className="nav-link">📝 IELTS</Link>
          <Link href="/about" className="nav-link">ℹ️ About</Link>
        </nav>

        {children}

        {/* BACK TO TOP */}
        <button className="back-to-top" aria-label="Back to top" id="backToTopBtn">↑</button>

        {/* FOOTER */}
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo"><span>🇧🇩</span><span>BDScholarship</span></div>
                <p>Free scholarship tools for Bangladeshi students. Built with love, powered by community.</p>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">📘</a>
                  <a href="#" className="social-link" aria-label="YouTube">▶️</a>
                  <a href="#" className="social-link" aria-label="Telegram">✈️</a>
                </div>
              </div>
              <div>
                <h3 className="footer-heading">Tools</h3>
                <ul className="footer-links">
                  <li><Link href="/scholarships" className="footer-link">Scholarship Finder</Link></li>
                  <li><Link href="/deadlines" className="footer-link">Deadline Tracker</Link></li>
                  <li><Link href="/checklist" className="footer-link">Document Checklist</Link></li>
                  <li><Link href="/sop-helper" className="footer-link">SOP Helper</Link></li>
                  <li><Link href="/ielts" className="footer-link">IELTS Info</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="footer-heading">Site</h3>
                <ul className="footer-links">
                  <li><Link href="/about" className="footer-link">About</Link></li>
                  <li><Link href="/about#contact" className="footer-link">Contact</Link></li>
                  <li><Link href="/about#contribute" className="footer-link">Contribute</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="footer-heading">Popular</h3>
                <ul className="footer-links">
                  <li><Link href="/scholarships/stipendium-hungaricum" className="footer-link">Hungary Scholarship</Link></li>
                  <li><Link href="/scholarships/turkiye-burslari" className="footer-link">Turkey Scholarship</Link></li>
                  <li><Link href="/scholarships/chevening-uk" className="footer-link">Chevening UK</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} BDScholarship. Made with ❤️ for BD Students.</p>
              <p>Data sourced from official scholarship websites. Always verify before applying.</p>
            </div>
          </div>
        </footer>

        {/* GLOBAL CLIENT LOGIC */}
        <Script id="global-logic" strategy="afterInteractive">
          {`
            // Hamburger menu
            const btn = document.getElementById('mobileMenuBtn');
            const nav = document.getElementById('mobileNavMenu');
            btn?.addEventListener('click', () => {
              btn.classList.toggle('active');
              nav.classList.toggle('active');
            });

            // Back to top
            const btt = document.getElementById('backToTopBtn');
            window.addEventListener('scroll', () => {
              if (window.scrollY > 300) btt?.classList.add('visible');
              else btt?.classList.remove('visible');
            });
            btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

            // Fade animations on scroll
            const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target);
                }
              });
            }, { rootMargin: '0px 0px -50px 0px' });
            
            // Re-run observer when DOM changes (ideal for Next.js navigation)
            const observeAll = () => {
              document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => observer.observe(el));
            };
            
            // Run initially and on body changes
            observeAll();
            new MutationObserver(observeAll).observe(document.body, { childList: true, subtree: true });
          `}
        </Script>
      </body>
    </html>
  );
}
