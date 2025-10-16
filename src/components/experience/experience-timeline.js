import ExperienceCard from "./experience-card";

export default function ExperienceTimeline() {
  const experiences = [
    {
      company: "IntraGrad Inc.",
      role: "Executive Assistant & Financial Analyst",
      period: "May 2025 – Present",
      location: "Toronto, ON",
      details: [
        "Prepared 2023–2024 balance sheet and financial statements, ensuring accuracy for year-end reporting.",
        "Organized invoices and calculated revenue and expenses for submission to the company accountant, and assisted with filing the corporate T2 tax returns.",
        "Developed a 5-year financial forecast modeling best, worst, and mid-case growth scenarios.",
        "Analyzed key performance metrics weekly, tracking co-op student productivity, inquiries, and conversion rates.",
      ],
    },
    {
      company: "Marvel Recruiters",
      role: "Financial Analyst",
      period: "Nov 2024 – Feb 2025",
      location: "Toronto, ON",
      details: [
        "Assisted in analyzing financial data and creating reports to support decision-making processes.",
        "Aided in budget preparation and forecasting activities through data gathering and financial modeling.",
        "Conducted research on industry trends, market conditions, and benchmarks to provide insights for strategic planning.",
      ],
    },
    {
      company: "Win-Bar Insurance Brokerage",
      role: "Administrator",
      period: "May 2023 – Aug 2023",
      location: "Toronto, ON",
      details: [
        "Utilized TAMS (insurance management software) to maintain accurate records and streamline renewals for over 1,000+ home and auto policies.",
        "Analyzed policy coverage to identify gaps and ensure compliance with insurer requirements.",
        "Trained in quoting and comparing policies from partners such as Wawanesa, Intact, Aviva, Chubb, and Northbridge.",
      ],
    },
    {
      company: "Stormflow Surfacing",
      role: "Business Development Intern",
      period: "Sept 2022 – Dec 2022",
      location: "Stratford, ON",
      details: [
        "Created and advertised 75+ marketing posts targeting key audiences through Meta Business and HubSpot.",
        "Analyzed post-performance metrics and consumer engagement data to improve content strategy.",
        "Developed monthly actuals vs. budget tracking sheets in Excel to monitor financial growth.",
        "Resolved analytics and SEO issues (e.g., Google Analytics 404 errors) to improve reporting accuracy.",
      ],
    },
    {
      company: "Winners & HomeSense",
      role: "Sales Associate",
      period: "Sept 2021 – Apr 2022",
      location: "Pickering, ON",
      details: [
        "Assisted 100+ customers daily by providing personalized product recommendations and service support.",
        "Maintained accurate stock levels and ensured product displays were regularly updated.",
        "Adapted to multiple roles including cashier, floor associate, and customer service representative.",
      ],
    },
  ];

  return (
    <section className="max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-8 lg:pb-16">
      {experiences.map((exp, idx) => (
        <ExperienceCard key={idx} exp={exp} />
      ))}
    </section>
  );
}
