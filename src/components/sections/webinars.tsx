"use client";

import { supabaseInsert } from "@/lib/supabase";
import { SectionHeader } from "@/components/site/section-header";

const WEBINARS = [
  {
    slug: "intro-ai",
    code: "EDU·01",
    title: "Introduction to AI Automation for Small Businesses",
    desc: "Learn how to identify which business processes are ready for automation, and choose the right tools.",
    price: 49,
  },
  {
    slug: "career-launch",
    code: "EDU·02",
    title: "AI-Powered Job Search for Newcomers to Canada",
    desc: "Step-by-step guide to using AI tools to tailor your résumé and prepare for Canadian job interviews.",
    price: 69,
  },
  {
    slug: "no-code",
    code: "EDU·03",
    title: "Building Your First Automated Workflow with No Code",
    desc: "Hands-on session: build a real automation from scratch using no-code tools. Perfect for beginners.",
    price: 59,
  },
];

async function notifyWebinar(slug: string) {
  const email = prompt("Enter your email to be notified when this webinar is live:");
  if (!email || !email.includes("@")) return;
  await supabaseInsert("webinar_waitlist", { email, webinar_slug: slug, created_at: new Date().toISOString() });
  alert("You're on the list! We'll email you when registration opens.");
}

export function Webinars() {
  return (
    <section id="webinars" className="bg-cream py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <SectionHeader
          section="webinars"
          eyebrow="Webinars & Classes"
          title="Learn AI automation — live and on-demand"
          sub="Structured webinars and group classes delivered live and recorded. Register below — spots are limited."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEBINARS.map((w) => (
            <div
              key={w.slug}
              className="bg-white border-[1.5px] border-cream-mid rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-orange"
            >
              <div className="h-40 bg-navy flex items-center justify-center relative">
                <span className="font-mono-brand text-[11px] tracking-[0.12em] uppercase text-cream/40">
                  AAN·{w.code}
                </span>
                <span className="absolute top-3 right-3 bg-orange text-white text-[10px] font-mono-brand tracking-[0.08em] uppercase px-2.5 py-1 rounded">
                  Upcoming
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-orange font-mono-brand mb-1.5">Coming Soon</div>
                <div className="text-base font-bold text-navy mb-1.5 font-heading-brand">{w.title}</div>
                <p className="text-[13px] text-text-muted leading-relaxed mb-5 font-body">{w.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="font-mono-brand font-semibold text-base text-navy">CAD ${w.price}</div>
                  <button
                    onClick={() => notifyWebinar(w.slug)}
                    className="border-[1.5px] border-cream-mid text-navy text-xs font-mono-brand px-4.5 py-2 rounded-md hover:border-orange hover:text-orange transition"
                  >
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
