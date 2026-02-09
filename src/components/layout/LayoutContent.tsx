"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export interface NavData {
  navItems: { label: string; href: string; scrollTo?: string }[];
  navCta: { label: string; href: string } | null;
}

export interface CompanyData {
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    full: string;
    airport: string;
  };
  phone: string;
  email: string;
  hours: string;
  rates: {
    aircraft: string;
    instruction: string;
  };
}

export default function LayoutContent({
  children,
  navData,
  companyData,
}: {
  children: React.ReactNode;
  navData: NavData;
  companyData: CompanyData;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header navData={navData} />
      <main className="min-h-screen">{children}</main>
      <Footer navData={navData} companyData={companyData} />
    </>
  );
}
