export default function SkillsSection() {
  const skills = [
    "Financial Analysis",
    "Excel Modeling",
    "Data Visualization",
    "Business Forecasting",
    "Google Analytics",
    "Accounting Principles",
    "HubSpot",
    "MS Suite",
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-background text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10">
        Skills & Tools
      </h2>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-lavenderblush text-foreground rounded-full font-medium text-xs sm:text-sm lg:text-base hover:bg-jordyblue hover:text-white transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
