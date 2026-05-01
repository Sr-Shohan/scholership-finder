"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved === 'dark' || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Prevent hydration mismatch by rendering nothing until mounted
  if (!mounted) {
    return (
      <button className="btn-dark-mode" aria-label="Toggle dark mode" style={{ visibility: 'hidden' }}>
        <span className="icon-moon">🌙</span><span className="icon-sun">☀️</span>
      </button>
    );
  }

  return (
    <button className="btn-dark-mode" onClick={toggleTheme} aria-label="Toggle dark mode">
      <span className="icon-moon" style={{ display: isDark ? 'none' : 'inline' }}>🌙</span>
      <span className="icon-sun" style={{ display: isDark ? 'inline' : 'none' }}>☀️</span>
    </button>
  );
}
