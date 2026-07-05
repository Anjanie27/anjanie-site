const stats = [
  { value: "5+", label: "case studies & AI research projects" },
  { value: "10+", label: "KPIs maintained across Excel dashboards" },
  { value: "50+", label: "page AE manual created for onboarding" },
  { value: "1,000+", label: "insurance renewals processed" },
];

export default function ExperienceHeader() {
  return (
    <section className="relative px-6 py-12 text-center sm:py-14 lg:py-20">
      <div className="mx-auto max-w-6xl animate-slide-down overflow-hidden rounded-[2rem] border border-white/70 bg-white/54 p-8 shadow-xl shadow-slate-500/10 backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-jordyblue/16 blur-2xl" />
        <div className="absolute right-8 top-12 h-28 w-28 rounded-full bg-[#f9a8d4]/20 blur-2xl" />

        <div className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue">
            Professional story
          </p>
          <h1 className="animated-gradient-text text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Experience, Leadership & Impact
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-foreground/76 sm:text-lg lg:text-xl">
            A blend of finance, analytics, operations, and community leadership
            — from BMO Growth Office work and KPI dashboards to board-level
            event leadership at Devi Mandir.
          </p>

          <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-[1.4rem] border border-white/72 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="animated-gradient-text text-3xl font-black sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-foreground/68">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/anjanie-sukhnandan-resume-july-2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-jordyblue/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="relative z-10">View latest resume</span>
              <span className="absolute inset-0 -translate-x-full bg-white/24 transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#experience-timeline"
              className="rounded-full border border-jordyblue/30 bg-white/50 px-7 py-3 text-sm font-bold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-jordyblue hover:bg-white/80 hover:text-jordyblue"
            >
              Explore timeline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
