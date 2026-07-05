export default function SkillsSection() {
  const groups = [
    {
      title: "Technical & Data",
      description: "Tools used to turn messy information into clear reporting.",
      skills: [
        "Excel (Advanced)",
        "Python",
        "SQL",
        "Google Colab",
        "Data Analysis",
        "KPI Dashboards",
      ],
    },
    {
      title: "Finance & Business",
      description: "Analysis, reporting, and planning across finance roles.",
      skills: [
        "Financial Analysis",
        "Financial Modeling",
        "Forecasting",
        "Balance Sheets",
        "AP/AR",
        "Payroll",
      ],
    },
    {
      title: "Marketing & Operations",
      description:
        "Systems and creative tools for growth, events, and content.",
      skills: [
        "HubSpot",
        "Google Analytics",
        "Meta Business",
        "MS Office",
        "Canva",
        "Social Media Strategy",
      ],
    },
    {
      title: "Education & Certifications",
      description: "Academic foundation with business, computing, and finance.",
      skills: [
        "BMath, University of Waterloo",
        "Business Specialization",
        "Computing Minor",
        "CFA Level I Study",
        "Finance Accelerator",
        "Google Analytics Certified",
      ],
    },
  ];

  return (
    <section className="px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue">
        Toolkit
      </p>
      <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
        Skills, Tools & Education
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-foreground/70 sm:text-lg">
        A practical mix of data, finance, operations, marketing tools, and
        community leadership skills.
      </p>

      <div className="reveal-stagger mx-auto mt-10 grid max-w-6xl gap-5 text-left sm:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.title}
            className="magnetic-card overflow-hidden rounded-[2rem] border border-white/70 bg-white/64 p-6 shadow-lg shadow-slate-500/10 backdrop-blur-xl sm:p-7"
          >
            <div className="mb-5 h-1 w-20 rounded-full bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4]" />
            <h3 className="text-xl font-black text-foreground sm:text-2xl">
              {group.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-foreground/62">
              {group.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-jordyblue/16 bg-white/70 px-4 py-2 text-xs font-bold text-foreground/72 transition-all duration-300 hover:-translate-y-0.5 hover:border-jordyblue/40 hover:text-jordyblue"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
