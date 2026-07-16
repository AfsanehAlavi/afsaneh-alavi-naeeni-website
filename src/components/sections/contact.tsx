"use client";

import { useState } from "react";
import { MapPin, Mail, Globe2, Clock } from "lucide-react";
import { supabaseInsert } from "@/lib/supabase";
import { SectionHeader } from "@/components/site/section-header";
import { CornerMarks } from "@/components/site/corner-marks";

const CONTACT_ITEMS = [
  { icon: MapPin, label: "Location", value: "Markham, Ontario, Canada" },
  { icon: Mail, label: "Email", value: "AI@AfsanehAlavi.com" },
  { icon: Globe2, label: "Languages", value: "English & Persian (فارسی)" },
  { icon: Clock, label: "Response time", value: "Within 24 business hours" },
];

const emptyForm = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function sendContact() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    await supabaseInsert("contact_messages", {
      name: form.name,
      email: form.email,
      subject: form.subject || null,
      message: form.message,
      created_at: new Date().toISOString(),
    });
    setSuccess(true);
    setForm(emptyForm);
  }

  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <SectionHeader section="contact" eyebrow="Get in touch" title="Let's start a conversation" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-base text-text-muted leading-relaxed mb-8 font-body">
              Whether you have a specific automation project in mind, or just want to explore what AI could do for
              your business — I&apos;d love to hear from you.
            </p>
            {CONTACT_ITEMS.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={
                  "flex items-start gap-3.5 py-5" +
                  (i < CONTACT_ITEMS.length - 1 ? " border-b border-cream-mid" : "")
                }
              >
                <div className="w-10 h-10 min-w-10 bg-orange/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-orange" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono-brand uppercase tracking-wide">
                    {label}
                  </div>
                  <div className="text-[15px] text-text-dark font-body">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <CornerMarks tone="orange" className="bg-white border-[1.5px] border-cream-mid rounded-2xl p-8 shadow-lg">
            <h4 className="text-[17px] font-bold text-navy mb-6 font-heading-brand">Send a message</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mb-5">
              <label className={labelClass}>Subject</label>
              <input
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="How can I help?"
                className={inputClass}
              />
            </div>
            <div className="mb-5">
              <label className={labelClass}>Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell me about your project or question..."
                className={inputClass}
              />
            </div>
            {!success ? (
              <button
                onClick={sendContact}
                className="w-full py-4 bg-orange text-white font-mono-brand text-sm font-medium rounded-lg tracking-wide hover:bg-orange-warm transition"
              >
                Send Message
              </button>
            ) : (
              <div className="bg-[#e6f7ee] border border-[#b2d8c4] rounded-lg px-5 py-4 text-[#1a6640] text-sm text-center font-body">
                ✓ Message sent! I&apos;ll be in touch within 24 hours.
              </div>
            )}
          </CornerMarks>
        </div>
      </div>
    </section>
  );
}

const labelClass =
  "block font-mono-brand text-xs uppercase tracking-wide text-text-muted mb-1.5";
const inputClass =
  "w-full px-3.5 py-2.5 border-[1.5px] border-cream-mid rounded-lg font-body text-[15px] text-text-dark bg-cream outline-none transition-colors focus:border-orange focus:bg-white";
