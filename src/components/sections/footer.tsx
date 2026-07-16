const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#booking", label: "Book a Call" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Background" },
  { href: "#webinars", label: "Webinars" },
  { href: "#contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "#services", label: "AI Automation" },
  { href: "#services", label: "Admin Consulting" },
  { href: "#services", label: "Career Launch" },
  { href: "#services", label: "Business Setup" },
  { href: "#webinars", label: "Webinars & Classes" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-cream/50 text-[13px] pt-12 pb-8 font-body">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="ruler-line ruler-line--light is-visible mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-8 sm:gap-12 mb-10">
          <div>
            <div className="font-heading-brand font-bold text-[15px] text-cream mb-3">
              Afsaneh <span className="text-orange">Alavi Naeeni</span>
            </div>
            <p className="leading-relaxed">
              AI Automation Specialist &amp; Business Consultant helping businesses automate, accelerate, and grow —
              with precision, trust, and intelligent design.
            </p>
          </div>
          <div>
            <div className="font-mono-brand text-[11px] tracking-[0.12em] uppercase text-orange mb-4">
              Navigate
            </div>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-orange transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono-brand text-[11px] tracking-[0.12em] uppercase text-orange mb-4">
              Services
            </div>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="hover:text-orange transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left font-mono-brand text-[11px] tracking-wide">
          <span>© {year} Afsaneh Alavi Naeeni. All rights reserved.</span>
          <span>Markham, Ontario, Canada · Serving clients globally</span>
        </div>
      </div>
    </footer>
  );
}
