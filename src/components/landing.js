"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./buttons";
import {
  BadgeCheck,
  BarChart3,
  Briefcase,
  FileText,
  GraduationCap,
  HeartHandshake,
  Linkedin,
  Sparkles,
} from "lucide-react";

const focusCards = [
  {
    icon: BarChart3,
    title: "Finance & Analytics",
    text: "Case studies, AI research, KPI dashboards, forecasting, and data-informed decision-making.",
  },
  {
    icon: Briefcase,
    title: "Business Strategy",
    text: "Experience across BMO, financial analysis, operations, reporting, and product comparison work.",
  },
  {
    icon: HeartHandshake,
    title: "Leadership & Seva",
    text: "Board-level event leadership, youth initiatives, food drives, and community engagement.",
  },
];

const resumeHighlights = [
  {
    icon: Briefcase,
    eyebrow: "Most Recent Co-op",
    title: "BMO Growth Office Analyst",
    text: "AI research, case studies, KPI dashboards, and product analysis for internal stakeholders.",
  },
  {
    icon: GraduationCap,
    eyebrow: "Education",
    title: "University of Waterloo Mathematics",
    text: "Business specialization, computing minor, and actively studying toward CFA Level I.",
  },
  {
    icon: BadgeCheck,
    eyebrow: "Core toolkit",
    title: "Excel, Python, SQL & Data Analysis",
    text: "Advanced Excel dashboards, Google Analytics, HubSpot, MS Office, Canva, and reporting tools.",
  },
];

export function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: "50%", y: "35%" });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = Math.min(scrollY * 0.12, 34);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMouse({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{ "--mouse-x": mouse.x, "--mouse-y": mouse.y }}
      className="spotlight noise-overlay relative min-h-screen overflow-hidden px-5 pb-20 pt-8 sm:px-8 lg:px-14"
    >
      <div className="soft-orb left-[4%] top-20 h-28 w-28 bg-skyblue/28" />
      <div className="soft-orb right-[8%] top-36 h-40 w-40 bg-[#f9a8d4]/24 [animation-delay:1.2s]" />
      <div className="soft-orb bottom-24 left-[18%] h-24 w-24 bg-[#f5c66f]/22 [animation-delay:2.1s]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div
          className="group relative mx-auto w-full max-w-[480px] animate-fade-up"
          style={{ transform: `translateY(-${translateY}px)` }}
        >
          <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-jordyblue/28 via-skyblue/22 to-[#f9a8d4]/28 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 p-3 shadow-2xl shadow-slate-500/15 backdrop-blur-xl transition-all duration-500 group-hover:-rotate-1 group-hover:scale-[1.015]">
            <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70 shadow-sm backdrop-blur-md">
              <Sparkles size={14} className="text-jordyblue" />
              Portfolio
            </div>

            <div className="relative h-[340px] w-full overflow-hidden rounded-[1.5rem] sm:h-[430px] lg:h-[56vh]">
              <Image
                src="/images/profile.png"
                alt="Anjanie Sukhnandan profile photo"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/36 via-transparent to-transparent" />
            </div>

            <div className="mt-3 flex flex-col gap-3 rounded-[1.4rem] bg-gradient-to-r from-[#eef4ff]/90 via-white/90 to-lavenderblush/80 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Let’s connect
                </p>
                <p className="text-xs text-foreground/65">
                  Finance, analytics, creativity & community
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/anjanie-s/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0077B5] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0077B5]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Linkedin size={19} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="animate-fade-up rounded-full border border-jordyblue/20 bg-white/54 px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue shadow-sm backdrop-blur-md">
            Welcome to my world
          </div>

          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Hello, I’m <span className="animated-gradient-text">Anjanie.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/76 sm:text-lg lg:text-xl">
            A University of Waterloo Mathematics student with a business
            specialization and computing minor, currently building experience
            across finance, analytics, strategy, and community leadership.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button title="View Latest Resume" />
            </a>
            <Link href="/experience">
              <Button title="Explore Experience" variant="outline" />
            </Link>
          </div>

          <div className="mt-7 w-full max-w-3xl animate-fade-up rounded-[1.75rem] border border-white/70 bg-white/58 p-5 text-left shadow-xl shadow-slate-500/10 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-jordyblue">
                  <FileText size={15} />
                  Resume snapshot
                </p>
                <h2 className="mt-2 text-xl font-black text-foreground sm:text-2xl">
                  Growth Office Analyst, Finance & Community Leader
                </h2>
              </div>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-jordyblue/30 bg-white/62 px-5 py-3 text-sm font-bold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-jordyblue hover:bg-white hover:text-jordyblue"
              >
                Open PDF
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {resumeHighlights.map(({ icon: Icon, eyebrow, title, text }) => (
                <div
                  key={title}
                  className="rounded-[1.25rem] border border-white/65 bg-gradient-to-br from-white/80 via-white/60 to-lavenderblush/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-jordyblue to-skyblue text-white shadow-lg shadow-jordyblue/20">
                    <Icon size={19} />
                  </div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-jordyblue/80">
                    {eyebrow}
                  </p>
                  <h3 className="mt-1 text-sm font-black text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-foreground/68">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-stagger mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
            {focusCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="magnetic-card glass-card rounded-3xl p-5 text-left"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-jordyblue to-skyblue text-white shadow-lg shadow-jordyblue/20">
                  <Icon size={21} />
                </div>
                <h3 className="text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/68">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-5xl animate-fade-up rounded-[2rem] border border-white/70 bg-white/58 p-6 text-center shadow-xl shadow-slate-500/10 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mx-auto mb-7 h-1 w-28 rounded-full bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4] shimmer-line" />
        <div className="grid gap-6 text-left text-sm leading-7 text-foreground/76 sm:text-base lg:grid-cols-2 lg:text-lg">
          <p>
            My background brings together finance, analytics, business, and
            technology. From building Excel dashboards and financial forecasts
            to researching AI and market trends, I enjoy turning complex
            information into clear decisions.
          </p>
          <p>
            At BMO, I support Growth Office work through case studies, product
            comparison analysis, internal research, KPI reporting, and process
            documentation that helps teams work more efficiently.
          </p>
          <p>
            My Waterloo Mathematics degree has strengthened the way I approach
            problem-solving, while my business specialization and computing
            minor have helped me connect numbers, strategy, and technology.
          </p>
          <p>
            Outside academics and work, I am deeply committed to seva. Through
            Devi Mandir, I have led events, youth initiatives, social media, and
            food drives that support community connection and impact.
          </p>
        </div>
      </div>
    </section>
  );
}
