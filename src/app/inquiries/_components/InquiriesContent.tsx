"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { useState } from "react";
import type { CompanyData } from "@/components/layout/LayoutContent";

interface ContactData {
  heroBgImage: string;
  contactPage: { intro: string };
  contactForm: {
    fields: { name: string; label: string; type: string; placeholder: string; required: boolean }[];
    submitButton: { default: string; sending: string; success: string; alreadySent: string };
    alerts: { success: string; error: string };
  };
}
import Button from "@/components/ui/Button";

export default function InquiriesContent({ contactData, companyData }: { contactData: ContactData; companyData: CompanyData }) {
  const { heroBgImage, contactPage, contactForm } = contactData;
  const company = companyData;
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <Image src={heroBgImage || "/mockDesign.png"} alt="Contact Skylogix Aviation" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-900/60" />
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Contact Us</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">{contactPage.intro}</p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">Get In Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: "/icon/icon_Map.svg", label: "Location", value: company.location.full },
                  { icon: "/icon/icon_Phone.svg", label: "Phone", value: company.phone },
                  { icon: "/icon/icon_Mail.svg", label: "Email", value: company.email },
                  { icon: "/icon/icon_Clock.svg", label: "Hours", value: company.hours },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                      <Image src={item.icon} alt="" width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-navy-900 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-sm">📍 {company.location.airport}</p>
                  <p className="text-xs mt-1">{company.location.full}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Send Us a Message</h2>
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{contactForm.alerts.success}</h3>
                  <p className="text-gray-500">We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {contactForm.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-navy-900 mb-1.5">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none min-h-[120px] transition-all"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                        />
                      )}
                    </div>
                  ))}
                  {status === "error" && (
                    <p className="text-red-500 text-sm">{contactForm.alerts.error}</p>
                  )}
                  <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? contactForm.submitButton.sending : contactForm.submitButton.default}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
