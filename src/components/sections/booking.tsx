"use client";

import { useState } from "react";
import { supabaseInsert } from "@/lib/supabase";
import { PaymentModal } from "./payment-modal";
import { SectionHeader } from "@/components/site/section-header";
import { CornerMarks } from "@/components/site/corner-marks";

export type SessionType = "discovery" | "strategy" | "implementation" | "extended";

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  preferredDate: string;
  notes: string;
  sessionType: SessionType;
  sessionLabel: string;
  price: number;
}

const SESSION_OPTIONS: {
  type: SessionType;
  price: number;
  label: string;
  shortLabel: string;
  sub: string;
}[] = [
  { type: "discovery", price: 0, label: "Discovery Call (Free)", shortLabel: "Discovery Call", sub: "Free · 30 min" },
  { type: "strategy", price: 150, label: "Strategy Session", shortLabel: "Strategy", sub: "$150 · 60 min" },
  { type: "implementation", price: 200, label: "Implementation Review", shortLabel: "Review", sub: "$200 · 90 min" },
  { type: "extended", price: 350, label: "Extended Block", shortLabel: "Extended", sub: "$350 · 3 hrs" },
];

const PRICING_CARDS = [
  { title: "Discovery Call", sub: "30 min · Get acquainted, define your needs", tag: "Free", free: true },
  { title: "Strategy Session", sub: "60 min · Deep-dive planning & roadmap", tag: "CAD $150", free: false },
  { title: "Implementation Review", sub: "90 min · Review, audit & next steps", tag: "CAD $200", free: false },
  { title: "Extended Consulting Block", sub: "3 hrs · Intensive work session", tag: "CAD $350", free: false },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  preferredDate: "",
  notes: "",
};

export function Booking() {
  const [selected, setSelected] = useState<SessionType>("discovery");
  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<BookingData | null>(null);
  const [success, setSuccess] = useState(false);

  const session = SESSION_OPTIONS.find((s) => s.type === selected)!;

  function updateField(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function saveBooking(data: BookingData, paymentIntentId: string | null) {
    await supabaseInsert("bookings", {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      company: data.company || null,
      preferred_date: data.preferredDate || null,
      notes: data.notes || null,
      session_type: data.sessionType,
      session_label: data.sessionLabel,
      price_cad: data.price,
      payment_intent_id: paymentIntentId,
      paid: paymentIntentId !== null,
      created_at: new Date().toISOString(),
    });
    setSuccess(true);
    setForm(emptyForm);
  }

  async function handleBooking() {
    if (!form.firstName || !form.lastName) {
      alert("Please enter your name.");
      return;
    }
    if (!form.email || !form.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    const data: BookingData = {
      ...form,
      sessionType: session.type,
      sessionLabel: session.label,
      price: session.price,
    };
    if (session.price === 0) {
      await saveBooking(data, null);
    } else {
      setPendingBooking(data);
      setShowModal(true);
    }
  }

  return (
    <section id="booking" className="bg-cream py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <SectionHeader
          section="booking"
          eyebrow="Book a session"
          title="Work with me"
          sub="Start with a free 30-minute discovery call. All paid sessions are charged upfront and confirmed instantly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-[22px] font-bold text-navy mb-2 font-heading-brand">Consulting session options</h3>
            <p className="text-text-muted text-[15px] leading-relaxed mb-6 font-body">
              Choose the session type that fits your needs. Discovery calls are always free — no payment required.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {PRICING_CARDS.map((card) => (
                <div
                  key={card.title}
                  className={
                    "bg-white border-[1.5px] rounded-lg px-6 py-5 flex items-center justify-between transition-colors " +
                    (card.free ? "border-[#b2d8c4]" : "border-cream-mid hover:border-orange")
                  }
                >
                  <div>
                    <div className="font-heading-brand font-bold text-[15px] text-navy mb-0.5">{card.title}</div>
                    <div className="text-[13px] text-text-muted font-body">{card.sub}</div>
                  </div>
                  <div
                    className={
                      "font-mono-brand text-[13px] font-medium px-3.5 py-1.5 rounded-md whitespace-nowrap " +
                      (card.free ? "bg-[#e6f7ee] text-[#1a6640]" : "bg-orange/10 text-orange")
                    }
                  >
                    {card.tag}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-text-muted font-body">
              All sessions are conducted via video call. Secure payment powered by <strong>Stripe</strong>. Confirmation sent immediately by email.
            </p>
          </div>

          <CornerMarks tone="orange" className="bg-white border-[1.5px] border-cream-mid rounded-2xl p-8 shadow-lg">
            <h4 className="text-[17px] font-bold text-navy mb-6 pb-4 border-b border-cream-mid font-heading-brand">
              Request a session
            </h4>

            <div className="mb-5">
              <label className="block font-mono-brand text-xs uppercase tracking-wide text-text-muted mb-1.5">
                Session type
              </label>
              <div className="flex gap-3 flex-wrap">
                {SESSION_OPTIONS.map((opt) => {
                  const active = opt.type === selected;
                  const isFree = opt.type === "discovery";
                  return (
                    <button
                      key={opt.type}
                      type="button"
                      onClick={() => setSelected(opt.type)}
                      className={
                        "flex-1 min-w-[110px] text-center px-4 py-2.5 rounded-lg border-[1.5px] font-mono-brand text-xs font-medium transition-colors " +
                        (isFree
                          ? active
                            ? "border-[#1a6640] text-[#1a6640] bg-[#f0fbf5]"
                            : "border-[#b2d8c4] text-[#1a6640] bg-[#f0fbf5]"
                          : active
                          ? "border-orange text-orange bg-orange/[0.06]"
                          : "border-cream-mid text-text-muted bg-cream hover:border-orange hover:text-orange")
                      }
                    >
                      {opt.shortLabel}
                      <br />
                      <small className="font-normal">{opt.sub}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <Field label="First name">
                <input
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="Sarah"
                  className={inputClass}
                />
              </Field>
              <Field label="Last name">
                <input
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Johnson"
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Email address">
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="sarah@company.com"
                className={inputClass}
              />
            </Field>
            <Field label="Company / Organization (optional)">
              <input
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Your company name"
                className={inputClass}
              />
            </Field>
            <Field label="Preferred date & time">
              <input
                type="datetime-local"
                value={form.preferredDate}
                onChange={(e) => updateField("preferredDate", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="What would you like to work on?">
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Briefly describe your automation challenge or goal..."
                className={inputClass}
              />
            </Field>

            <div className="bg-cream border border-cream-mid rounded-lg px-5 py-4 mb-5 flex items-center justify-between">
              <span className="text-sm text-text-muted font-body">Session total</span>
              <span
                className={
                  "font-mono-brand font-semibold text-xl " +
                  (session.price === 0 ? "text-[#1a6640]" : "text-navy")
                }
              >
                {session.price === 0 ? "Free" : `CAD $${session.price}`}
              </span>
            </div>

            {!success ? (
              <button
                onClick={handleBooking}
                className="w-full py-4 bg-orange text-white font-mono-brand text-sm font-medium rounded-lg tracking-wide hover:bg-orange-warm transition"
              >
                {session.price === 0 ? "Book Discovery Call — Free" : `Book & Pay — CAD $${session.price}`}
              </button>
            ) : (
              <div className="bg-[#e6f7ee] border border-[#b2d8c4] rounded-lg px-5 py-4 text-[#1a6640] text-sm text-center font-body">
                ✓ Your session request has been sent! Check your email for confirmation.
              </div>
            )}
          </CornerMarks>
        </div>
      </div>

      {showModal && pendingBooking && (
        <PaymentModal
          booking={pendingBooking}
          onClose={() => setShowModal(false)}
          onSuccess={async (paymentIntentId) => {
            await saveBooking(pendingBooking, paymentIntentId);
            setShowModal(false);
          }}
        />
      )}
    </section>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 border-[1.5px] border-cream-mid rounded-lg font-body text-[15px] text-text-dark bg-cream outline-none transition-colors focus:border-orange focus:bg-white";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block font-mono-brand text-xs uppercase tracking-wide text-text-muted mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
