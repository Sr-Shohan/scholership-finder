"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Landmark, BookOpen, CheckSquare, Info } from "lucide-react";

import { useState, useEffect } from "react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Unis", href: "/scholarships", icon: Landmark },
    { name: "IELTS", href: "/ielts", icon: BookOpen },
    { name: "Checklist", href: "/checklist", icon: CheckSquare },
  ];

  return (
    <nav className="mobile-bottom-nav-container print-hide">
      <div className="mobile-bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
