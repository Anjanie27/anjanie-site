"use client";

import ExperienceHeader from "../../components/experience/experience-header";
import ExperienceTimeline from "../../components/experience/experience-timeline";
import LeadershipSection from "../../components/experience/leadership-section";
import SkillsSection from "../../components/experience/skills-section";
import SectionDivider from "../../components/gold-line";

export default function Experience() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ExperienceHeader />
      <ExperienceTimeline />
      <SectionDivider />
      <LeadershipSection />
      <SectionDivider />
      <SkillsSection />
    </main>
  );
}
