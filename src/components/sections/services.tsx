import { SectionHeader } from "@/components/site/section-header";
import { CornerMarks } from "@/components/site/corner-marks";

const SERVICES = [
  {
    num: "01",
    title: "AI Automation for Businesses",
    desc: "End-to-end automation of repetitive workflows and data pipelines.",
    items: [
      "Repetitive task automation",
      "Document, email & data pipelines",
      "Internal AI chatbots for team productivity",
      "Intelligent customer management systems",
    ],
  },
  {
    num: "02",
    title: "Administrative Automation Consulting",
    desc: "In-depth process analysis and digital transformation roadmaps.",
    items: [
      "Business process analysis",
      "Tailored automation recommendations",
      "Digital transformation roadmaps",
      "Implementation support",
    ],
  },
  {
    signature: true,
    title: "AI-Powered Career Launch for Newly Arrived Iranians in Canada",
    desc: "A complete, automated system that turns a complex job search into a structured, confident process.",
    items: [
      "Analyzes your existing résumé",
      "Scans live postings on LinkedIn and Indeed",
      "Identifies your most relevant opportunities",
      "Rewrites your résumé for each individual posting",
      "Generates 10 customized interview questions per position",
    ],
  },
  {
    num: "04",
    title: "Business Setup Services in Canada",
    desc: "Everything a new or growing business needs to establish a professional digital presence.",
    items: [
      "Professional content creation",
      "Smart website development",
      "Branding & visual identity consulting",
      "Dual-market positioning (Iran & Canada)",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <SectionHeader
          section="services"
          eyebrow="What I offer"
          title="Services built for real business needs"
          sub="Custom-built automations and consulting — never off-the-shelf templates. Serving both Iranian and Canadian businesses."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const card = (
              <div
                className={
                  service.signature
                    ? "bg-navy border border-orange/60 rounded-2xl p-8 sm:col-span-2 transition-all hover:-translate-y-1"
                    : "bg-cream border border-cream-mid rounded-2xl p-8 transition-all hover:-translate-y-1 hover:border-orange hover:shadow-lg"
                }
              >
                {service.signature ? (
                  <span className="inline-block font-mono-brand text-[10px] font-medium tracking-[0.1em] uppercase text-orange bg-orange/10 px-2.5 py-1 rounded mb-4">
                    ★ Signature Service
                  </span>
                ) : (
                  <div className="font-mono-brand text-[11px] tracking-[0.1em] text-navy/25 mb-2">
                    {service.num}
                  </div>
                )}
                <h3
                  className={
                    "text-lg font-bold mb-3 font-heading-brand " +
                    (service.signature ? "text-cream" : "text-navy")
                  }
                >
                  {service.title}
                </h3>
                <p
                  className={
                    "text-sm mb-4 font-body " + (service.signature ? "text-cream/80" : "text-text-muted")
                  }
                >
                  {service.desc}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className={
                        "text-[13.5px] pl-4 relative font-body " +
                        (service.signature ? "text-cream/70" : "text-text-muted")
                      }
                    >
                      <span className="absolute left-0 text-orange">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
            return service.signature ? (
              <CornerMarks key={service.title} tone="cream" className="sm:col-span-2">
                {card}
              </CornerMarks>
            ) : (
              <div key={service.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
