import ExperienceCard from "./experience-card";

export default function ExperienceTimeline() {
  const experiences = [
    {
      company: "Bank of Montreal (BMO)",
      role: "Growth Office Analyst",
      period: "Jan 2026 – April 2026",
      location: "Toronto, ON",
      featured: true,
      tags: [
        "AI research",
        "Wealth Management",
        "Capital Markets",
        "KPI dashboards",
      ],
      details: [
        "Conducted 5+ case studies, including AI research studies, to analyze industry trends and support strategic decision-making.",
        "Developed product comparison analyses for Wealth Management and Capital Markets, simplifying complex products for internal stakeholders.",
        "Created a 50+ page AE Manual to standardize workflows, improve onboarding, and reduce repeated process gaps.",
        "Maintained Excel dashboards with 10+ KPIs, improving reporting efficiency by approximately 30%.",
      ],
    },
    {
      company: "IntraGrad",
      role: "Executive Assistant & Financial Analyst",
      period: "May 2025 – Dec 2025",
      location: "Toronto, ON",
      tags: ["Financial statements", "AP/AR", "Payroll", "Forecasting"],
      details: [
        "Prepared 2023–2024 balance sheet and financial statements, ensuring accuracy for year-end reporting.",
        "Managed accounts payable and receivable, processed payroll, and supported accurate cash-flow tracking.",
        "Analyzed weekly performance metrics, including co-op student productivity, inquiries, and application conversions.",
        "Developed a 5-year financial forecast with best, worst, and mid-case growth scenarios.",
      ],
    },
    {
      company: "Marvel Recruiters",
      role: "Financial Analyst",
      period: "Nov 2024 – Feb 2025",
      location: "Toronto, ON",
      tags: ["Reporting", "Budgeting", "Financial modeling"],
      details: [
        "Analyzed financial data and generated reports to support decision-making.",
        "Supported budget preparation and forecasting by gathering relevant data and assisting with financial modeling.",
        "Researched industry trends, market conditions, and financial benchmarks to provide insights for strategic planning.",
      ],
    },
    {
      company: "Win-Bar Insurance Brokerage",
      role: "Administrator",
      period: "May 2023 – Aug 2023",
      location: "Toronto, ON",
      tags: ["TAMS", "Client coverage", "Renewals"],
      details: [
        "Used TAMS insurance management software to maintain accurate records and streamline over 1,000 home and auto policy renewals.",
        "Analyzed policy coverage and identified gaps for clients using insurance policy and regulation knowledge.",
        "Trained in quoting and comparing auto insurance policies from partners including Wawanesa, Intact, Aviva, Chubb, Northbridge, and Travelers Essentials.",
      ],
    },
    {
      company: "Stormflow Surfacing",
      role: "Business Development",
      period: "Sept 2022 – Dec 2022",
      location: "Stratford, ON",
      tags: ["HubSpot", "Meta Business", "Analytics"],
      details: [
        "Created and advertised 75+ social media posts to market the company to target audiences.",
        "Analyzed social media insight data from posts and consumer interactions using HubSpot and Meta Business.",
        "Created monthly actuals versus budget sheets in Excel to track company growth.",
        "Resolved 404 issues related to Google Analytics after completing official training.",
      ],
    },
  ];

  return (
    <section
      id="experience-timeline"
      className="relative mx-auto max-w-3xl px-4 pb-10 sm:max-w-4xl sm:px-6 lg:max-w-5xl lg:px-8 lg:pb-20"
    >
      {experiences.map((exp, idx) => (
        <ExperienceCard key={exp.company} exp={exp} index={idx} />
      ))}
    </section>
  );
}
