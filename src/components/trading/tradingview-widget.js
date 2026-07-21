"use client";

import { useEffect, useMemo, useRef } from "react";

export function TradingViewWidget({
  scriptSrc,
  config,
  className = "h-full w-full",
  ariaLabel = "TradingView market widget",
}) {
  const containerRef = useRef(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    container.replaceChildren();

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget h-full w-full";

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = configString;

    container.appendChild(widget);
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, [configString, scriptSrc]);

  return (
    <div
      ref={containerRef}
      className={`tradingview-widget-container ${className}`}
      aria-label={ariaLabel}
    />
  );
}
