"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Sunset from "@/images/Sunset.png";
import SunsetR from "@/images/Sunset-R.png";
import Deer from "@/images/Deer.png";
import DeerR from "@/images/Deer-R.png";
import Music from "@/images/Music.png";
import MusicR from "@/images/Music-R.png";
import Krishna from "@/images/Krishna.png";
import KrishnaR from "@/images/Krishna-R.png";
import Winter from "@/images/Winter.png";
import WinterR from "@/images/Winter-R.png";
import Mandir from "@/images/Mandir.png";
import MandirR from "@/images/Mandir-R.png";
import SectionDivider from "@/components/gold-line";

export default function Beyondwork() {
  const artworks = [
    {
      front: Sunset,
      back: SunsetR,
      alt: "Sunset Serenity",
      rotate: "-3deg",
      bg: "bg-gradient-to-br from-[#ffb78a]/70 via-[#f78963]/60 to-[#f5a07b]/70",
      scale: "scale-[0.9]",
    },
    {
      front: Deer,
      back: DeerR,
      alt: "Nature’s Reflection",
      rotate: "2deg",
      bg: "bg-gradient-to-br from-[#6db2f5]/70 via-[#4475cf]/60 to-[#274b8f]/70",
      scale: "scale-[1]",
    },
    {
      front: Music,
      back: MusicR,
      alt: "Harmony in Motion",
      rotate: "4deg",
      bg: "bg-gradient-to-br from-[#d9b28d]/60 via-[#b98a62]/50 to-[#a0714c]/60",
      scale: "scale-[1]",
    },
    {
      front: Krishna,
      back: KrishnaR,
      alt: "Divine Joy",
      rotate: "-4deg",
      bg: "bg-gradient-to-br from-[#f7e7e7]/70 via-[#faf6f2]/60 to-[#ffffff]/70",
      scale: "scale-[1]",
    },
    {
      front: Winter,
      back: WinterR,
      alt: "Peaceful Nights",
      rotate: "-3deg",
      bg: "bg-gradient-to-br from-[#8fd0ff]/70 via-[#60b8f2]/60 to-[#3a8bc9]/70",
      scale: "scale-[0.9]",
    },
    {
      front: Mandir,
      back: MandirR,
      alt: "Ayodhya Mandir",
      rotate: "3deg",
      bg: "bg-gradient-to-br from-[#fca968]/70 via-[#f2753b]/60 to-[#e85722]/70",
      scale: "scale-[1]",
    },
  ];

  const [flipped, setFlipped] = useState(Array(artworks.length).fill(false));

  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-lavenderblush/50 via-background to-lavenderblush/40 py-24 flex flex-col items-center overflow-x-hidden">
      {/* Intro Section */}
      <section className="max-w-5xl text-center animate-slide-down mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-foreground tracking-tight">
          Beyond Work & School 🎨
        </h1>
        <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl mx-auto">
          Outside my analytical and technical work, I find calm in painting and
          sketching. Art helps me express balance — between precision and
          creativity — whether it’s a peaceful landscape, spiritual symbolism,
          or a visual rhythm inspired by music. These moments remind me to slow
          down and create for the sake of creating.
        </p>
      </section>

      {/* Artwork Grid */}
      <div className="flex flex-wrap justify-center gap-10 sm:gap-14 md:gap-20 w-full px-4 sm:px-8">
        {artworks.map((art, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            style={{ rotate: art.rotate }}
            onClick={() => handleFlip(idx)}
          >
            <div
              className={`relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[420px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg ring-1 ring-foreground/10 ${art.bg} p-4 sm:p-5 md:p-6`}
            >
              {/* Tape decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-[#f5f3c6] rotate-[1deg] opacity-80 shadow-sm" />

              {/* Image container with flip animation */}
              <div
                className={`relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] transform-gpu ${art.scale}`}
                style={{
                  transform: flipped[idx]
                    ? "rotateY(180deg) scale(1.05)"
                    : "rotateY(0deg) scale(1)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* FRONT image */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    opacity: flipped[idx] ? 0 : 1,
                  }}
                >
                  <Image
                    src={art.front}
                    alt={art.alt}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 360px, 420px"
                    className="object-contain rounded-md"
                    placeholder="blur"
                  />
                </div>

                {/* BACK image */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    opacity: flipped[idx] ? 1 : 0,
                  }}
                >
                  <Image
                    src={art.back}
                    alt={`${art.alt} - back`}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 360px, 420px"
                    className="object-contain rounded-md"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-12 sm:py-16 lg:py-20 w-full flex justify-center">
        <SectionDivider />
      </div>

      {/* Instagram Button */}
      <Link
        href="https://instagram.com/anjanie.arts"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-jordyblue text-white font-medium px-6 py-3 rounded-full shadow-md hover:bg-skyblue hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Instagram Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        </svg>
        Follow on Instagram
      </Link>
    </main>
  );
}
