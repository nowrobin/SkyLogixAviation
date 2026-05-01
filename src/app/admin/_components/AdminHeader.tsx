"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const pageInfo: Record<string, { title: string; description: string }> = {
  "/admin/dashboard": { title: "Dashboard", description: "Overview of all sections" },
  "/admin/home": { title: "Home Page", description: "Hero banner and welcome section" },
  "/admin/fleet": { title: "Fleet", description: "Aircraft listings, specs, and images" },
  "/admin/crew": { title: "Crew", description: "Founders, instructors, and mechanics" },
  "/admin/training": { title: "Training", description: "Programs and requirements" },
  "/admin/company": { title: "Company", description: "Address, phone, and business hours" },
  "/admin/contact": { title: "Contact", description: "Contact form and page content" },
  "/admin/navigation": { title: "Navigation", description: "Header nav items and CTA" },
  "/admin/metadata": { title: "SEO Metadata", description: "Titles and descriptions per page" },
};

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const info = pathname
    ? pageInfo[pathname] ||
      Object.entries(pageInfo).find(([key]) => pathname.startsWith(key))?.[1] ||
      { title: "Admin", description: "" }
    : { title: "Admin", description: "" };

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/signIn");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6">
      <div className="flex flex-col justify-center">
        <h1 className="text-sm font-semibold text-gray-900 leading-tight">{info.title}</h1>
        {info.description && (
          <p className="text-xs text-gray-400 leading-tight">{info.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}
