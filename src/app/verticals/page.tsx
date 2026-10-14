"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  ShieldCheck,
  Play,
  Lock,
  CheckCircle2,
  ExternalLink,
  Search,
  Network,
  ArrowRight,
} from "lucide-react";
import {
  REGULATED_VERTICALS,
  BUSINESS_JOURNEY_PACKS,
  DISPATCH_VENTURES_CATALOG,
  executeVerticalOrJourneyTool,
  type VerticalId,
  type VerticalSuiteId,
  type ToolExecutionResult,
} from "@/lib/verticals-catalog";
import {
  BentoGrid,
  BentoCard,
  ShimmerButton,
  TerminalWindow,
  NumberTicker,
} from "@/components/21st";

const SUITE_TABS: Array<{ id: VerticalSuiteId | "all"; label: string }> = [
  { id: "all", label: "All 23 Verticals (184 Tools)" },
  { id: "core-regulated", label: "Core Regulated (5)" },
  { id: "healthcare-life-sciences", label: "Healthcare & Life Sciences (5)" },
  { id: "banking-capital-markets-enterprise", label: "Banking & Capital Markets (5)" },
  { id: "crypto-quant-institutional", label: "Crypto / Quant / RWA (4)" },
  { id: "high-revenue-niche", label: "High-Revenue Niche (4)" },
];

export default function VerticalsMarketplacePage() {
  const [suiteFilter, setSuiteFilter] = useState<VerticalSuiteId | "all">("all");
  const [selectedVerticalId, setSelectedVerticalId] = useState<VerticalId>("event-planning");
  const [searchQuery, setSearchQuery] = useState("");
  const [executionResult, setExecutionResult] = useState<ToolExecutionResult>(() =>
    executeVerticalOrJourneyTool(
      "check-venue-availability",
      REGULATED_VERTICALS[0].tools[0].sampleInput,
      "execute"
    )
  );

  const visibleVerticals = REGULATED_VERTICALS.filter((v) => {
    const matchesSuite = suiteFilter === "all" || v.suite === suiteFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.regulations.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.tools.some((t) => t.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSuite && matchesSearch;
  });

  const activeVertical =
    REGULATED_VERTICALS.find((v) => v.id === selectedVerticalId) ||
    visibleVerticals[0] ||
    REGULATED_VERTICALS[0];

  const handleInvokeTool = (
    toolId: string,
    sampleInput: Record<string, unknown>,
    mode: "prepare" | "confirm" | "execute"
  ) => {
    const res = executeVerticalOrJourneyTool(toolId, sampleInput, mode);
    setExecutionResult(res);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Metrics */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                <Boxes className="h-4 w-4" />
                <span>Layer 2 Commercial Catalog · 23 Regulated Verticals · 184 WebMCP Tools</span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
                Regulated Verticals, 7 Journey Packs & Sister Dispatch Ventures
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl">
                Every vertical plugin ships 8 deterministic WebMCP tools with{" "}
                <code className="font-mono text-emerald-300">prepare → confirm</code>{" "}
                safety gates, statutory citations, and SEP-1865 UI cards.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 shrink-0">
              <div className="rounded-xl border border-white/[0.08] bg-[#09090b] px-3.5 py-2.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase">Verticals</div>
                <div className="text-xl font-bold text-zinc-100">
                  <NumberTicker value={23} />
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#09090b] px-3.5 py-2.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase">Tools</div>
                <div className="text-xl font-bold text-emerald-400">
                  <NumberTicker value={184} />
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#09090b] px-3.5 py-2.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase">Ventures</div>
                <div className="text-xl font-bold text-zinc-100">
                  <NumberTicker value={8} />
                </div>
              </div>
            </div>
          </div>

          {/* Suite Filter Tabs + Search */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col md:flex-row gap-3 justify-between">
            <div className="flex flex-wrap gap-1.5">
              {SUITE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSuiteFilter(tab.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                    suiteFilter === tab.id
                      ? "bg-emerald-500 text-zinc-950 font-semibold"
                      : "border border-white/[0.08] bg-[#09090b] text-zinc-300 hover:border-white/[0.16]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by vertical, statute, or tool..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] pl-8 pr-3 py-1.5 font-mono text-xs text-zinc-100 placeholder-zinc-600 focus:border-emerald-500/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Main Explorer Grid: Left 23 Verticals List, Right Active Vertical's 8 Tools + Live Tester */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Vertical Selector */}
          <div className="lg:col-span-4 space-y-2 max-h-[760px] overflow-y-auto pr-1">
            {visibleVerticals.map((v) => {
              const isSelected = v.id === activeVertical.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVerticalId(v.id)}
                  className={`w-full text-left rounded-xl border p-3.5 transition ${
                    isSelected
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-white/[0.08] bg-[#121215] hover:border-white/[0.16]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                      {v.suiteLabel}
                    </span>
                    <span className="rounded border border-white/[0.08] bg-[#09090b] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                      8 Tools
                    </span>
                  </div>
                  <div className="mt-1 font-semibold text-sm text-zinc-100">{v.name}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-zinc-400">
                    {v.packageName}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.regulations.slice(0, 3).map((reg) => (
                      <span
                        key={reg}
                        className="rounded bg-[#09090b] border border-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-zinc-400"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Active Vertical Detail + 8 Tools + Live Terminal */}
          <div className="lg:col-span-8 space-y-6">
            <BentoCard
              badge={`${activeVertical.suiteLabel.toUpperCase()} · ${activeVertical.packageName}`}
              title={`${activeVertical.name} (8 Regulated WebMCP Tools)`}
              subtitle={activeVertical.tagline}
              icon={<ShieldCheck className="h-5 w-5" />}
              beam
            >
              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeVertical.regulations.map((reg) => (
                  <span
                    key={reg}
                    className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300"
                  >
                    {reg}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeVertical.tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="rounded-xl border border-white/[0.08] bg-[#09090b] p-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-zinc-100">
                          {tool.id}
                        </span>
                        {tool.consequentialHint ? (
                          <span className="inline-flex items-center gap-1 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-amber-300">
                            <Lock className="h-2.5 w-2.5" />
                            prepare→confirm
                          </span>
                        ) : (
                          <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300">
                            readOnly
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="mt-2 font-mono text-[10px] text-zinc-500">
                        Guardrail: {tool.complianceBadges.join(" · ")}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center gap-1.5">
                      {tool.consequentialHint ? (
                        <>
                          <button
                            onClick={() =>
                              handleInvokeTool(tool.id, tool.sampleInput, "prepare")
                            }
                            className="flex-1 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-amber-300 hover:bg-amber-500/20 transition"
                          >
                            1. Prepare Gate
                          </button>
                          <button
                            onClick={() =>
                              handleInvokeTool(tool.id, tool.sampleInput, "confirm")
                            }
                            className="flex-1 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/25 transition"
                          >
                            2. Confirm & Commit
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            handleInvokeTool(tool.id, tool.sampleInput, "execute")
                          }
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#121215] px-3 py-1.5 font-mono text-[10px] font-semibold text-emerald-300 hover:border-emerald-500/40 transition"
                        >
                          <Play className="h-3 w-3" />
                          <span>Execute Read-Only Tool</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Live Execution Output & SEP-1865 Card Inspector */}
            <TerminalWindow
              title={`WebMCP Tool Execution — ${executionResult.toolId} (${executionResult.status})`}
              statusBadge={executionResult.uiCard.badge}
              tabs={[
                {
                  id: "output",
                  label: "Structured Output",
                  language: "json",
                  code: JSON.stringify(executionResult, null, 2),
                },
                {
                  id: "ui-card",
                  label: "SEP-1865 UI Resource",
                  language: "json",
                  code: JSON.stringify(executionResult.uiCard, null, 2),
                },
              ]}
            />
          </div>
        </div>

        {/* Sister Business: Dispatch Ventures (8 Multi-Host Agentic Businesses) */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase">
                <Network className="h-4 w-4" />
                <span>Sister Business · github.com/mahoney-context-protocol/dispatch-ventures</span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-zinc-100">
                8 Dispatch Ventures Multi-Host MCP App Businesses
              </h2>
            </div>
            <Link href="/simulator">
              <ShimmerButton variant="emerald" className="px-4 py-2 text-xs">
                <span>Preview in ChatGPT / Claude / Grok / Gemini</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </ShimmerButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DISPATCH_VENTURES_CATALOG.map((venture) => (
              <div
                key={venture.slug}
                className="rounded-xl border border-white/[0.08] bg-[#09090b] p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase">
                    {venture.category}
                  </span>
                  <h3 className="mt-1 font-semibold text-sm text-zinc-100">
                    {venture.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {venture.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-400">{venture.mcpTools[0]}</span>
                  <Link
                    href={`/simulator?venture=${venture.slug}`}
                    className="text-emerald-400 hover:underline"
                  >
                    Launch →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
