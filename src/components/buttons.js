import React from "react";
import clsx from "clsx";

export function Button({
  title,
  onClick,
  color = "foreground",
  hoverColor = "lavenderblush",
  backgroundColor = "transparent",
}) {
  return (
    <button
      onClick={onClick}
      data-hover={hoverColor}
      className={clsx(
        "rounded-full px-10 py-3 font-semibold text-base border-2 transition-all duration-200 ease-in-out cursor-pointer",
        `text-${color} border-${color}`,
        backgroundColor === "transparent"
          ? "bg-transparent"
          : `bg-${backgroundColor}`
      )}
      style={{
        "--hover-bg": `var(--${hoverColor})`,
      }}
    >
      {title}
    </button>
  );
}
