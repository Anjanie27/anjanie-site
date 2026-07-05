export default function LeadershipSection() {
  const highlights = [
    "Board of Directors",
    "Director of Events",
    "Social Media Lead",
    "Youth initiatives",
    "Food drives",
  ];

  const impact = [
    { value: "5+", label: "food drives organized" },
    { value: "15+", label: "years connected to the community" },
    { value: "End-to-end", label: "event logistics & execution" },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-14 text-center sm:px-8 lg:py-20">
      <div className="absolute inset-0 -z-10 animated-gradient-bg" />
      <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
        Leadership & Community Impact
      </h2>
      <p className="mx-auto mt-4 mb-9 max-w-2xl text-base leading-8 text-foreground/76 sm:text-lg lg:text-xl">
        Leading with purpose — bringing communities together through event
        execution, youth engagement, social media storytelling, and service.
      </p>

      <div className="magnetic-card mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 text-left shadow-xl shadow-slate-500/10 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mb-6 flex flex-wrap gap-3">
          {highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-gradient-to-r from-jordyblue/12 to-[#f9a8d4]/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-jordyblue"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl">
              Board of Directors, Director of Events
            </h3>
            <p className="mt-2 text-sm text-foreground/68 sm:text-base">
              Devi Mandir · Waterloo, ON · Sept 2023 – Aug 2024
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-foreground/76 sm:text-base">
              <li>
                Led event planning and execution, overseeing temple events and
                coordinating logistics from concept to completion.
              </li>
              <li>
                Served as Social Media Lead, managing content strategy and
                community engagement across digital channels.
              </li>
              <li>
                Headed youth initiatives to increase youth involvement,
                education, leadership, and community impact.
              </li>
              <li>
                Organized and led 5+ food drives in under two years, providing
                cooked and packaged meals to shelters across the GTA.
              </li>
            </ul>
          </div>

          <div className="grid gap-3">
            {impact.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.4rem] border border-jordyblue/14 bg-white/60 p-5 text-center shadow-sm backdrop-blur-md"
              >
                <p className="animated-gradient-text text-2xl font-black">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-foreground/58">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
