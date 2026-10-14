"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  className,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  durationMs = 850,
}: {
  value: number;
  className?: string;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = 0;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startVal + (value - startVal) * eased);
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [value, durationMs]);

  const formatted = Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(display.toFixed(decimalPlaces)));

  return (
    <span className={cn("inline-block tabular-nums tracking-tight", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
