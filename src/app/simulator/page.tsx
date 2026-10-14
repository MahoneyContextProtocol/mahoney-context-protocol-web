"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  TerminalSquare,
  Play,
  ShieldAlert,
  CheckCircle2,
  Layers,
  Lock,
} from "lucide-react";
import {
  REGULATED_VERTICALS,
  DISPATCH_VENTURES_CATALOG,
  MULTI_HOST_CLIENTS,
  A2A_SIX_PHASES,
  executeVerticalOrJourneyTool,
  type HostClientId,
  type VentureSlug,
  type VerticalId,
  type ToolExecutionResult,
} from "@/lib/verticals-catalog";
import {
  BentoCard,
  AnimatedBeam,
  ShimmerButton,
  TerminalWindow,
} from "@/components/21st";

function SimulatorContent() {
  const searchParams = useSearchParams();
  const initialVenture =
    (searchParams.get("venture") as VentureSlug) || "boston-gutter-dispatch";

  const [selectedHost, setSelectedHost] = useState<HostClientId>("claude");
  const [selectedSourceMode, setSelectedSourceMode] = useState<"verticals" | "dispatch">(
    searchParams.get("venture") ? "dispatch" : "verticals"
  );
  const [selectedVerticalId, setSelectedVerticalId] = useState<VerticalId>(
    "healthcare-clinical-trials"
  );
  const [selectedToolId, setSelectedToolId] = useState<string>(
    REGULATED_VERTICALS.find((v) => v.id === "healthcare-clinical-trials")?.tools[0]?.id ||
      "check-venue-availability"
  );
  const [selectedVentureSlug, setSelectedVentureSlug] =
    useState<VentureSlug>(initialVenture);
  const [activePhase, setActivePhase] = useState<number>(4);

  const activeVertical =
    REGULATED_VERTICALS.find((v) => v.id === selectedVerticalId) || REGULATED_VERTICALS[0];
  const activeTool =
    activeVertical.tools.find((t) => t.id === selectedToolId) || activeVertical.tools[0];
  const activeVenture =
    DISPATCH_VENTURES_CATALOG.find((d) => d.slug === selectedVentureSlug) ||
    DISPATCH_VENTURES_CATALOG[0];
  const activeHostSpec =
    MULTI_HOST_CLIENTS.find((h) => h.id === selectedHost) || MULTI_HOST_CLIENTS[0];

  const [execution, setExecution] = useState<ToolExecutionResult>(() =>
    executeVerticalOrJourneyTool(
      activeTool.id,
      activeTool.sampleInput,
      "prepare"
    )
  );

  // Refs for AnimatedBeam
  const simContainerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleSelectVertical = (vId: VerticalId) => {
    setSelectedVerticalId(vId);
    const found = REGULATED_VERTICALS.find((v) => v.id === vId);
    if (found && found.tools[0]) {
      const first = found.tools[0];
      setSelectedToolId(first.id);
      const mode = first.consequentialHint ? "prepare" : "execute";
      setExecution(executeVerticalOrJourneyTool(first.id, first.sampleInput, mode));
      setActivePhase(first.consequentialHint ? 4 : 6);
    }
  };

  const handleRunSimulation = (mode: "prepare" | "confirm" | "execute") => {
    if (selectedSourceMode === "dispatch") {
      const primaryTool = activeVenture.mcpTools[0];
      const res = executeVerticalOrJourneyTool(
        primaryTool,
        { venture: activeVenture.slug, host: selectedHost, region: activeVenture.primaryRegion },
        mode
      );
      setExecution({
        ...res,
        verticalId: activeVenture.slug,
        uiCard: {
          ...res.uiCard,
          uri: activeVenture.uiResourceUri,
          title: `${activeVenture.name} — ${activeHostSpec.name} MCP App`,
          badge:
            mode === "prepare"
              ? "AWAITING HUMAN APPROVAL"
              : mode === "confirm"
                ? "CONFIRMED & SETTLED"
                : "LIVE MULTI-HOST APP",
          metrics: [
            {
              label: "Price Band",
              value: `$${activeVenture.basePriceRangeUsd[0]}–$${activeVenture.basePriceRangeUsd[1]}`,
              tone: "emerald",
            },
            {
              label: "Operating Model",
              value: activeVenture.operatingModel,
              tone: "cyan",
            },
            {
              label: "Primary Region",
              value: activeVenture.primaryRegion,
              tone: "indigo",
            },
            {
              label: "Settlement Rails",
              value: activeVenture.settlementRails.join(" / ").toUpperCase(),
              tone: "amber",
            },
          ],
        },
      });
      setActivePhase(mode === "prepare" ? 4 : 6);
    } else {
      const res = executeVerticalOrJourneyTool(
        activeTool.id,
        activeTool.sampleInput,
        mode
      );
      setExecution(res);
      setActivePhase(mode === "prepare" ? 4 : 6);
    }
  };

  const agUiEventStream = [
    {
      type: "RUN_STARTED",
      protocol: "AG-UI/1.0",
      hostClient: activeHostSpec.name,
      bridge: activeHostSpec.bridgeGlobal,
    },
    {
      type: "A2A_PHASE_TRANSITION",
      phase: activePhase,
      phaseName: A2A_SIX_PHASES[activePhase - 1]?.name,
      targetDid:
        selectedSourceMode === "dispatch"
          ? `did:web:mahoneycontextprotocol.com:ventures:${activeVenture.slug}`
          : `did:web:mahoneycontextprotocol.com:verticals:${activeVertical.id}`,
    },
    {
      type:
        execution.status === "confirmation_required"
          ? "INTERRUPT_CONFIRMATION_REQUIRED"
          : "TOOL_CALL_END",
      toolId: execution.toolId,
      status: execution.status,
      uiResourceUri: execution.uiCard.uri,
    },
    {
      type: "UI_RESOURCE_RENDER",
      mimeType: "text/html;profile=mcp-app",
      uri: execution.uiCard.uri,
      hostContainer: activeHostSpec.sandboxPolicy,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar: Multi-Host Switcher & 6-Phase A2A Pipeline */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                <TerminalSquare className="h-4 w-4" />
                <span>SEP-1865 In-Thread Multi-Host MCP Apps & 6-Phase A2A Simulator</span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
                Preview Regulated Verticals & Dispatch Ventures Inside Every AI Host
              </h1>
            </div>

            {/* Host Switcher: ChatGPT, Claude, Grok, Gemini */}
            <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/[0.08] bg-[#09090b] p-1.5">
              {MULTI_HOST_CLIENTS.map((host) => (
                <button
                  key={host.id}
                  onClick={() => setSelectedHost(host.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                    selectedHost === host.id
                      ? "bg-emerald-500 text-zinc-950 font-semibold"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {host.name}
                </button>
              ))}
            </div>
          </div>

          {/* 6-Phase A2A Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {A2A_SIX_PHASES.map((p) => {
              const isReached = p.phase <= activePhase;
              const isCurrent = p.phase === activePhase;
              return (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(p.phase)}
                  className={`rounded-xl border p-2.5 text-left transition ${
                    isCurrent
                      ? "border-emerald-500/60 bg-emerald-500/15"
                      : isReached
                        ? "border-emerald-500/25 bg-[#09090b]"
                        : "border-white/[0.06] bg-[#09090b] opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-emerald-400 font-bold">PHASE 0{p.phase}</span>
                    {isReached && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  </div>
                  <div className="mt-1 font-semibold text-xs text-zinc-100">{p.name}</div>
                  <div className="mt-0.5 font-mono text-[9px] text-zinc-400 truncate">
                    {p.protocol}
                  </div>
                </button>
              );
            })}
          </div>

          {/* AnimatedBeam Live Bridge */}
          <div
            ref={simContainerRef}
            className="relative rounded-xl border border-white/[0.06] bg-[#09090b] p-4"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div
                ref={hostRef}
                className="rounded-lg border border-white/[0.1] bg-[#121215] px-4 py-2.5 font-mono text-xs"
              >
                <div className="text-emerald-400 font-semibold">{activeHostSpec.name}</div>
                <div className="text-[10px] text-zinc-400">{activeHostSpec.bridgeGlobal}</div>
              </div>
              <div
                ref={gateRef}
                className="rounded-lg border border-emerald-500/40 bg-[#121215] px-4 py-2.5 font-mono text-xs text-center"
              >
                <div className="text-zinc-100 font-semibold">
                  Phase {activePhase}: {A2A_SIX_PHASES[activePhase - 1]?.name}
                </div>
                <div className="text-[10px] text-emerald-400">
                  {execution.status === "confirmation_required"
                    ? "prepare → confirm Gate Active"
                    : "Verified & Signed"}
                </div>
              </div>
              <div
                ref={targetRef}
                className="rounded-lg border border-white/[0.1] bg-[#121215] px-4 py-2.5 font-mono text-xs text-right"
              >
                <div className="text-zinc-100 font-semibold">
                  {selectedSourceMode === "dispatch"
                    ? activeVenture.name
                    : activeVertical.name}
                </div>
                <div className="text-[10px] text-zinc-400">{execution.uiCard.uri}</div>
              </div>
            </div>
            <AnimatedBeam
              containerRef={simContainerRef}
              fromRef={hostRef}
              toRef={gateRef}
            />
            <AnimatedBeam
              containerRef={simContainerRef}
              fromRef={gateRef}
              toRef={targetRef}
            />
          </div>
        </div>

        {/* Split-Screen Simulator */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Tool / Venture Selector + AG-UI Stream */}
          <div className="lg:col-span-5 space-y-5">
            <BentoCard
              badge="SOURCE SELECTOR"
              title="Choose 23 Regulated Verticals or 8 Dispatch Ventures"
              icon={<Layers className="h-5 w-5" />}
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setSelectedSourceMode("verticals")}
                  className={`rounded-xl border py-2 font-mono text-xs font-semibold transition ${
                    selectedSourceMode === "verticals"
                      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                      : "border-white/[0.08] bg-[#09090b] text-zinc-400"
                  }`}
                >
                  23 Regulated Verticals
                </button>
                <button
                  onClick={() => setSelectedSourceMode("dispatch")}
                  className={`rounded-xl border py-2 font-mono text-xs font-semibold transition ${
                    selectedSourceMode === "dispatch"
                      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                      : "border-white/[0.08] bg-[#09090b] text-zinc-400"
                  }`}
                >
                  8 Dispatch Ventures
                </button>
              </div>

              {selectedSourceMode === "verticals" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                      Regulated Industry Vertical (23 Total)
                    </label>
                    <select
                      value={selectedVerticalId}
                      onChange={(e) => handleSelectVertical(e.target.value as VerticalId)}
                      className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] px-3 py-2 font-mono text-xs text-zinc-100"
                    >
                      {REGULATED_VERTICALS.map((v) => (
                        <option key={v.id} value={v.id}>
                          [{v.suiteLabel}] {v.name} ({v.packageName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                      WebMCP Tool (8 Per Vertical)
                    </label>
                    <select
                      value={selectedToolId}
                      onChange={(e) => {
                        const tId = e.target.value;
                        setSelectedToolId(tId);
                        const found = activeVertical.tools.find((t) => t.id === tId);
                        if (found) {
                          setExecution(
                            executeVerticalOrJourneyTool(
                              found.id,
                              found.sampleInput,
                              found.consequentialHint ? "prepare" : "execute"
                            )
                          );
                        }
                      }}
                      className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] px-3 py-2 font-mono text-xs text-zinc-100"
                    >
                      {activeVertical.tools.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.id} ({t.consequentialHint ? "prepare->confirm" : "readOnly"})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                    Sister Business: Dispatch Ventures (8 Multi-Host Lanes)
                  </label>
                  <select
                    value={selectedVentureSlug}
                    onChange={(e) => {
                      const slug = e.target.value as VentureSlug;
                      setSelectedVentureSlug(slug);
                    }}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] px-3 py-2 font-mono text-xs text-zinc-100"
                  >
                    {DISPATCH_VENTURES_CATALOG.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name} — {d.category} (${d.basePriceRangeUsd[0]}–${d.basePriceRangeUsd[1]})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                <ShimmerButton
                  variant="zinc"
                  onClick={() => handleRunSimulation("prepare")}
                  className="flex-1 py-2 text-xs"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-400" />
                  <span>1. Prepare (Gate)</span>
                </ShimmerButton>
                <ShimmerButton
                  variant="emerald"
                  onClick={() => handleRunSimulation("confirm")}
                  className="flex-1 py-2 text-xs"
                >
                  <Play className="h-3.5 w-3.5 text-emerald-400" />
                  <span>2. Confirm & Settle</span>
                </ShimmerButton>
              </div>
            </BentoCard>

            <TerminalWindow
              title="AG-UI + 6-Phase A2A Event Stream"
              statusBadge="SSE LIVE"
              tabs={[
                {
                  id: "ag-ui",
                  label: "AG-UI Events",
                  language: "json",
                  code: JSON.stringify(agUiEventStream, null, 2),
                },
                {
                  id: "payload",
                  label: "Result Payload",
                  language: "json",
                  code: JSON.stringify(execution.output, null, 2),
                },
              ]}
            />
          </div>

          {/* Right Column: In-Thread Multi-Host Sandboxed SEP-1865 MCP App Previewer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.1] bg-[#121215] overflow-hidden shadow-2xl">
              {/* Host Window Top Chrome */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#09090b] px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-100">
                    {activeHostSpec.name} In-Thread MCP App Host
                  </span>
                  <span className="rounded border border-white/[0.08] bg-[#121215] px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                    {activeHostSpec.badge}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  {activeHostSpec.protocolProfile}
                </span>
              </div>

              {/* Simulated Chat Thread + Embedded SEP-1865 UI Card */}
              <div className="p-6 space-y-5 bg-dots-white">
                {/* User Prompt Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-md rounded-2xl border border-white/[0.08] bg-[#09090b] px-4 py-3 text-xs text-zinc-200">
                    <div className="font-mono text-[10px] text-zinc-500 mb-1">
                      Authenticated Principal · {activeHostSpec.name}
                    </div>
                    Run{" "}
                    <code className="font-mono text-emerald-300">
                      {selectedSourceMode === "dispatch"
                        ? activeVenture.mcpTools[0]
                        : activeTool.id}
                    </code>{" "}
                    via Mahoney Context Protocol A2A and render the interactive compliance
                    card in-thread.
                  </div>
                </div>

                {/* Sandboxed SEP-1865 ui:// Card */}
                <div className="rounded-2xl border border-emerald-500/30 bg-[#09090b]/95 p-5 shadow-2xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                    <div>
                      <div className="font-mono text-[10px] text-emerald-400">
                        {execution.uiCard.uri} · {execution.uiCard.mimeType}
                      </div>
                      <h3 className="text-base font-bold text-zinc-100 mt-0.5">
                        {execution.uiCard.title}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {activeHostSpec.sandboxPolicy}
                      </p>
                    </div>
                    <span
                      className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold ${
                        execution.status === "confirmation_required"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                          : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      }`}
                    >
                      {execution.uiCard.badge}
                    </span>
                  </div>

                  {/* Card Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {execution.uiCard.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-white/[0.06] bg-[#121215] p-3"
                      >
                        <div className="font-mono text-[10px] text-zinc-500 uppercase">
                          {m.label}
                        </div>
                        <div className="mt-1 font-mono text-xs font-bold text-zinc-100 truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regulatory Guardrails */}
                  <div className="rounded-xl border border-white/[0.06] bg-[#121215] p-3.5 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] uppercase text-emerald-400">
                        Statutory & Cryptographic Attestation
                      </div>
                      <div className="mt-1 text-xs text-zinc-300">
                        {execution.complianceDisclaimers.join(" · ")}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 shrink-0">
                      Bridge: {activeHostSpec.badge}
                    </span>
                  </div>

                  {/* Human-in-the-Loop Action Bar */}
                  {execution.status === "confirmation_required" ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5">
                      <div className="flex items-center gap-2 text-xs text-amber-200">
                        <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>
                          Consequential action paused at Phase 4 Safety Gate. Approve to
                          release AP2 mandate.
                        </span>
                      </div>
                      <ShimmerButton
                        variant="emerald"
                        onClick={() => handleRunSimulation("confirm")}
                        className="px-4 py-2 text-xs shrink-0"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Approve & Execute</span>
                      </ShimmerButton>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>
                          Phase 6 Settlement & Audit complete. Signed receipt anchored to{" "}
                          <code>did:web:mahoneycontextprotocol.com</code>.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] p-12 text-center font-mono text-xs text-zinc-400">
          Loading Multi-Host SEP-1865 & 6-Phase A2A Simulator...
        </div>
      }
    >
      <SimulatorContent />
    </Suspense>
  );
}
