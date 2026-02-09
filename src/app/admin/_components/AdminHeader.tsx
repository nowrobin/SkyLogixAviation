"use client";

import { useRouter, usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/home": "Home Page",
  "/admin/fleet": "Fleet Management",
  "/admin/crew": "Crew Management",
  "/admin/training": "Training Programs",
  "/admin/company": "Company Info",
  "/admin/contact": "Contact Page",
  "/admin/navigation": "Navigation",
  "/admin/metadata": "SEO Metadata",
};

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const title = pathname
    ? pageTitles[pathname] ||
      Object.entries(pageTitles).find(([key]) =>
        pathname.startsWith(key)
      )?.[1] ||
      "Admin"
    : "Admin";

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/signIn");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </header>
  );
}
