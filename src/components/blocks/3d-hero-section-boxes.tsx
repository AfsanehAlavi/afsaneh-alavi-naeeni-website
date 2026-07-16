"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Spline from "@splinetool/react-spline";
import { Menu, X, ArrowRight } from "lucide-react";
import { CornerMarks } from "@/components/site/corner-marks";

function HeroSplineBackground() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        pointerEvents: "auto",
        overflow: "hidden",
      }}
    >
      <Spline
        style={{
          width: "100%",
          height: "100vh",
          pointerEvents: "auto",
        }}
        scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: `
            linear-gradient(to right, rgba(13,31,60,0.85), transparent 30%, transparent 70%, rgba(13,31,60,0.85)),
            linear-gradient(to bottom, transparent 50%, rgba(13,31,60,0.92))
          `,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function ScreenshotSection({
  screenshotRef,
}: {
  screenshotRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div
        ref={screenshotRef}
        className="bg-navy-mid rounded-xl overflow-hidden shadow-2xl border border-cream/10 w-full md:w-[80%] lg:w-[70%] mx-auto relative aspect-[16/9]"
      >
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2400&q=80&auto=format&fit=crop"
          alt="AI automation workflow dashboard"
          fill
          priority
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="text-cream px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
        <p className="font-mono-brand text-[11px] tracking-[0.18em] uppercase text-orange mb-5 flex items-center gap-3">
          <span className="block w-8 h-px bg-orange" />§ AI Automation Specialist
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wide font-heading-brand">
          Helping businesses <span className="text-orange">automate, accelerate</span> and grow
        </h1>
        <div className="text-sm text-cream/70 opacity-90 mt-4 font-mono-brand tracking-wide">
          AI AUTOMATION &#92; WORKFLOW DESIGN &#92; BUSINESS CONSULTING
        </div>
      </div>

      <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-start">
        <p className="text-base sm:text-lg opacity-80 mb-6 max-w-md font-body">
          Precision-driven AI automation consulting for small and medium businesses — from workflow design to full implementation, in both English and Persian.
        </p>
        <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
          <a
            href="#services"
            className="border border-cream text-cream font-mono-brand font-medium py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 w-full sm:w-auto text-center hover:bg-cream hover:text-navy"
          >
            Explore Services
          </a>
          <a
            href="#booking"
            className="pointer-events-auto bg-orange text-white font-mono-brand font-medium py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 hover:bg-orange-warm hover:scale-105 flex items-center justify-center w-full sm:w-auto"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Book a Free Discovery Call
          </a>
        </div>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#booking", label: "Book a Call" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Background" },
  { href: "#webinars", label: "Webinars" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20 rounded-b-xl"
      style={{
        backgroundColor: "rgba(13, 31, 60, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="font-heading-brand font-bold text-[15px] text-cream tracking-wide">
            Afsaneh <span className="text-orange">Alavi Naeeni</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/75 hover:text-orange text-xs font-mono-brand uppercase tracking-wide transition duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#booking"
            className="hidden sm:inline-block border border-cream text-cream px-5 py-2 rounded-full text-xs font-mono-brand hover:bg-cream hover:text-navy transition duration-300"
          >
            Let&apos;s Talk!
          </a>
          <button
            className="md:hidden text-cream"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-navy">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-cream/80 hover:text-orange text-sm font-mono-brand uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="border border-cream text-cream px-5 py-2 rounded-full text-xs font-mono-brand text-center hover:bg-cream hover:text-navy transition duration-300"
          >
            Let&apos;s Talk!
          </a>
        </div>
      )}
    </nav>
  );
}

const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;

          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar />

      <CornerMarks tone="cream" size="lg" topOffsetClass="top-20" className="min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div
          ref={heroContentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <HeroContent />
        </div>

        <div className="absolute bottom-8 left-8 z-10 hidden sm:flex items-center gap-2 font-mono-brand text-[10px] tracking-[0.14em] uppercase text-cream/50 pointer-events-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
          Sys · Calibrated &amp; Running
        </div>
      </CornerMarks>

      <div className="bg-navy relative z-10" style={{ marginTop: "-10vh" }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        <div className="h-16 md:h-20" />
      </div>
    </div>
  );
};

export { HeroSection };
