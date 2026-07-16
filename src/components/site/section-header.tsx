"use client";

import { useInView } from "./use-in-view";

const DOC_CODES: Record<string, string> = {
  services: "AAN·SRV",
  booking: "AAN·BKG",
  about: "AAN·BIO",
  resume: "AAN·CV",
  webinars: "AAN·EDU",
  contact: "AAN·CTC",
};

export function SectionHeader({
  section,
  eyebrow,
  title,
  sub,
  tone = "light",
}: {
  section: keyof typeof DOC_CODES;
  eyebrow: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
}) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const dark = tone === "dark";

  return (
    <div ref={ref}>
      <div className={`ruler-line ${dark ? "ruler-line--light" : ""} ${isVisible ? "is-visible" : ""}`} />
      <div className="flex items-baseline justify-between mt-3 mb-6 gap-4">
        <span className="font-mono-brand text-[11px] font-medium tracking-[0.18em] uppercase text-orange">
          § {eyebrow}
        </span>
        <span
          className={
            "hidden sm:inline font-mono-brand text-[10px] tracking-[0.1em] whitespace-nowrap " +
            (dark ? "text-cream/35" : "text-navy/30")
          }
        >
          {DOC_CODES[section]} · REV.2026
        </span>
      </div>
      <h2
        className={
          "text-[28px] md:text-4xl font-bold mb-4 font-heading-brand " +
          (dark ? "text-cream" : "text-navy")
        }
      >
        {title}
      </h2>
      {sub && (
        <p className={"text-lg max-w-xl mb-12 leading-relaxed font-body " + (dark ? "text-cream/60" : "text-text-muted")}>
          {sub}
        </p>
      )}
    </div>
  );
}
