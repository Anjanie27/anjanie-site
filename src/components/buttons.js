import React from "react";
import clsx from "clsx";

export function Button({
  title,
  onClick,
  color = "foreground",
  hoverColor = "jordyblue",
  backgroundColor = "transparent",
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-full border-2 px-8 sm:px-10 py-3 text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 ease-in-out cursor-pointer",
        `text-${color} border-${color}`,
        backgroundColor === "transparent"
          ? "bg-transparent hover:bg-[var(--jordyblue)] hover:text-white"
          : `bg-${backgroundColor} hover:opacity-90`
      )}
    >
      {title}
    </button>
  );
}

