"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Sunset from "../../images/Sunset.png";
import SunsetR from "../../images/Sunset-R.png";
import Deer from "../../images/Deer.png";
import DeerR from "../../images/Deer-R.png";
import Music from "../../images/Music.png";
import MusicR from "../../images/Music-R.png";
import Krishna from "../../images/Krishna.png";
import KrishnaR from "../../images/Krishna-R.png";
import Winter from "../../images/Winter.png";
import WinterR from "../../images/Winter-R.png";
import Mandir from "../../images/Mandir.png";
import MandirR from "../../images/Mandir-R.png";
import SectionDivider from "../../components/gold-line";

export default function Beyondwork() {
  const artworks = [
    {
      front: Sunset,
      back: SunsetR,
      alt: "Sunset Serenity",
      caption: "Warm landscapes and quiet reflection.",
      rotate: "-3deg",
      bg: "from-[#ffb78a]/80 via-[#f78963]/55 to-[#f5d0b9]/80",
      scale: "scale-[0.9]",
    },
    {
      front: Deer,
      back: DeerR,
      alt: "Nature’s Reflection",
      caption: "A calm moment between nature and stillness.",
      rotate: "2deg",
      bg: "from-[#6db2f5]/78 via-[#4475cf]/55 to-[#d7e9ff]/80",
      scale: "scale-[1]",
    },
    {
      front: Music,
      back: MusicR,
      alt: "Harmony in Motion",
      caption: "Inspired by rhythm, sound, and movement.",
      rotate: "4deg",
      bg: "from-[#d9b28d]/70 via-[#b98a62]/52 to-[#f4dbc4]/78",
      scale: "scale-[1]",
    },
    {
      front: Krishna,
      back: KrishnaR,
      alt: "Divine Joy",
      caption: "Spiritual symbolism through soft detail.",
      rotate: "-4deg",
      bg: "from-[#f7e7e7]/82 via-[#faf6f2]/68 to-white/88",
      scale: "scale-[1]",
    },
    {
      front: Winter,
      back: WinterR,
      alt: "Peaceful Nights",
      caption: "Cool tones, winter skies, and quiet peace.",
      rotate: "-3deg",
      bg: "from-[#8fd0ff]/78 via-[#60b8f2]/55 to-[#ddefff]/84",
      scale: "scale-[0.9]",
    },
    {
      front: Mandir,
      back: MandirR,
      alt: "Ayodhya Mandir",
      caption: "Faith, architecture, and devotion in colour.",
      rotate: "3deg",
      bg: "from-[#fca968]/80 via-[#f2753b]/58 to-[#ffe0c3]/82",
      scale: "scale-[1]",
    },
  ];

  const [flipped, setFlipped] = useState(Array(artworks.length).fill(false));
  const [active, setActive] = useState(null);

  const handleFlip = (index) => {
    setActive(index);
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 py-24 text-foreground sm:px-8">
      <div className="absolute inset-0 -z-10 animated-gradient-bg" />
      <div className="soft-orb left-8 top-24 h-32 w-32 bg-skyblue/24" />
      <div className="soft-orb right-8 top-52 h-44 w-44 bg-[#f9a8d4]/22 [animation-delay:1.4s]" />

      <section className="mb-16 max-w-5xl text-center animate-slide-down">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue">
          Creative side
        </p>
        <h1 className="animated-gradient-text text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Beyond Work & School 🎨
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-foreground/76 sm:text-lg">
          Outside my analytical and technical work, I find calm in painting and
          sketching. Art helps me express balance — between precision and
          creativity — whether it’s a peaceful landscape, spiritual symbolism,
          or a visual rhythm inspired by music.
        </p>
        <div className="mx-auto mt-7 w-fit rounded-full border border-white/70 bg-white/62 px-5 py-3 text-sm font-semibold text-foreground/68 shadow-sm backdrop-blur-md">
          Click any artwork to flip it ✨
        </div>
      </section>

      <div className="grid w-full max-w-7xl grid-cols-1 place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((art, idx) => (
          <button
            key={art.alt}
            type="button"
            className="group relative mx-auto cursor-pointer border-none bg-transparent text-left outline-none transition-transform duration-300 hover:-translate-y-2 focus-visible:ring-4 focus-visible:ring-jordyblue/30 animate-fade-up"
            style={{ rotate: art.rotate, animationDelay: `${idx * 0.07}s` }}
            onClick={() => handleFlip(idx)}
            onMouseEnter={() => setActive(idx)}
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-jordyblue/22 via-skyblue/16 to-[#f9a8d4]/22 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div
              className={`relative aspect-[4/3] w-[260px] overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${art.bg} p-4 shadow-xl shadow-slate-500/14 ring-1 ring-white/60 backdrop-blur-sm sm:w-[320px] md:w-[350px]`}
            >
              <div className="absolute -top-3 left-1/2 h-4 w-28 -translate-x-1/2 rotate-[1deg] bg-[#fff8c9]/86 shadow-sm" />
              <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-4 rounded-2xl border border-white/60 bg-white/72 p-3 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-bold text-foreground">{art.alt}</p>
                <p className="text-xs leading-5 text-foreground/66">
                  {art.caption}
                </p>
              </div>

              <div
                className={`relative h-full w-full transform-gpu transition-all duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] ${art.scale}`}
                style={{
                  transform: flipped[idx]
                    ? "rotateY(180deg) scale(1.04)"
                    : "rotateY(0deg) scale(1)",
                  transformStyle: "preserve-3d",
                }}
              >
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
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 350px, 350px"
                    className="rounded-xl object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.03]"
                    placeholder="blur"
                  />
                </div>

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
                    alt={`${art.alt} reverse side`}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 350px, 350px"
                    className="rounded-xl object-contain drop-shadow-lg"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="mt-10 rounded-full border border-white/70 bg-white/62 px-5 py-3 text-center text-sm font-semibold text-foreground/72 shadow-sm backdrop-blur-md animate-fade-up">
          Viewing: {artworks[active].alt}
        </div>
      )}

      <div className="flex w-full justify-center py-12 sm:py-16 lg:py-20">
        <SectionDivider />
      </div>

      <Link
        href="https://instagram.com/anjanie.arts"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4] px-7 py-3 font-bold text-white shadow-lg shadow-jordyblue/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        </svg>
        Follow on Instagram
      </Link>
    </main>
  );
}
