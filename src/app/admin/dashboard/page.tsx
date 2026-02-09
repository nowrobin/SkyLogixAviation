"use client";

import Link from "next/link";

const sections = [
  {
    title: "Home Page",
    description: "Hero banner, welcome section, and section titles",
    href: "/admin/home",
    icon: "🏠",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Fleet",
    description: "Aircraft listings, specs, and images",
    href: "/admin/fleet",
    icon: "✈️",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Crew",
    description: "Founders, instructors, and mechanics",
    href: "/admin/crew",
    icon: "👥",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Training",
    description: "Training programs and requirements",
    href: "/admin/training",
    icon: "📚",
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Company",
    description: "Address, phone, email, hours, rates",
    href: "/admin/company",
    icon: "🏢",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Contact",
    description: "Contact page content and form settings",
    href: "/admin/contact",
    icon: "📧",
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Navigation",
    description: "Header navigation items and CTA",
    href: "/admin/navigation",
    icon: "🧭",
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Metadata",
    description: "SEO titles and descriptions per page",
    href: "/admin/metadata",
    icon: "🔍",
    color: "bg-gray-50 text-gray-600",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to Admin Panel
        </h2>
        <p className="mt-1 text-gray-500">
          Manage your website content from here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div
              className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-lg ${section.color}`}
            >
              {section.icon}
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-navy-900">
              {section.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
