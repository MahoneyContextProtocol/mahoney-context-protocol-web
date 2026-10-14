"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TerminalTab {
  id: string;
  label: string;
  content?: string;
  code?: string;
  language?: string;
  badge?: string;
}

export interface TerminalWindowProps {
  title?: string;
  subtitle?: string;
  statusBadge?: string;
  tabs?: TerminalTab[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  content?: string;
  className?: string;
  maxHeightClassName?: string;
  rightSlot?: React.ReactNode;
  children?: React.ReactNode;
}

export function TerminalWindow({
  title = "mcp-foundation — inspector",
  subtitle,
  statusBadge,
  tabs,
  activeTabId,
  onTabChange,
  content,
  className,
  maxHeightClassName = "max-h-[420px]",
  rightSlot,
  children,
}: TerminalWindowProps) {
  const [internalTabId, setInternalTabId] = useState(tabs?.[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const selectedTabId = activeTabId ?? internalTabId;
  const activeTab = tabs?.find((t) => t.id === selectedTabId) ?? tabs?.[0];
  const displayContent = activeTab
    ? activeTab.content ?? activeTab.code ?? ""
    : content ?? "";
  const resolvedSubtitle = subtitle ?? statusBadge;

  const handleCopy = () => {
    if (!displayContent) return;
    navigator.clipboard.writeText(displayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-[#09090B] overflow-hidden shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_16px_40px_-12px_rgba(0,0,0,0.85)]",
        className
      )}
    >
      {/* macOS / Precision Chrome Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#121215] px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 border border-rose-400/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 border border-amber-400/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="font-mono text-xs font-medium text-zinc-200 truncate">
              {title}
            </span>
            {resolvedSubtitle && (
              <span className="hidden sm:inline-block font-mono text-[10px] text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25">
                {resolvedSubtitle}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tabs && tabs.length > 0 && (
            <div className="flex items-center gap-1 rounded-lg bg-black/50 p-0.5 border border-white/[0.06]">
              {tabs.map((tab) => {
                const isSelected = tab.id === (activeTab?.id ?? "");
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setInternalTabId(tab.id);
                      onTabChange?.(tab.id);
                    }}
                    className={cn(
                      "rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors flex items-center gap-1.5",
                      isSelected
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="text-[9px] px-1 rounded bg-white/[0.06] text-zinc-300">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {rightSlot}

          {displayContent && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      {children ? (
        <div className={cn("overflow-auto p-4 font-mono text-xs", maxHeightClassName)}>
          {children}
        </div>
      ) : (
        <pre
          className={cn(
            "overflow-auto p-4 font-mono text-xs leading-relaxed text-zinc-200 selection:bg-emerald-500/20 selection:text-emerald-200",
            maxHeightClassName
          )}
        >
          <code>{displayContent}</code>
        </pre>
      )}
    </div>
  );
}
