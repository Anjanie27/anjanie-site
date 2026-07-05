"use client";

import ExperienceHeader from "../../components/experience/experience-header";
import ExperienceTimeline from "../../components/experience/experience-timeline";
import LeadershipSection from "../../components/experience/leadership-section";
import SkillsSection from "../../components/experience/skills-section";
import SectionDivider from "../../components/gold-line";

export default function Experience() {
  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      <div className="absolute left-[-6rem] top-24 h-72 w-72 rounded-full bg-skyblue/20 blur-3xl" />
      <div className="absolute right-[-7rem] top-[38rem] h-80 w-80 rounded-full bg-[#f9a8d4]/18 blur-3xl" />
      <ExperienceHeader />
      <ExperienceTimeline />
      <SectionDivider />
      <LeadershipSection />
      <SectionDivider />
      <SkillsSection />
    </main>
  );
}
