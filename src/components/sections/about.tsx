import Image from "next/image";
import { Zap, Handshake, Repeat, Globe } from "lucide-react";
import { SectionHeader } from "@/components/site/section-header";

const VALUES = [
  { icon: Zap, title: "Precision & Speed", desc: "On-time delivery, zero-error execution." },
  { icon: Handshake, title: "Real Support", desc: "Full assistance from design through implementation." },
  { icon: Repeat, title: "Innovation", desc: "Latest AI and automation technologies." },
  { icon: Globe, title: "Dual-Market", desc: "Fluent in Iranian & Canadian business culture." },
];

const SPEC_TILES = [
  { value: "7+", label: "Years in precision technical service" },
  { value: "cGMP·ISO", label: "Trained in regulated documentation" },
];

export function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <SectionHeader
          section="about"
          eyebrow="About Afsaneh"
          title="Precision, trust, and intelligent design"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-8">
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="row-span-2 rounded-xl overflow-hidden min-h-[340px] relative">
              <Image
                src="/images/afsaneh-headshot.jpg"
                alt="Afsaneh Alavi Naeeni"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 0px, 25vw"
              />
            </div>
            {SPEC_TILES.map((tile) => (
              <div
                key={tile.label}
                className="rounded-xl bg-navy flex flex-col items-start justify-center p-6 min-h-[160px] gap-2"
              >
                <span className="font-mono-brand text-3xl font-semibold text-orange">{tile.value}</span>
                <span className="font-body text-[13px] text-cream/60 leading-snug">{tile.label}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-lg text-text-muted leading-relaxed mb-6 font-body">
              With a Master&apos;s in Mechatronic Engineering and a Bachelor&apos;s in Biomedical Engineering, I bring
              over seven years of experience in technical service, client support, and multi-site operations — with
              deep expertise in medical devices.
            </p>
            <p className="text-base text-text-muted leading-relaxed mb-8 font-body">
              Today I channel that analytical precision into AI automation consulting — helping businesses in both
              Canada and Iran eliminate inefficiencies, automate repetitive work, and grow with confidence. I also
              developed AI tools that simplify résumé writing, job searching, and interview preparation for newly
              arrived Iranians in Canada.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-2.5 bg-cream border border-cream-mid rounded-lg px-4 py-3.5"
                >
                  <div className="w-8 h-8 min-w-8 rounded-lg bg-orange/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-orange" />
                  </div>
                  <div className="text-[13px] font-body">
                    <strong className="block font-mono-brand text-xs mb-0.5 text-navy">{title}</strong>
                    <span className="text-text-muted">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
