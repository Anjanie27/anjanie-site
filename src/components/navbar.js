"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import logo from "../images/Final Logo.png";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "EXPERIENCE", href: "/experience" },
    { label: "BLOG", href: "/blog" },
    { label: "BEYOND WORK", href: "/beyond-work" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[999] px-4 py-3 transition-all duration-300 lg:px-8 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border px-4 py-2 text-foreground backdrop-blur-2xl transition-all duration-300 lg:px-7 ${
          scrolled
            ? "border-white/60 bg-white/72 shadow-xl shadow-slate-500/10"
            : "border-white/40 bg-white/46 shadow-md shadow-slate-500/5"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white/40 p-1.5 shadow-inner shadow-white/70 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 lg:h-16 lg:w-16">
            <Image
              src={logo}
              alt="AS Logo"
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-wide lg:text-xl">
              Anjanie Sukhnandan
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/60 lg:text-xs">
              Financial Analyst
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full bg-white/34 p-1 text-sm font-semibold tracking-wide lg:flex">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={`relative rounded-full px-4 py-2 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-jordyblue to-skyblue text-white shadow-md shadow-jordyblue/20"
                    : "hover:bg-white/70 hover:text-jordyblue"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          className="z-[1001] rounded-full border border-jordyblue/20 bg-white/60 p-3 text-foreground shadow-sm transition-all hover:scale-105 hover:text-jordyblue lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center gap-5 bg-gradient-to-br from-white/96 via-[#eef4ff]/96 to-lavenderblush/96 px-6 text-lg font-bold tracking-wide backdrop-blur-xl lg:hidden animate-slide-down">
          <div className="absolute left-8 top-28 h-32 w-32 rounded-full bg-skyblue/30 blur-2xl animate-float-soft" />
          <div className="absolute bottom-24 right-6 h-40 w-40 rounded-full bg-[#f9a8d4]/30 blur-2xl animate-float-soft" />
          {navItems.map(({ label, href }, index) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`relative z-10 w-full max-w-xs rounded-2xl border px-6 py-4 text-center shadow-sm transition-all duration-300 animate-fade-up ${
                  isActive
                    ? "border-jordyblue/30 bg-gradient-to-r from-jordyblue to-skyblue text-white"
                    : "border-white/70 bg-white/62 text-foreground hover:-translate-y-1 hover:text-jordyblue"
                }`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
