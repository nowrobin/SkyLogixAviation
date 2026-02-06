export interface NavItem {
  label: string;
  href: string;
  scrollTo?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/", scrollTo: "top" },
  { label: "Aircrafts", href: "/", scrollTo: "aircrafts" },
  { label: "Our Crew", href: "/", scrollTo: "crew" },
  { label: "Become A Pilot", href: "/becomepilot" },
];

export const navCta = {
  label: "Contact Us",
  href: "/inquiries",
};
