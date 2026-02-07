import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

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
    default: `${SITE_NAME} | Flight Training at Brackett Field (KPOC)`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Affordable, high-quality flight training at Brackett Field (KPOC) in La Verne, CA. Cessna 152 rentals at $120/hr and professional flight instruction at $55/hr.",
  keywords: [
    "flight training",
    "flight school",
    "Brackett Field",
    "KPOC",
    "Cessna 152",
    "learn to fly",
    "pilot training",
    "La Verne CA",
    "private pilot license",
    "PPL",
    "instrument rating",
    "commercial pilot",
    "discovery flight",
    "affordable flight training",
    "Skylogix Aviation",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Learn to Fly at Brackett Field`,
    description:
      "Your journey to the skies starts here. Affordable flight training with well-maintained Cessna 152 aircraft at Brackett Field (KPOC).",
    images: [
      {
        url: "/landing_Image.png",
        width: 1200,
        height: 630,
        alt: "Skylogix Aviation - Flight Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Flight Training`,
    description:
      "Affordable flight training at Brackett Field (KPOC). Cessna 152 rentals and professional instruction.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
