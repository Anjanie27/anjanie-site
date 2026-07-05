import React from "react";
import clsx from "clsx";

export function Button({
  title,
  onClick,
  variant = "primary",
  className = "",
}) {
  const styles = {
    primary:
      "border-transparent bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4] text-white shadow-lg shadow-jordyblue/25 hover:shadow-xl hover:shadow-jordyblue/35",
    outline:
      "border-jordyblue/40 bg-white/40 text-foreground backdrop-blur-md hover:border-jordyblue hover:bg-white/70 hover:text-jordyblue",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative overflow-hidden rounded-full border-2 px-8 py-3 text-base font-semibold tracking-wide transition-all duration-300 ease-out hover:-translate-y-1 active:translate-y-0 sm:px-10 sm:text-lg",
        styles[variant],
        className,
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {title}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}
