"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/buttons";
import { Linkedin } from "lucide-react";

export function Landing() {
  const [scrollY, setScrollY] = useState(0);

  // 🎢 subtle floating animation on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // calculate transform for smooth float effect
  const translateY = Math.min(scrollY * 0.15, 30); // caps at ~30px
  const floatStyle = {
    transform: `translateY(-${translateY}px)`,
    transition: "transform 0.2s ease-out",
  };

  return (
    <section className="relative flex flex-col lg:flex-row h-auto lg:h-screen bg-background overflow-hidden">
      {/* Left Panel */}
      <div className="bg-jordyblue w-full lg:w-[40vw] h-[40vh] lg:h-full flex items-center justify-center text-white text-xl" />

      {/* Photo Card */}
      <div
        style={floatStyle}
        className="
          relative lg:absolute 
          lg:top-1/2 lg:left-[17%] lg:-translate-y-1/2 
          w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[28vw]
          max-w-[480px] rounded-3xl shadow-2xl
          bg-0 overflow-hidden border border-foreground/10
          mx-auto -mt-[20vh] lg:mt-0 z-50"
      >
        {/* Profile Image */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[50vh]">
          <Image
            src="/images/profile.png"
            alt="Profile photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* LinkedIn Button */}
        <div className="flex justify-center py-4 bg-blue-200 backdrop-blur-md border-t border-foreground/10">
          <a
            href="https://www.linkedin.com/in/anjanie-s/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0077B5] text-white font-medium px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            <Linkedin size={22} />
            Connect with me on LinkedIn
          </a>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-start gap-6 px-8 sm:px-12 lg:px-[10vw] py-16 lg:py-0 w-full lg:w-[60vw] text-foreground relative z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
          Hello
        </h1>

        <h3 className="text-lg sm:text-xl lg:text-2xl text-foreground/90">
          I'm <span className="font-semibold">Anjanie Sukhnandan</span>, and this is who I am :)
        </h3>

        <div className="flex flex-wrap gap-4">
          <Button title="Resume" />
          <Button title="Projects" />
        </div>

        <p className="text-sm sm:text-base lg:text-lg max-w-prose leading-relaxed text-foreground/80">
          Green grapes with more green grapes and some more green grapes — and if
          you really love me, then I will get green grapes. Do you know that I
          like green grapes? That’s what I’m all about — green grapes!
        </p>
      </div>
    </section>
  );
}
