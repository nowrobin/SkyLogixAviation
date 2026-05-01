import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import LayoutContent from "@/components/layout/LayoutContent";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { readNavigation, readCompany } from "@/lib/admin/dal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Flight School in La Verne, CA — Brackett Field (KPOC)`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Learn to fly at Skylogix Aviation — FAA-certified flight school at Brackett Field (KPOC), La Verne, CA. Cessna 152 rentals from $120/hr. Private Pilot, IFR, Commercial, CFI & ATP training. Serving Los Angeles, Inland Empire, Pomona Valley.",
  keywords: [
    // Hyper-local
    "flight school La Verne CA",
    "flight training La Verne California",
    "flight school Pomona CA",
    "flight school Inland Empire",
    "flight school Los Angeles County",
    "Brackett Field flight school",
    "KPOC flight training",
    "flight school near Claremont CA",
    "flight school near Ontario CA",
    "flight school near Upland CA",
    "flight school near Chino CA",
    // Intent-based
    "learn to fly near me",
    "flight school near me",
    "affordable flight training Southern California",
    "cheap flight school Los Angeles",
    "discovery flight Los Angeles",
    "discovery flight Inland Empire",
    // Program-specific
    "private pilot license California",
    "PPL training California",
    "instrument rating training California",
    "commercial pilot training California",
    "CFI training California",
    "ATP training California",
    "how to become a pilot California",
    // Aircraft
    "Cessna 152 rental California",
    "Cessna 152 flight school",
    // Brand
    "Skylogix Aviation",
    "Skylogix Aviation La Verne",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Flight School",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Flight School at Brackett Field — La Verne, CA`,
    description:
      "FAA-certified flight school at Brackett Field (KPOC). Learn to fly in Southern California from $120/hr. PPL, IFR, CPL, CFI, and ATP programs. Serving the greater Los Angeles and Inland Empire area.",
    images: [
      {
        url: "/landing_Image.png",
        width: 1200,
        height: 630,
        alt: "Skylogix Aviation — Flight School at Brackett Field (KPOC), La Verne, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Learn to Fly in Southern California`,
    description:
      "Affordable FAA-certified flight training at Brackett Field (KPOC), La Verne, CA. Cessna 152 from $120/hr. PPL to ATP programs.",
    images: ["/landing_Image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#0A1628",
    // Geographic meta tags for local SEO
    "geo.region": "US-CA",
    "geo.placename": "La Verne, California",
    "geo.position": "34.0925;-117.7834",
    "ICBM": "34.0925, -117.7834",
  },
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navData, companyData] = await Promise.all([
    readNavigation(),
    readCompany(),
  ]);

  return (
    <html lang="en-US">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutContent navData={navData} companyData={companyData}>
          {children}
        </LayoutContent>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
