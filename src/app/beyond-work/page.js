"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Sunset from "@/images/Sunset.png";
import SunsetR from "@/images/Sunset-R.png";
import Deer from "@/images/Deer.png";
//import DeerR from "@/images/Deer-R.png";
import Krishna from "@/images/Krishna.png";
//import KrishnaR from "@/images/Krishna-R.png";
import Mandir from "@/images/Mandir.png";
//import MandirR from "@/images/Mandir-R.png";
import Music from "@/images/Music.png";
//import MusicR from "@/images/Music-R.png";
import Winter from "@/images/Winter.png";
//import WinterR from "@/images/Winter-R.png";

export default function Beyondwork() {
  const artworks = [
    { front: Sunset, back: SunsetR, alt: "Sunset Serenity", rotate: "-3deg" },
   // { front: Krishna, back: KrishnaR, alt: "Divine Joy", rotate: "0deg" },
   // { front: Music, back: MusicR, alt: "Harmony in Motion", rotate: "-3deg" },
   // { front: Deer, back: DeerR, alt: "Nature’s Reflection", rotate: "2deg" },
   // { front: Mandir, back: MandirR, alt: "Ayodhya Mandir", rotate: "-1deg" },
   // { front: Winter, back: WinterR, alt: "Peaceful Nights", rotate: "2deg" },
  ];

  const [flipped, setFlipped] = useState(Array(artworks.length).fill(false));

  const handleFlip = (index) => {
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  return (
    <main className="min-h-screen bg-background py-20 px-6 flex flex-col items-center overflow-x-hidden">
      {/* Intro */}
      <section className="max-w-5xl text-center animate-slide-down mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
          Beyond Work & School 🎨
        </h1>
        <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl mx-auto">
          Outside my analytical and technical work, I find calm in painting and sketching. 
          Art helps me express balance — between precision and creativity — whether 
          it’s a peaceful landscape, spiritual symbolism, or a visual rhythm inspired by music. 
          These moments remind me to slow down and create for the sake of creating.
        </p>
      </section>

      {/* Whimsical Flow Layout with Flip Images */}
      <div className="flex flex-wrap justify-center gap-10 sm:gap-14 md:gap-20 w-full px-4 sm:px-8">
        {artworks.map((art, idx) => (
          <div
            key={idx}
            onClick={() => handleFlip(idx)}
            className="relative cursor-pointer [perspective:1000px]"
            style={{ rotate: art.rotate }}
          >
            <div
              className={`relative transition-transform duration-700 [transform-style:preserve-3d] ${
                flipped[idx] ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front (painting) */}
              <div className="relative [backface-visibility:hidden]">
                <Image
                  src={art.front}
                  alt={art.alt}
                  className="w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] h-auto object-contain rounded-sm"
                  placeholder="blur"
                />
              </div>

              {/* Back (reversed painting) */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <Image
                  src={art.back}
                  alt={`${art.alt} - back`}
                  className="w-full h-auto object-contain rounded-sm"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Button */}
      <Link
        href="https://instagram.com/anjanie.arts"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-24 inline-flex items-center gap-2 bg-jordyblue text-white font-medium px-6 py-3 rounded-full shadow hover:bg-skyblue transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.6.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.6.4 1.4.5 2.6.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.6-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.6.2-1.4.4-2.6.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.6-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.6-.4-1.4-.5-2.6C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.6.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.6-.2 1.4-.4 2.6-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0.1 5.6 0.2 4.6 0.4 3.8.7c-.9.3-1.6.7-2.3 1.3C.9 2.7.4 3.4.1 4.3c-.3.8-.5 1.8-.6 3.2C-.5 8.8-.5 9.2-.5 12s0 3.2.1 4.5c.1 1.4.3 2.4.6 3.2.3.9.7 1.6 1.3 2.3.7.6 1.4 1 2.3 1.3.8.3 1.8.5 3.2.6 1.3.1 1.7.1 4.5.1s3.2 0 4.5-.1c1.4-.1 2.4-.3 3.2-.6.9-.3 1.6-.7 2.3-1.3.6-.7 1-1.4 1.3-2.3.3-.8.5-1.8.6-3.2.1-1.3.1-1.7.1-4.5s0-3.2-.1-4.5c-.1-1.4-.3-2.4-.6-3.2-.3-.9-.7-1.6-1.3-2.3-.7-.6-1.4-1-2.3-1.3C19.4.4 18.4.2 17 .1 15.7 0 15.3 0 12 0z" />
          <path d="M12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.3a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2zM18.4 4.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
        </svg>
        Follow on Instagram
      </Link>
    </main>
  );
}
