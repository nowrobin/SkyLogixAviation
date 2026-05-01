"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
interface TrainingStepData {
  id: string;
  order: number;
  title: string;
  abbreviation: string;
  icon: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentText: string;
  requirements: string[];
  learns: string[];
  learnsLabel: string;
}

interface TrainingContentProps {
  trainingIntro: string;
  trainingSteps: TrainingStepData[];
  trainingCta: { title: string; icon: string; description: string; location: string } | null;
  companyAirport: string;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

export default function TrainingContent({ trainingIntro, trainingSteps, trainingCta, companyAirport }: TrainingContentProps) {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <Image src="/plane_image.jpg" alt="Flight training at Skylogix Aviation" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-900/60" />
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Become A Pilot</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">{trainingIntro}</p>
        </Container>
      </section>

      {/* ── Step Progress Bar ── */}
      <section className="py-12 bg-navy-900">
        <Container>
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {trainingSteps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all ${
                    i === trainingSteps.length - 1
                      ? "bg-gold-500 text-navy-900 ring-4 ring-gold-500/30"
                      : "bg-navy-700 text-white"
                  }`}>
                    {step.abbreviation}
                  </div>
                  <span className="text-[10px] md:text-xs text-navy-400 font-medium hidden sm:block">
                    Step {step.order}
                  </span>
                </div>
                {i < trainingSteps.length - 1 && (
                  <div className="w-8 md:w-16 lg:w-24 h-0.5 bg-navy-700 mx-1 md:mx-2" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Training Cards ── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <AnimatedSection>
            <SectionHeader
              title="Your Roadmap to the Airlines"
              subtitle="5 steps from your first flight to the captain's seat"
            />
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gray-200" />

            <div className="space-y-8 md:space-y-12">
              {trainingSteps.map((step) => (
                <AnimatedSection key={step.id}>
                  <div className="relative flex gap-6 md:gap-10">
                    {/* Timeline node */}
                    <div className="relative z-10 shrink-0">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.accentBg} ${step.accentText} flex items-center justify-center font-bold text-lg md:text-xl shadow-sm`}>
                        {step.order}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
                      {/* Card Header */}
                      <div className={`border-t-4 ${step.accentColor} px-6 md:px-8 pt-6 pb-4`}>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-2xl">{step.icon}</span>
                          <div>
                            <span className={`text-xs font-semibold uppercase tracking-widest ${step.accentText}`}>
                              Step {step.order}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-navy-900">
                              {step.title}
                              <span className="ml-2 text-base font-medium text-gray-400">({step.abbreviation})</span>
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-500 mt-2 leading-relaxed">{step.description}</p>
                      </div>

                      {/* Card Body */}
                      <div className="px-6 md:px-8 pb-6 pt-2">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Requirements */}
                          <div>
                            <h4 className="text-xs font-semibold text-navy-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-navy-400">
                                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                                <rect x="9" y="3" width="6" height="4" rx="1" />
                              </svg>
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {step.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                                    <circle cx="12" cy="12" r="10" className="fill-emerald-100" />
                                    <path d="M8 12l3 3 5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Learns / Benefits */}
                          <div>
                            <h4 className="text-xs font-semibold text-navy-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-navy-400">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                              </svg>
                              {step.learnsLabel}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {step.learns.map((item, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full ${step.accentBg} ${step.accentText}`}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image src="/landing_Image.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-900/75" />
        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <div className="text-5xl mb-4">{trainingCta?.icon}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{trainingCta?.title}</h2>
            <p className="text-navy-200 text-lg mb-2 max-w-xl mx-auto">{trainingCta?.description}</p>
            <p className="text-navy-400 text-sm mb-8">📍 {companyAirport}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/inquiries" size="lg">Contact Us</Button>
              <Button href="/fleet" variant="outline" size="lg">View Our Fleet</Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
