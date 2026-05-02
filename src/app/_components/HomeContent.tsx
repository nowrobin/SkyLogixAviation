"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import ImageGallery from "@/components/ui/ImageGallery";
import type { CompanyData } from "@/components/layout/LayoutContent";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  );
}

interface AircraftData {
  id: string;
  name: string;
  year: number;
  model: string;
  engine: string;
  horsepower: number;
  flightRule: string;
  pricePerHour: string;
  description: string;
  images: string[];
}

interface CrewMemberData {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface HomeContentProps {
  hero: { title: string; subtitle: string; cta: string; bgImage: string };
  ctaBgImage: string;
  welcome: { title: string; description: string };
  fleet: AircraftData[];
  company: CompanyData;
  crewCategories: { key: string; label: string }[];
  crewMembers: Record<string, CrewMemberData[]>;
}

export default function HomeContent({ hero, ctaBgImage, welcome, fleet, company, crewCategories, crewMembers }: HomeContentProps) {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section id="top" className="relative flex items-center justify-center h-[85vh] md:h-screen overflow-hidden">
        <Image
          src={hero.bgImage || "/landing_Image.png"}
          alt="Skylogix Aviation flight training at Brackett Field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/50" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeInUp">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
            <Button href="/inquiries" size="lg">
              {hero.cta}
            </Button>
            <Button href="/training" variant="outline" size="lg">
              Become A Pilot
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-60">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── Welcome ── */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-gold-500 leading-tight">
                Welcome to<br />Skylogix Aviation
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {welcome.description}
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Why Us ── */}
      <section className="py-20 md:py-28 bg-navy-900">
        <Container>
          <AnimatedSection>
            <SectionHeader title="Why Skylogix?" subtitle="The best place to start your aviation journey" light />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🎓", title: "Expert Instructors", desc: "Experienced CFIs dedicated to your success with personalized training plans." },
              { icon: "💰", title: "Affordable Rates", desc: `Aircraft at ${company.rates.aircraft} and instruction at ${company.rates.instruction}.` },
              { icon: "✈️", title: "Well-Maintained Fleet", desc: "Our Cessna 152 aircraft are regularly inspected and maintained to the highest standards." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="bg-navy-800 rounded-2xl p-8 text-center hover:bg-navy-700 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Fleet Preview ── */}
      <section id="aircrafts" className="py-20 md:py-28 bg-gray-50">
        <Container>
          <AnimatedSection>
            <SectionHeader title="Our Fleet" subtitle="Reliable Cessna 152 aircraft for your training needs" />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleet.map((plane) => (
              <AnimatedSection key={plane.id}>
                <Card>
                  <ImageGallery images={plane.images} alt={plane.name} />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-navy-900 font-[family-name:var(--font-winky)]">
                      {plane.name}
                    </h3>
                    <p className="text-gray-500 mt-1">{plane.year} {plane.model}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-xs font-medium bg-navy-100 text-navy-700 px-3 py-1 rounded-full">
                        {plane.engine} ({plane.horsepower}HP)
                      </span>
                      <span className="text-xs font-medium bg-navy-100 text-navy-700 px-3 py-1 rounded-full">
                        {plane.flightRule}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gold-600 font-bold text-lg">{plane.pricePerHour}</span>
                      <Link href={`/fleet/${plane.id}`} className="text-sm font-medium text-navy-500 hover:text-gold-500 transition-colors">
                        Details →
                      </Link>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/fleet" variant="secondary" size="lg">View All Aircraft</Button>
          </div>
        </Container>
      </section>

      {/* ── Training Path Preview ── */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <AnimatedSection>
            <SectionHeader title="Your Path to the Airlines" subtitle="From first flight to airline captain — we guide you every step" />
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {["PPL", "IFR", "CPL", "CFI", "ATP"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold ${i === 4 ? "bg-gold-500 text-navy-900" : "bg-navy-900 text-white"}`}>
                    {step}
                  </div>
                  {i < 4 && <div className="hidden md:block w-12 h-0.5 bg-navy-200" />}
                </div>
              ))}
            </div>
          </AnimatedSection>
          <div className="text-center mt-12">
            <Button href="/training" size="lg">Learn More</Button>
          </div>
        </Container>
      </section>

      {/* ── Crew ── */}
      <section id="crew" className="py-20 md:py-28 bg-gray-50">
        <Container>
          <AnimatedSection>
            <SectionHeader title="Our Crew" subtitle="Meet the team behind your training" />
          </AnimatedSection>
          <div className="space-y-12">
            {crewCategories.map((cat) => (
              <AnimatedSection key={cat.key}>
                <h3 className="text-xl font-semibold text-navy-900 mb-6">
                  {cat.label}
                  {cat.key === "instructor" && (
                    <span className="ml-3 text-sm font-normal text-gray-500">
                      Instruction: {company.rates.instruction}
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {(crewMembers[cat.key] || []).map((member) => (
                    <div key={member.id} className="text-center">
                      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-3">
                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                      </div>
                      <p className="font-semibold text-navy-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image src={ctaBgImage || "/plane_image.jpg"} alt="Cessna 152 aircraft at Brackett Field" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-900/70" />
        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to Fly?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Book your Discovery Flight today and get a taste of life in the cockpit.
            </p>
            <Button href="/inquiries" size="lg">Contact Us</Button>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
