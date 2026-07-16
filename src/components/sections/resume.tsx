import { SectionHeader } from "@/components/site/section-header";
import { CornerMarks } from "@/components/site/corner-marks";

const SKILL_GROUPS = [
  {
    title: "Core Expertise",
    skills: [
      "Medical Device Installation",
      "Calibration",
      "Troubleshooting & Diagnostics",
      "Root Cause Analysis",
      "cGMP / ISO Compliance",
      "SAP & CMMS",
      "Technical Reporting",
      "Field Service Support",
      "Preventive Maintenance",
      "AI Automation",
      "Workflow Design",
      "B2B Consulting",
    ],
  },
  {
    title: "AI & Consulting Skills",
    skills: [
      "AI Automation",
      "Process Analysis",
      "Digital Transformation",
      "Chatbot Development",
      "Data Pipelines",
      "Business Consulting",
    ],
  },
  {
    title: "Tools & Systems",
    skills: ["SAP", "CMMS", "Biomedical Test Equipment", "Electronic Diagnostics"],
  },
  {
    title: "Languages",
    skills: ["English — Professional", "Persian — Native"],
  },
];

export function Resume() {
  return (
    <section id="resume" className="bg-navy py-24">
      <div className="max-w-[1100px] mx-auto px-8">
        <SectionHeader
          section="resume"
          eyebrow="Professional background"
          title="Experience & Qualifications"
          sub="A career built on technical rigor, client trust, and cross-functional leadership across medical devices and AI consulting."
          tone="dark"
        />

        <CornerMarks tone="cream" className="bg-cream/5 border border-cream/10 rounded-2xl overflow-hidden">
          <div className="bg-navy-mid px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-[22px] font-bold text-cream mb-1 font-heading-brand">Afsaneh Alavi Naeeni</div>
              <div className="text-sm text-orange font-mono-brand">
                Biomedical Engineering Technologist · AI Automation Specialist · Business Consultant
              </div>
              <div className="text-[13px] text-cream/60 leading-loose mt-2 font-body">
                Markham, ON, Canada &nbsp;·&nbsp; 437-225-1350 &nbsp;·&nbsp; AI@AfsanehAlavi.com
                <br />
                <a
                  href="https://www.linkedin.com/in/afsaneh-alavi-naeeni"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange hover:text-orange-warm"
                >
                  linkedin.com/in/afsaneh-alavi-naeeni
                </a>
              </div>
            </div>
            <a
              href="#booking"
              className="inline-block bg-orange text-white text-[13px] font-mono-brand font-medium py-2.5 px-6 rounded-md hover:bg-orange-warm transition whitespace-nowrap"
            >
              Book a Session
            </a>
          </div>

          <div className="px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <SectionTitle>Professional Summary</SectionTitle>
              <p className="text-[13px] text-cream/65 leading-relaxed mb-6 font-body">
                Biomedical Engineering Technologist with 7+ years of experience in medical device installation,
                calibration, troubleshooting, and maintenance in clinical and multi-site environments. Experienced in
                cGMP/ISO compliance, documentation, and quality systems. Organized, adaptable, and able to manage
                multiple priorities in fast-paced environments.
              </p>

              <SectionTitle>Experience</SectionTitle>
              <ResumeItem
                title="Biomedical Engineer Technologist"
                sub="Spirita Aplasma · Tehran, Iran · Aug 2022 – Sep 2025"
                desc="Provided on-site technical support across hospital and clinical locations ensuring timely service and customer satisfaction. Performed preventive maintenance, upgrades, and corrective repairs on medical and laboratory equipment. Installed, configured, and validated medical devices with clinical teams. Troubleshot complex electromechanical and automated systems, reducing downtime by up to 35%. Provided remote technical support and trained third-party service engineers to improve technical performance."
              />
              <ResumeItem
                title="Technical Manager"
                sub="Faradeed Adac International Co. · Tehran, Iran · Aug 2017 – Aug 2022"
                desc="Managed service operations and KPIs including response time, first-time fix rate, and documentation accuracy. Completed service documentation in CMMS/SAP with full SOP compliance. Ensured adherence to cGMP, ISO, and healthcare regulatory standards. Installed and serviced sterilization and laboratory equipment, reducing emergency repairs by 22%. Executed preventive maintenance schedules, reducing failures by 28%."
              />

              <SectionTitle className="mt-6">Education</SectionTitle>
              <ResumeItem title="M.Sc. Mechatronic Engineering" sub="Tehran Azad University, Science and Research Branch" />
              <ResumeItem title="B.Sc. Biomedical Engineering" sub="Tehran Azad University, Science and Research Branch" />
            </div>

            <div>
              <SectionTitle>Certifications</SectionTitle>
              <ResumeItem
                title="Scientific Report Writing Fundamentals"
                sub="GMP / GLP / GCP · QA/QC · BioTalent Canada · Mar 2026"
              />
              <ResumeItem
                title="Standardizing and Calibrating Medical Devices"
                sub="Institute of Standard Authorization of Iran"
              />

              {SKILL_GROUPS.map((group) => (
                <div key={group.title}>
                  <SectionTitle className="mt-6">{group.title}</SectionTitle>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-orange/10 text-orange border border-orange/20 text-xs font-mono-brand px-2.5 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 sm:px-10 pb-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/resume-afsaneh-alavi-naeeni.pdf"
              download
              className="inline-block bg-orange text-white text-[13px] font-mono-brand font-medium py-2.5 px-6 rounded-md text-center hover:bg-orange-warm transition"
            >
              Download Full Résumé (PDF)
            </a>
            <a
              href="#booking"
              className="inline-block border-[1.5px] border-cream/20 text-cream text-[13px] font-mono-brand font-medium py-2.5 px-6 rounded-md text-center hover:border-orange hover:text-orange transition"
            >
              Book a Consultation
            </a>
          </div>
        </CornerMarks>
      </div>
    </section>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "font-mono-brand text-[10px] tracking-[0.15em] uppercase text-orange mb-4 pb-2 border-b border-orange/20 " +
        className
      }
    >
      {children}
    </div>
  );
}

function ResumeItem({ title, sub, desc }: { title: string; sub: string; desc?: string }) {
  return (
    <div className="mb-5">
      <div className="text-sm font-bold text-cream mb-0.5 font-heading-brand">{title}</div>
      <div className="text-xs text-cream/50 mb-1 font-body">{sub}</div>
      {desc && <div className="text-[13px] text-cream/65 leading-relaxed font-body">{desc}</div>}
    </div>
  );
}
