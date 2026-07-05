"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./buttons";
import {
  BarChart3,
  HeartHandshake,
  Linkedin,
  Palette,
  Sparkles,
} from "lucide-react";

const focusCards = [
  {
    icon: BarChart3,
    title: "Finance & Analytics",
    text: "Forecasting, market research, reporting, and thoughtful business decisions.",
  },
  {
    icon: Palette,
    title: "Creative Balance",
    text: "Painting, music, and design that bring personality into analytical work.",
  },
  {
    icon: HeartHandshake,
    title: "Seva & Community",
    text: "Giving back through service, leadership, and meaningful community initiatives.",
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
                  Finance, creativity, community & growth
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
            A Mathematics student at the University of Waterloo with a business
            specialization and computing minor, exploring the space where
            finance, creativity, analytical thinking, and service come together.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button title="View Resume" />
            </a>
            <Link href="/experience">
              <Button title="Explore Experience" variant="outline" />
            </Link>
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
            Some may describe me as versatile, while others might say I’m still
            figuring things out, and in many ways, both are true. I began my
            academic journey with a clear path in mind: Actuarial Science.
          </p>
          <p>
            In my third year, I pivoted after realizing that the actuarial field
            did not align with my passions. I found myself drawn to business,
            trading, investments, and understanding how market trends move
            together.
          </p>
          <p>
            My computing minor became one of the most valuable parts of my
            education. It introduced me to structured, analytical problem
            solving and changed how I approach complex decisions.
          </p>
          <p>
            Outside academics and work, I find joy in music and art. I am also
            deeply committed to seva, whether through small acts of help or
            larger initiatives such as food drives and community events.
          </p>
        </div>
      </div>
    </section>
  );
}
