export default function ExperienceCard({ exp }) {
  return (
    <div className="relative border-l-4 border-jordyblue pl-6 sm:pl-8 mb-10 sm:mb-12 group">
      {/* Timeline Dot */}
      <div className="absolute -left-[9px] top-1.5 w-3 h-3 sm:w-4 sm:h-4 bg-jordyblue rounded-full group-hover:scale-125 transition-transform" />

      <h3 className="text-xl sm:text-2xl font-semibold mb-1">{exp.role}</h3>
      <p className="text-base sm:text-lg text-foreground/80 font-medium">
        {exp.company}
      </p>
      <p className="text-xs sm:text-sm text-foreground/60 mb-4">
        {exp.period} · {exp.location}
      </p>
      <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-foreground/80 space-y-2">
        {exp.details.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
