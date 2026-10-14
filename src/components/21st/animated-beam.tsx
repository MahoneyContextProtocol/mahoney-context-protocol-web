"use client";

import React, { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  pathColor = "rgba(255,255,255,0.16)",
  pathWidth = 1.75,
  pathOpacity = 0.25,
  gradientStartColor = "#10b981",
  gradientStopColor = "#06b6d4",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [gradientCoords, setGradientCoords] = useState({
    x1: "0px",
    y1: "0px",
    x2: "100px",
    y2: "0px",
  });

  const updatePath = useCallback(() => {
    if (containerRef.current && fromRef.current && toRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });

      const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;
      const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
      setPathD(d);

      setGradientCoords({
        x1: `${startX}px`,
        y1: `${startY}px`,
        x2: `${endX}px`,
        y2: `${endY}px`,
      });
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  useEffect(() => {
    updatePath();
    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", updatePath);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [updatePath, containerRef]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={gradientCoords.x1}
          y1={gradientCoords.y1}
          x2={gradientCoords.x2}
          y2={gradientCoords.y2}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0.1" />
          <stop offset="35%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="70%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />

      {pathD && (
        <path
          d={pathD}
          stroke={`url(#${id})`}
          strokeWidth={pathWidth * 1.6}
          strokeLinecap="round"
          strokeDasharray="48 152"
          style={{ "--beam-duration": `${duration}s` } as React.CSSProperties}
          className={reverse ? "animate-beam-flow-reverse" : "animate-beam-flow"}
        />
      )}
    </svg>
  );
}
