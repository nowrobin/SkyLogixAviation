import Image from "next/image";
import Link from "next/link";
import type { NavData, CompanyData } from "./LayoutContent";
import Container from "@/components/ui/Container";

export default function Footer({ navData, companyData }: { navData: NavData; companyData: CompanyData }) {
  const { navItems } = navData;
  const company = companyData;

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/fullLogo.png"
              alt="Skylogix Aviation"
              width={180}
              height={32}
              className="rounded-lg"
            />
            <p className="text-navy-300 text-sm leading-relaxed max-w-xs">
              Affordable, high-quality flight training at Brackett Field.
              Your journey to the skies starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-navy-300 hover:text-gold-500 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/inquiries"
                  className="text-navy-300 hover:text-gold-500 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-navy-300">
              <li className="flex items-start gap-3">
                <Image src="/icon/icon_Map.svg" alt="" width={18} height={18} className="mt-0.5 brightness-0 invert opacity-60" />
                <span>{company.location.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/icon/icon_Phone.svg" alt="" width={18} height={18} className="brightness-0 invert opacity-60" />
                <span>{company.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/icon/icon_Mail.svg" alt="" width={18} height={18} className="brightness-0 invert opacity-60" />
                <span>{company.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/icon/icon_Clock.svg" alt="" width={18} height={18} className="brightness-0 invert opacity-60" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-700 text-center text-navy-400 text-xs">
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
