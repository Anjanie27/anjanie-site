export default function LeadershipSection() {
  return (
    <section className="bg-lavenderblush/50 py-8 sm:py-8 lg:py-16 text-center px-4 sm:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Leadership & Impact
      </h2>
      <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-foreground/80 mb-8">
        Leading with purpose — bringing communities together through
        organization, creativity, and compassion.
      </p>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8 lg:p-10 text-left border-l-4 border-jordyblue">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-1">
          Vice President & Events Director
        </h3>
        <p className="text-foreground/80 mb-3 text-sm sm:text-base">
          Hindu Students Council · University of Waterloo (2023–2024)
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-sm sm:text-base text-foreground/80">
          <li>
            Directed a team of coordinators for cultural events like Diwali and
            Holi.
          </li>
          <li>
            Secured sponsors and managed event budgets while coordinating
            logistics.
          </li>
          <li>
            Led outreach campaigns to grow student engagement and visibility
            across campus.
          </li>
        </ul>
      </div>
    </section>
  );
}
