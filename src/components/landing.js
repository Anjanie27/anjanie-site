"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./buttons";
import { Linkedin } from "lucide-react";
import Link from "next/link";

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
    <section className="relative flex flex-col lg:flex-row h-auto lg:h-screen bg-background overflow-hidden">
      {/* Left Panel */}
      <div className="bg-jordyblue w-full lg:w-[40vw] h-[40vh] lg:h-full flex items-center justify-center text-white text-xl" />

      {/* Photo Card */}
      <div
        style={floatStyle}
        className="relative lg:absolute 
          lg:top-1/2 lg:left-[17%] lg:-translate-y-1/2 
          w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[28vw]
          max-w-[480px] rounded-3xl shadow-2xl
          overflow-hidden border border-foreground/10
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
          Hello!
        </h1>

        <h3 className="text-lg sm:text-xl lg:text-2xl text-foreground/90">
          Welcome to my world! :)
        </h3>

        {/* Resume Button */}
        <div className="flex flex-wrap gap-4">
          <a
            href="/Fall%202025%20Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button title="Resume" />
          </a>
        </div>

        <p className="text-sm sm:text-base lg:text-lg max-w-prose leading-relaxed text-foreground/80">
         My name is Anjanie Sukhnandan, and I’m a Mathematics student at the University of Waterloo, specializing in Business with a minor in Computing. Some may describe me as versatile, while others might say I’m still figuring things out, and in many ways, both are true.

         Like many of my peers, I began my academic journey with a clear path in mind: pursuing Actuarial Science. However, in my third year, I made the decision to pivot after realizing that the actuarial field did not align with my passions. Instead, I found myself drawn to the world of business, particularly trading and investments. There’s something about understanding market trends and how everything moves together that I find really exciting (and yeah, it definitely keeps me up at night sometimes). 
         
         My computing minor, while initially unplanned, has become one of the most valuable parts of my education. It introduced me to a completely different way of thinking, more structured, more analytical, and it’s changed how I approach problems in general.
         Throughout my degree, I have gained experience across financial analysis, business development, case studies, and client services. These roles have taught me how to balance data-driven decision-making with logic, empathy, and collaboration.
         
         Outside of academics and professional work, I find joy in music and art, which allow me to engage my creativity. I am also deeply committed to seva (selfless service), a core principle of my faith in Hinduism. Whether it is a small act like helping someone in need or organizing larger initiatives such as food drives, giving back has always been a meaningful and grounding part of who I am. :)
        </p>
      </div>
    </section>
  );
}
