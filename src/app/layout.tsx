import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

import MobileBottomNav from "./components/MobileBottomNav";
import { List, Calendar, CalendarPlus, CalendarDays, Filter, ChevronRight, Clock, MapPin, Search, X, GraduationCap, CheckSquare, PenTool, BookOpen, Info, Globe, Video, Send } from "lucide-react";

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
              <GraduationCap className="logo-icon" size={28} strokeWidth={2.5} style={{ color: 'var(--color-primary)' }} />
              <span className="logo-text">BD<span className="logo-accent">Scholarship</span></span>
            </Link>
            <ul className="nav-links">
              <li><Link href="/scholarships" className="nav-link"><Search size={18} /> Scholarships</Link></li>
              <li><Link href="/deadlines" className="nav-link"><CalendarDays size={18} /> Deadlines</Link></li>
              <li><Link href="/checklist" className="nav-link"><CheckSquare size={18} /> Checklist</Link></li>
              <li><Link href="/sop-helper" className="nav-link"><PenTool size={18} /> SOP Helper</Link></li>
              <li><Link href="/ielts" className="nav-link"><BookOpen size={18} /> IELTS</Link></li>
              <li><Link href="/about" className="nav-link"><Info size={18} /> About</Link></li>
            </ul>
            <div className="navbar-actions">

              <button className="hamburger" aria-label="Menu" id="mobileMenuBtn">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </nav>
        
        {/* MOBILE NAV (hidden by default) */}
        <nav className="mobile-nav" id="mobileNavMenu">
          <Link href="/scholarships" className="nav-link"><Search size={18} /> Scholarships</Link>
          <Link href="/deadlines" className="nav-link"><CalendarDays size={18} /> Deadlines</Link>
          <Link href="/checklist" className="nav-link"><CheckSquare size={18} /> Checklist</Link>
          <Link href="/sop-helper" className="nav-link"><PenTool size={18} /> SOP Helper</Link>
          <Link href="/ielts" className="nav-link"><BookOpen size={18} /> IELTS</Link>
          <Link href="/about" className="nav-link"><Info size={18} /> About</Link>
        </nav>

        {children}

        {/* MOBILE BOTTOM NAV */}
        <MobileBottomNav />

        {/* BACK TO TOP */}
        <button className="back-to-top" aria-label="Back to top" id="backToTopBtn">↑</button>

        {/* FOOTER */}
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="navbar-logo" style={{ marginBottom: 'var(--space-4)' }}>
                  <GraduationCap className="logo-icon" size={24} strokeWidth={2.5} style={{ color: 'var(--color-primary)' }} />
                  <span className="logo-text">BD<span className="logo-accent">Scholarship</span></span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                  Helping Bangladeshi students achieve their dream of studying abroad with fully funded opportunities since 2024.
                </p>
                <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
                  <a href="#" className="social-link-premium" aria-label="Official Website">
                    <Globe size={20} />
                  </a>
                  <a href="#" className="social-link-premium" aria-label="Watch Guides">
                    <Video size={20} />
                  </a>
                  <a href="#" className="social-link-premium" aria-label="Join Community">
                    <Send size={20} />
                  </a>
                </div>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                .social-link-premium {
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: var(--bg-secondary);
                  border: 1px solid var(--border-color);
                  border-radius: 10px;
                  color: var(--text-muted);
                  transition: all 0.2s;
                }
                .social-link-premium:hover {
                  background: var(--color-primary-ultra-light);
                  color: var(--color-primary);
                  border-color: var(--color-primary);
                  transform: translateY(-2px);
                }
              `}} />
              <div>
                <h3 className="footer-heading">Platform</h3>
                <ul className="footer-links">
                  <li><Link href="/scholarships" className="footer-link">Scholarship Finder</Link></li>
                  <li><Link href="/deadlines" className="footer-link">Deadline Tracker</Link></li>
                  <li><Link href="/checklist" className="footer-link">Document Checklist</Link></li>
                  <li><Link href="/sop-helper" className="footer-link">SOP Helper</Link></li>
                  <li><Link href="/ielts" className="footer-link">IELTS Resources</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="footer-heading">Organization</h3>
                <ul className="footer-links">
                  <li><Link href="/about" className="footer-link">Our Story</Link></li>
                  <li><Link href="/about#contact" className="footer-link">Support Center</Link></li>
                  <li><Link href="/about#contribute" className="footer-link">Partner With Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="footer-heading">Featured</h3>
                <ul className="footer-links">
                  <li><Link href="/scholarships/stipendium-hungaricum" className="footer-link">Hungary Stipendium</Link></li>
                  <li><Link href="/scholarships/turkiye-burslari" className="footer-link">Turkiye Burslari</Link></li>
                  <li><Link href="/scholarships/chevening-uk" className="footer-link">Chevening UK</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ margin: 0 }}>© {new Date().getFullYear()} BDScholarship. Designed for the brilliance of Bangladesh.</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="#" className="footer-link" style={{ fontSize: '12px' }}>Privacy Policy</Link>
                <Link href="#" className="footer-link" style={{ fontSize: '12px' }}>Terms of Service</Link>
              </div>
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
              btn.classList.toggle('open');
              nav.classList.toggle('open');
            });

            // Auto-close menu when link clicked
            nav?.querySelectorAll('a').forEach(link => {
              link.addEventListener('click', () => {
                btn?.classList.remove('open');
                nav?.classList.remove('open');
              });
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
