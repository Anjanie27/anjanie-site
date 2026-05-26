"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./buttons";
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
  const translateY = Math.min(scrollY * 0.15, 30);
  const floatStyle = {
    transform: `translateY(-${translateY}px)`,
    transition: "transform 0.2s ease-out",
  };

  return (
    <section className="relative min-h-screen bg-background overflow-x-hidden px-6 pb-16 pt-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Photo + LinkedIn Card */}
        <div
          style={floatStyle}
          className="w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[28vw] max-w-[480px] rounded-3xl border border-foreground/10 shadow-2xl overflow-hidden"
        >
          <div className="relative h-[320px] w-full sm:h-[400px] lg:h-[50vh]">
            <Image
              src="/images/profile.png"
              alt="Profile photo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex justify-center border-t border-foreground/10 bg-blue-200 py-4 backdrop-blur-md">
            <a
              href="https://www.linkedin.com/in/anjanie-s/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#0077B5] px-6 py-3 font-medium text-white shadow-md transition-transform hover:scale-105"
            >
              <Linkedin size={22} />
              Connect with me on LinkedIn
            </a>
          </div>
        </div>

        {/* Intro Block */}
        <div className="flex flex-col items-center gap-6 text-center text-foreground lg:items-start lg:text-left">
          <h1 className="text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl">
            Hello!
          </h1>
          <h3 className="text-lg text-foreground/90 sm:text-xl lg:text-2xl">
            Welcome to my world! :)
          </h3>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="/Fall%202025%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button title="Resume" />
            </a>
          </div>
        </div>
      </div>

      {/* Centered Multi-Paragraph Bio */}
      <div className="mx-auto mt-12 w-full max-w-4xl text-center text-foreground/80">
        <div className="space-y-6 text-sm leading-relaxed sm:text-base lg:text-lg">
          <p>
            My name is Anjanie Sukhnandan, and I’m a Mathematics student at the
            University of Waterloo, specializing in Business with a minor in
            Computing. Some may describe me as versatile, while others might
            say I’m still figuring things out, and in many ways, both are true.
          </p>
          <p>
            Like many of my peers, I began my academic journey with a clear
            path in mind: pursuing Actuarial Science. However, in my third
            year, I made the decision to pivot after realizing that the
            actuarial field did not align with my passions. Instead, I found
            myself drawn to the world of business, particularly trading and
            investments. There’s something about understanding market trends and
            how everything moves together that I find really exciting (and
            yeah, it definitely keeps me up at night sometimes).
          </p>
          <p>
            My computing minor, while initially unplanned, has become one of
            the most valuable parts of my education. It introduced me to a
            completely different way of thinking, more structured, more
            analytical, and it’s changed how I approach problems in general.
            Throughout my degree, I have gained experience across financial
            analysis, business development, case studies, and client services.
            These roles have taught me how to balance data-driven
            decision-making with logic, empathy, and collaboration.
          </p>
          <p>
            Outside of academics and professional work, I find joy in music and
            art, which allow me to engage my creativity. I am also deeply
            committed to seva (selfless service), a core principle of my faith
            in Hinduism. Whether it is a small act like helping someone in need
            or organizing larger initiatives such as food drives, giving back
            has always been a meaningful and grounding part of who I am.
          </p>
        </div>
      </div>
    </section>
  );
}
