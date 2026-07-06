export default function ExperienceCard({ exp, index }) {
  return (
    <div
      className="group relative mb-8 pl-8 sm:pl-10 animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute left-[7px] top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-jordyblue via-skyblue to-[#f9a8d4]/70" />
      <div className="absolute left-0 top-7 h-5 w-5 rounded-full border-[5px] border-white bg-jordyblue shadow-lg shadow-jordyblue/35 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#f9a8d4]" />

      <article className="magnetic-card relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/66 p-6 shadow-lg shadow-slate-500/10 backdrop-blur-xl sm:p-8">
        {exp.featured && (
          <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-jordyblue to-[#f9a8d4] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-jordyblue/20">
            Recent
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4]" />
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-skyblue/22 to-[#f9a8d4]/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />

        <div className="relative flex flex-col gap-3 pr-0 sm:flex-row sm:items-start sm:justify-between sm:pr-20">
          <div>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              {exp.role}
            </h3>
            <p className="mt-1 text-base font-semibold text-jordyblue sm:text-lg">
              {exp.company}
            </p>
          </div>
          <p className="w-fit rounded-full border border-jordyblue/20 bg-gradient-to-r from-[#eef4ff] to-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/64">
            {exp.period}
          </p>
        </div>

        <p className="relative mt-2 text-sm text-foreground/62">
          {exp.location}
        </p>

        {exp.tags?.length > 0 && (
          <div className="relative mt-5 flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gradient-to-r from-jordyblue/12 to-[#f9a8d4]/14 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-jordyblue"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <ul className="relative mt-5 grid gap-3 text-sm leading-6 text-foreground/76 sm:text-base">
          {exp.details.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-jordyblue to-skyblue" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
