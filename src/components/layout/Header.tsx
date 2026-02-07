"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navItems, navCta, NavItem } from "@/data/navigation";
import Button from "@/components/ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (!item.scrollTo) return;
    e.preventDefault();
    if (isHome) {
      const el = document.getElementById(item.scrollTo);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${item.scrollTo}`);
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const headerBg = scrolled || !isHome
    ? "bg-white shadow-md"
    : "bg-white";

  const textColor = scrolled || !isHome ? "text-navy-900" : "text-navy-900";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/fullLogo.png"
            alt="Skylogix Aviation"
            width={200}
            height={36}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.scrollTo ? `/#${item.scrollTo}` : item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium transition-colors hover:text-gold-500 ${textColor}`}
            >
              {item.label}
            </Link>
          ))}
          <Button href={navCta.href} size="sm">
            {navCta.label}
          </Button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={scrolled || !isHome ? "#0A1628" : "#fff"}
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <nav
            className="absolute right-0 top-0 h-full w-[75%] max-w-xs bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.scrollTo ? `/#${item.scrollTo}` : item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-lg font-medium text-navy-900 py-3 border-b border-gray-100 hover:text-gold-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4">
                <Button href={navCta.href} size="lg" className="w-full">
                  {navCta.label}
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
