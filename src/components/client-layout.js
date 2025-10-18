"use client";

import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      <Navbar />
      <div className={`${isLanding ? "" : "pt-32"} h-full`}>
        {children}
      </div>
    </>
  );
}
