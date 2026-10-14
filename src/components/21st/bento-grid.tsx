"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "./border-beam";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  href?: string;
  colSpan?: 1 | 2 | 3;
  hasPersistentHover?: boolean;
  accentColor?: string;
  children?: React.ReactNode;
}

export interface BentoCardProps {
  title?: string;
  description?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: string;
  badge?: string;
  meta?: string;
  tags?: string[];
  cta?: string;
  colSpan?: 1 | 2 | 3;
  hasPersistentHover?: boolean;
  beam?: boolean;
  spotlightColor?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function BentoCard({
  title,
  description,
  subtitle,
  icon,
  status,
  badge,
  meta,
  tags,
  cta,
  colSpan = 1,
  hasPersistentHover = false,
  beam = false,
  spotlightColor = "rgba(16, 185, 129, 0.14)",
  className,
  children,
  onClick,
}: BentoCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(hasPersistentHover ? 1 : 0);

  const resolvedStatus = status ?? badge;
  const resolvedDescription = description ?? subtitle;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(hasPersistentHover ? 1 : 0)}
      onClick={onClick}
      style={
        {
          "--mouse-x": `${position.x}px`,
          "--mouse-y": `${position.y}px`,
        } as React.CSSProperties
      }
      className={cn(
        "group relative rounded-2xl overflow-hidden transition-all duration-300",
        "border border-white/[0.08] bg-[#121215]/95 backdrop-blur-xl",
        "hover:border-white/[0.18] hover:-translate-y-0.5 will-change-transform",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_12px_32px_-12px_rgba(0,0,0,0.7)]",
        colSpan === 2 ? "md:col-span-2" : colSpan === 3 ? "md:col-span-3" : "col-span-1",
        onClick ? "cursor-pointer" : "",
        className
      )}
    >
      {beam && <BorderBeam size={240} duration={10} />}

      {/* 21st.dev Mouse-Tracking Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(480px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 45%)`,
        }}
      />

      {/* Precision Micro-Dot Pattern Overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-300 bg-dots-white",
          hasPersistentHover ? "opacity-40" : "opacity-0 group-hover:opacity-40"
        )}
      />

      <div className="relative z-10 p-5 flex flex-col h-full justify-between gap-4">
        {(icon || resolvedStatus || title || resolvedDescription) && (
          <div className="space-y-3">
            {(icon || resolvedStatus) && (
              <div className="flex items-center justify-between gap-2">
                {icon && (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.04] text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                    {icon}
                  </div>
                )}
                {resolvedStatus && (
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                    {resolvedStatus}
                  </span>
                )}
              </div>
            )}

            {(title || resolvedDescription) && (
              <div className="space-y-1.5">
                {title && (
                  <h3 className="font-semibold text-zinc-100 tracking-tight text-base flex items-center gap-2 flex-wrap">
                    <span>{title}</span>
                    {meta && (
                      <span className="font-mono text-[11px] text-zinc-400 font-normal px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                        {meta}
                      </span>
                    )}
                  </h3>
                )}
                {resolvedDescription && (
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {resolvedDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {children && <div className="relative z-10">{children}</div>}

        {(tags && tags.length > 0) || cta ? (
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.05]">
            <div className="flex flex-wrap items-center gap-1.5">
              {tags?.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-400 group-hover:text-zinc-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            {cta && (
              <span className="font-mono text-[11px] text-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
                {cta}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function BentoGrid({
  items,
  children,
  className,
}: {
  items?: BentoItem[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {items?.map((item, idx) => (
        <BentoCard
          key={idx}
          title={item.title}
          description={item.description}
          icon={item.icon}
          status={item.status}
          meta={item.meta}
          tags={item.tags}
          cta={item.cta}
          colSpan={item.colSpan}
          hasPersistentHover={item.hasPersistentHover}
          spotlightColor={item.accentColor}
        >
          {item.children}
        </BentoCard>
      ))}
      {children}
    </div>
  );
}
