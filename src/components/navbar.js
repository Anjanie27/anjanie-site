"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/images/Final Logo.png";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "EXPERIENCE", href: "/experience" },
    { label: "BLOG", href: "/blog" },
    { label: "BEYOND WORK", href: "/beyond-work" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 lg:px-12 py-2 backdrop-blur-md bg-background/80 text-foreground shadow-sm">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 lg:w-20 lg:h-20">
          <Image
            src={logo}
            alt="AS Logo"
            fill
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-lg lg:text-xl font-semibold tracking-wide">
            Anjanie Sukhnandan
          </span>
          <span className="text-xs lg:text-sm text-foreground/70 tracking-wider uppercase">
            Financial Analyst
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-10 text-sm font-medium tracking-wide">
        {navItems.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setActive(label)}
            className={`relative cursor-pointer transition-colors duration-200 ${
              active === label
                ? "text-jordyblue after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-jordyblue"
                : "hover:text-jordyblue"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden cursor-pointer text-foreground z-[1001]"
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 h-screen w-screen bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-lg font-medium tracking-wide lg:hidden z-[1000] animate-fade-in"
        >
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => {
                setActive(label);
                setMenuOpen(false);
              }}
              className={`cursor-pointer transition-colors duration-200 ${
                active === label ? "text-jordyblue" : "hover:text-jordyblue"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
