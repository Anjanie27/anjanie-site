"use client";

import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      <Navbar />
      <div className={`${isLanding ? "pt-24 lg:pt-28" : "pt-32"} min-h-screen`}>
        {children}
      </div>
    </>
  );
}
