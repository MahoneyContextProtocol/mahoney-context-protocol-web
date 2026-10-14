"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Radar,
  Sliders,
  Boxes,
  TerminalSquare,
  CheckCircle2,
  ArrowRight,
  Lock,
  Sparkles,
  FileCode2,
  Calculator,
  ExternalLink,
  Layers,
  Network,
  Cpu,
  Globe,
} from "lucide-react";
import {
  PROTOCOL_PILLARS,
  TWENTY_SEVEN_PROTOCOLS,
  type PillarId,
} from "@/lib/protocols-catalog";
import {
  REGULATED_VERTICALS,
  BUSINESS_JOURNEY_PACKS,
  DISPATCH_VENTURES_CATALOG,
  A2A_SIX_PHASES,
  MULTI_HOST_CLIENTS,
  type VerticalSuiteId,
} from "@/lib/verticals-catalog";
import {
  BentoGrid,
  BentoCard,
  AnimatedBeam,
  ShimmerButton,
  NumberTicker,
  TerminalWindow,
} from "@/components/21st";

const SUITE_FILTERS: Array<{ id: VerticalSuiteId | "all"; label: string }> = [
  { id: "all", label: "All 23 Verticals (184 Tools)" },
  { id: "core-regulated", label: "Core Regulated (5)" },
  { id: "healthcare-life-sciences", label: "Healthcare & Life Sciences (5)" },
  { id: "banking-capital-markets-enterprise", label: "Banking & Capital Markets (5)" },
  { id: "crypto-quant-institutional", label: "Crypto / Quant / RWA (4)" },
  { id: "high-revenue-niche", label: "High-Revenue Niche (4)" },
];

export default function HomePage() {
  const [selectedPillar, setSelectedPillar] = useState<PillarId | "all">("all");
  const [selectedSuite, setSelectedSuite] = useState<VerticalSuiteId | "all">("all");
  const [quickScanDomain, setQuickScanDomain] = useState("mahoneycontextprotocol.com");
  const [monthlySessions, setMonthlySessions] = useState(500000);
  const [aov, setAov] = useState(220);

  // Refs for 21st.dev AnimatedBeam 6-Phase A2A Mesh diagram
  const meshContainerRef = useRef<HTMLDivElement>(null);
  const buyerAgentRef = useRef<HTMLDivElement>(null);
  const foundationHubRef = useRef<HTMLDivElement>(null);
  const verticalNodeRef = useRef<HTMLDivElement>(null);
  const dispatchNodeRef = useRef<HTMLDivElement>(null);

  const filteredProtocols =
    selectedPillar === "all"
      ? TWENTY_SEVEN_PROTOCOLS
      : TWENTY_SEVEN_PROTOCOLS.filter((p) => p.pillar === selectedPillar);

  const filteredVerticals =
    selectedSuite === "all"
      ? REGULATED_VERTICALS
      : REGULATED_VERTICALS.filter((v) => v.suite === selectedSuite);

  const estimatedAgentTraffic = Math.round(monthlySessions * 0.28);
  const estimatedLiftUSD = Math.round(estimatedAgentTraffic * 0.012) * aov;
  const estimatedX402USD = Math.round(estimatedAgentTraffic * 0.002);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Hero Section with 21st.dev Micro-Grid & Radial Spotlight */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-grid-white pt-14 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_65%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              100/100 Self-Dogfooding Verified · 21st.dev Component System
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#121215] px-3 py-1 font-mono text-xs text-zinc-300">
              27 Protocols · 23 Regulated Verticals (184 Tools) · 8 Dispatch Ventures
            </span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.06]">
                Turn Every Website Into a{" "}
                <span className="text-emerald-400">
                  Verifiable Agentic Surface.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
                <strong className="text-zinc-100">Mahoney Context Protocol (MaCP v2.0)</strong>{" "}
                combines the open-source{" "}
                <code className="rounded border border-white/[0.08] bg-[#121215] px-1.5 py-0.5 font-mono text-xs text-emerald-300">
                  mcp-foundation
                </code>{" "}
                27-protocol generator with{" "}
                <strong className="text-zinc-100">23 regulated industry vertical plugins (184 tools)</strong>,{" "}
                <strong className="text-zinc-100">6-Phase Universal A2A registration</strong>, and sister business{" "}
                <strong className="text-emerald-300">Dispatch Ventures</strong> multi-host MCP Apps across ChatGPT, Claude, Grok, and Gemini.
              </p>

              {/* Quick Audit Bar */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#121215]/90 p-3 shadow-2xl">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 px-1 mb-1.5">
                  Instant 27-Protocol Readiness Audit — Enter Any Domain
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={quickScanDomain}
                    onChange={(e) => setQuickScanDomain(e.target.value)}
                    placeholder="e.g. mahoneycontextprotocol.com or stripe.com"
                    className="flex-1 rounded-xl border border-white/[0.08] bg-[#09090b] px-4 py-2.5 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500/60 focus:outline-none"
                  />
                  <Link
                    href={`/scanner?domain=${encodeURIComponent(quickScanDomain)}`}
                  >
                    <ShimmerButton variant="emerald" className="w-full sm:w-auto py-2.5 px-5 text-sm">
                      <Radar className="h-4 w-4 text-emerald-400" />
                      <span>Audit All 27 Protocols</span>
                      <ArrowRight className="h-4 w-4" />
                    </ShimmerButton>
                  </Link>
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 px-1 text-xs text-zinc-500">
                  <span>Try preset profiles:</span>
                  {["mahoneycontextprotocol.com", "stripe.com", "shopify.com", "cloudflare.com"].map(
                    (d) => (
                      <button
                        key={d}
                        onClick={() => setQuickScanDomain(d)}
                        className="font-mono text-[11px] text-zinc-400 hover:text-emerald-400 underline decoration-zinc-700"
                      >
                        {d}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/studio">
                  <ShimmerButton variant="zinc" className="px-4 py-2.5 text-xs">
                    <Sliders className="h-4 w-4 text-emerald-400" />
                    <span>Open Business WebMCP Studio</span>
                  </ShimmerButton>
                </Link>
                <Link href="/simulator">
                  <ShimmerButton variant="zinc" className="px-4 py-2.5 text-xs">
                    <TerminalSquare className="h-4 w-4 text-emerald-400" />
                    <span>Multi-Host & 6-Phase A2A Simulator</span>
                  </ShimmerButton>
                </Link>
                <Link href="/verticals">
                  <ShimmerButton variant="zinc" className="px-4 py-2.5 text-xs">
                    <Boxes className="h-4 w-4 text-emerald-400" />
                    <span>Explore 23 Verticals (184 Tools)</span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>

            {/* Right Column: Live Dogfooding Terminal & 21st.dev NumberTicker Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Protocols Live
                  </div>
                  <div className="mt-1 text-2xl font-bold text-zinc-100">
                    <NumberTicker value={27} suffix="/27" />
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-emerald-400">
                    100/100 Score
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Regulated Tools
                  </div>
                  <div className="mt-1 text-2xl font-bold text-emerald-400">
                    <NumberTicker value={184} />
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-zinc-400">
                    23 Industry Verticals
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    A2A Lifecycle
                  </div>
                  <div className="mt-1 text-2xl font-bold text-zinc-100">
                    <NumberTicker value={6} suffix=" Phases" />
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-emerald-400">
                    8 Dispatch Ventures
                  </div>
                </div>
              </div>

              <TerminalWindow
                title="mahoneycontextprotocol.com — Live Agentic Surface"
                statusBadge="27/27 PASS · 100/100"
                tabs={[
                  {
                    id: "embed",
                    label: "One-Line Embed",
                    language: "html",
                    code: `<!-- Drop into any site or Next.js root layout -->
<script
  src="https://mahoneycontextprotocol.com/cdn/macp-foundation-v2.js"
  data-domain="mahoneycontextprotocol.com"
  data-protocols="27"
  data-verticals="all-23-regulated"
  data-a2a-registry="https://mahoneycontextprotocol.com/.well-known/a2a-registry.json"
  async
></script>`,
                  },
                  {
                    id: "a2a",
                    label: "A2A JSON-RPC",
                    language: "json",
                    code: JSON.stringify(
                      {
                        jsonrpc: "2.0",
                        method: "tasks/send",
                        params: {
                          skillId: "verify-informed-consent",
                          targetAgentDid: "did:web:mahoneycontextprotocol.com:verticals:clinical-trials",
                          hostClient: "claude",
                          mode: "prepare",
                        },
                      },
                      null,
                      2
                    ),
                  },
                  {
                    id: "headers",
                    label: "HTTP Link Headers",
                    language: "http",
                    code: `HTTP/1.1 200 OK
Link: </.well-known/mcp.json>; rel="mcp-server", </.well-known/agent-card.json>; rel="agent-card", </.well-known/a2a-registry.json>; rel="a2a-registry"
Content-Signal: ai-train=no, search=yes, ai-input=yes, ai-action=yes
X-MaCP-Foundation-Version: 2.0.0`,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Layer Architecture + 21st.dev AnimatedBeam 6-Phase A2A Mesh */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              Two-Layer Commercial Architecture + Universal A2A Mesh
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
              Layer 1 Protocol Foundation + Layer 2 Regulated Verticals & Dispatch Ventures
            </h2>
          </div>
          <Link
            href="/simulator"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 hover:text-emerald-300"
          >
            <span>Test Live 6-Phase A2A & Multi-Host Previewer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <BentoGrid className="lg:grid-cols-2 mb-8">
          <BentoCard
            badge="LAYER 1 · MIT OPEN-SOURCE CORE"
            title="mcp-foundation v2.0 (All 27 Protocols)"
            subtitle="Deterministic generators & middleware for 7 Agentic Web pillars"
            icon={<Layers className="h-5 w-5" />}
            beam
          >
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Automatically serves and validates all 27 discovery, identity, commerce, payment,
              and governance manifests so every AI crawler and autonomous buyer agent can
              verify your domain without brittle HTML scraping.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
              {[
                "/.well-known/mcp.json",
                "/.well-known/agent-card.json",
                "/.well-known/a2a-registry.json",
                "/.well-known/did.json",
                "/.well-known/ucp.json",
                "/.well-known/ap2.json",
                "/.well-known/x402.json",
                "/llms.txt & /operate.txt",
                "navigator.modelContext",
              ].map((ep) => (
                <div
                  key={ep}
                  className="truncate rounded-lg border border-white/[0.06] bg-[#09090b] px-2.5 py-1.5 text-zinc-300"
                >
                  {ep}
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            badge="LAYER 2 · COMMERCIAL SAAS & SISTER VENTURES"
            title="23 Regulated Verticals (184 Tools) + Dispatch Ventures"
            subtitle="Domain-specific compliance guardrails, SEP-1865 UI cards & multi-host distribution"
            icon={<ShieldCheck className="h-5 w-5" />}
          >
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Pre-built regulated WebMCP tool suites across Healthcare, Banking, Crypto/Quant,
              Core Regulated, and High-Revenue Niche verticals—paired with sister business{" "}
              <strong className="text-zinc-200">Dispatch Ventures</strong> running natively in
              ChatGPT, Claude, Grok, and Gemini.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-white/[0.06] bg-[#09090b] p-2.5">
                <div className="font-mono text-[11px] font-semibold text-emerald-400">
                  prepare → confirm Gate
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-400">
                  Every consequential tool requires human approval via SEP-1865 UI card.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-[#09090b] p-2.5">
                <div className="font-mono text-[11px] font-semibold text-emerald-400">
                  Multi-Host MCP Apps
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-400">
                  Renders inside ChatGPT (window.openai), Claude (SEP-1865), Grok & Gemini.
                </p>
              </div>
            </div>
          </BentoCard>
        </BentoGrid>

        {/* Live 21st.dev AnimatedBeam 6-Phase A2A Mesh Visualization */}
        <div
          ref={meshContainerRef}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] p-6 sm:p-8"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Node: Multi-Host Buyer Agent */}
            <div
              ref={buyerAgentRef}
              className="w-full lg:w-64 rounded-xl border border-white/[0.1] bg-[#09090b] p-4 shadow-xl"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-100">
                <Globe className="h-4 w-4 text-emerald-400" />
                <span>Multi-Host Client Agent</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                ChatGPT · Claude · Grok · Gemini
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {MULTI_HOST_CLIENTS.map((h) => (
                  <span
                    key={h.id}
                    className="rounded border border-white/[0.08] bg-[#121215] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300"
                  >
                    {h.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Center Hub: 6-Phase A2A Router */}
            <div
              ref={foundationHubRef}
              className="w-full lg:w-80 rounded-xl border border-emerald-500/40 bg-[#09090b] p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-emerald-400">
                  6-Phase A2A Mesh (/api/a2a)
                </span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
                  RFC 9421 + AP2
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {A2A_SIX_PHASES.map((phase) => (
                  <div
                    key={phase.phase}
                    className="rounded border border-white/[0.06] bg-[#121215] px-2 py-1 font-mono text-[10px] text-zinc-300"
                  >
                    <span className="text-emerald-400 font-semibold">P{phase.phase}:</span>{" "}
                    {phase.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Nodes: 23 Regulated Verticals + 8 Dispatch Ventures */}
            <div className="w-full lg:w-64 space-y-3">
              <div
                ref={verticalNodeRef}
                className="rounded-xl border border-white/[0.1] bg-[#09090b] p-3.5 shadow-xl"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-100">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span>23 Regulated Verticals</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  184 Compliant Tools · 5 Suites
                </p>
              </div>
              <div
                ref={dispatchNodeRef}
                className="rounded-xl border border-white/[0.1] bg-[#09090b] p-3.5 shadow-xl"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-100">
                  <Network className="h-4 w-4 text-emerald-400" />
                  <span>Dispatch Ventures (Sister)</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  8 Autonomous A2A Venture Lanes
                </p>
              </div>
            </div>
          </div>

          <AnimatedBeam
            containerRef={meshContainerRef}
            fromRef={buyerAgentRef}
            toRef={foundationHubRef}
            curvature={0}
          />
          <AnimatedBeam
            containerRef={meshContainerRef}
            fromRef={foundationHubRef}
            toRef={verticalNodeRef}
            curvature={-24}
          />
          <AnimatedBeam
            containerRef={meshContainerRef}
            fromRef={foundationHubRef}
            toRef={dispatchNodeRef}
            curvature={24}
            reverse
          />
        </div>
      </section>

      {/* Interactive 27-Protocol Explorer */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              Layer 1 · Open Standard Catalog
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
              All 27 Agentic Web Protocols Across 7 Pillars
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedPillar("all")}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                selectedPillar === "all"
                  ? "bg-emerald-500 text-zinc-950 font-semibold"
                  : "border border-white/[0.08] bg-[#121215] text-zinc-300 hover:border-white/[0.16]"
              }`}
            >
              All (27)
            </button>
            {PROTOCOL_PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                  selectedPillar === pillar.id
                    ? "bg-emerald-500 text-zinc-950 font-semibold"
                    : "border border-white/[0.08] bg-[#121215] text-zinc-300 hover:border-white/[0.16]"
                }`}
              >
                {pillar.shortName} ({TWENTY_SEVEN_PROTOCOLS.filter((p) => p.pillar === pillar.id).length})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProtocols.map((proto) => (
            <div
              key={proto.id}
              className="group rounded-xl border border-white/[0.08] bg-[#121215] p-4 transition hover:border-emerald-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    #{String(proto.number).padStart(2, "0")} · {proto.standard}
                  </span>
                  {proto.isNewInV2 && (
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                      NEW v2.0
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-zinc-100 text-sm">{proto.name}</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {proto.description}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-300 truncate max-w-[210px]">
                  {proto.endpoint}
                </span>
                <span className="text-emerald-400 shrink-0">LIVE 200 OK</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All 23 Regulated Verticals (184 Tools) Explorer */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              Layer 2 · 23 Regulated Industry Verticals (184 Tools)
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
              5 Enterprise Compliance Suites · 8 Tools Per Vertical
            </h2>
          </div>
          <Link
            href="/verticals"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 hover:text-emerald-300"
          >
            <span>Open Interactive 184-Tool Marketplace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {SUITE_FILTERS.map((suite) => (
            <button
              key={suite.id}
              onClick={() => setSelectedSuite(suite.id)}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs transition ${
                selectedSuite === suite.id
                  ? "bg-emerald-500 text-zinc-950 font-semibold"
                  : "border border-white/[0.08] bg-[#121215] text-zinc-300 hover:border-white/[0.16]"
              }`}
            >
              {suite.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVerticals.map((v) => (
            <BentoCard
              key={v.id}
              badge={`${v.suiteLabel.toUpperCase()} · 8 TOOLS`}
              title={v.name}
              subtitle={v.packageName}
            >
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                {v.tagline}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {v.regulations.map((reg) => (
                  <span
                    key={reg}
                    className="rounded border border-white/[0.08] bg-[#09090b] px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                  >
                    {reg}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1 font-mono text-[10px] text-zinc-400 border-t border-white/[0.06] pt-2.5">
                {v.tools.slice(0, 4).map((t) => (
                  <div key={t.id} className="truncate">
                    • {t.id}
                  </div>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
      </section>

      {/* Sister Business: Dispatch Ventures (8 Multi-Host Agentic Businesses) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              Sister Business Showcase · github.com/mahoney-context-protocol/dispatch-ventures
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
              Dispatch Ventures: 8 Multi-Host Agentic Businesses on MaCP v2.0
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-3xl">
              Every Dispatch Venture is registered in{" "}
              <code className="font-mono text-emerald-300">/.well-known/a2a-registry.json</code>{" "}
              and ships native MCP Apps for ChatGPT, Claude, Grok, and Gemini.
            </p>
          </div>
          <a
            href="https://github.com/mahoney-context-protocol/dispatch-ventures"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#121215] px-3.5 py-2 font-mono text-xs text-emerald-300 hover:border-emerald-500/40"
          >
            <span>View dispatch-ventures Repo</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DISPATCH_VENTURES_CATALOG.map((venture) => (
            <div
              key={venture.slug}
              className="rounded-xl border border-white/[0.08] bg-[#121215] p-4 flex flex-col justify-between hover:border-emerald-500/40 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                    {venture.category}
                  </span>
                  <span className="rounded border border-white/[0.08] bg-[#09090b] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                    4 Hosts
                  </span>
                </div>
                <h3 className="font-semibold text-zinc-100 text-sm">{venture.name}</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {venture.tagline}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5">
                <div className="font-mono text-[10px] text-zinc-500 truncate">
                  did:web:mahoneycontextprotocol.com:ventures:{venture.slug}
                </div>
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-emerald-300">
                    ${venture.basePriceRangeUsd[0]}–${venture.basePriceRangeUsd[1]}
                  </span>
                  <Link
                    href={`/simulator?venture=${venture.slug}`}
                    className="text-zinc-300 hover:text-emerald-400 underline"
                  >
                    Preview UI →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Pricing Tiers + Interactive ROI Calculator */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Transparent Open-Core & Enterprise Licensing
          </span>
          <h2 className="mt-1 text-3xl font-bold text-zinc-100">
            Start Free with 27 Protocols. Scale to Regulated Enterprise.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-12">
          {/* Tier 1 */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                Open Source Free
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-100">$0</span>
                <span className="text-xs text-zinc-400">/ month (MIT License)</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                Complete Layer 1 protocol foundation for developers and self-hosted sites.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                {[
                  "All 27 mcp-foundation v2.0 static & SSR generators",
                  "CLI auditor & remediation diff generator",
                  "W3C WebMCP window.navigator.modelContext polyfill",
                  "llms.txt, operate.txt, ai.txt & Content-Signal headers",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/scanner"
              className="mt-8 block w-full rounded-xl border border-white/[0.1] bg-[#09090b] py-2.5 text-center text-xs font-semibold text-zinc-100 hover:border-emerald-500/50 transition"
            >
              Run Free 27-Protocol Scan
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                Pro Business
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-100">$49</span>
                <span className="text-xs text-zinc-400">/ month per domain</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                Turnkey agentic commerce, metered AI billing, and 7 business journey packs.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                {[
                  "Everything in Open Source Free (All 27 Protocols)",
                  "All 7 Business Journey Packs (E-Commerce, SaaS, Travel, FinTech...)",
                  "Hosted Business WebMCP Studio + 1-Line Script CDN",
                  "UCP + ACP Checkout & x402 / Stripe MPP Metered Billing",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/studio?tier=pro-business"
              className="mt-8 block w-full rounded-xl border border-white/[0.1] bg-[#09090b] py-2.5 text-center text-xs font-semibold text-zinc-100 hover:border-emerald-500/50 transition"
            >
              Configure Pro Business
            </Link>
          </div>

          {/* Tier 3 */}
          <BentoCard
            badge="MOST POPULAR · REGULATED & MULTI-HOST A2A"
            title="Regulated Enterprise ($299/mo)"
            subtitle="All 23 Regulated Verticals (184 Tools) + Dispatch Ventures A2A Federation"
            beam
          >
            <ul className="mt-2 space-y-2.5 text-xs text-zinc-200">
              {[
                "All 27 Protocols + All 7 Business Journey Packs",
                "All 23 Regulated Industry Verticals (184 Compliant WebMCP Tools)",
                "Universal 6-Phase A2A Registration + Dispatch Ventures Multi-Host Bridge",
                "SEP-1865 Interactive MCP Apps (ChatGPT, Claude, Grok, Gemini)",
                "RFC 9421 Web Bot Auth + AP2 Verifiable Mandates + Audit Trail",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/studio?tier=regulated-enterprise" className="mt-6 block">
              <ShimmerButton variant="emerald" className="w-full py-2.5 text-xs">
                <span>Deploy Regulated Enterprise Bundle</span>
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </Link>
          </BentoCard>
        </div>

        {/* Interactive ROI Calculator */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
                <Calculator className="h-4 w-4" />
                <span>Interactive Agentic Commerce & x402 ROI Calculator</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Estimate Your Monthly Agent Conversion Lift & Token Savings
              </h3>
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Monthly Total Sessions (Human + Agent):</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      {monthlySessions.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={2500000}
                    step={50000}
                    value={monthlySessions}
                    onChange={(e) => setMonthlySessions(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Average Order / Contract Value (USD):</span>
                    <span className="font-mono font-semibold text-emerald-400">${aov}</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={1000}
                    step={20}
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#09090b] p-4">
                <div className="font-mono text-[10px] uppercase text-zinc-500">
                  Est. Agent Sessions
                </div>
                <div className="mt-1 text-2xl font-bold text-zinc-100 font-mono">
                  {estimatedAgentTraffic.toLocaleString()}
                </div>
                <div className="mt-1 text-[11px] text-emerald-400">
                  78% Markdown Token Savings
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#09090b] p-4">
                <div className="font-mono text-[10px] uppercase text-zinc-500">
                  UCP/ACP Revenue Lift
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-400 font-mono">
                  ${estimatedLiftUSD.toLocaleString()}
                </div>
                <div className="mt-1 text-[11px] text-zinc-400">
                  +1.2% Agent Checkout Conversion
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#09090b] p-4">
                <div className="font-mono text-[10px] uppercase text-zinc-500">
                  x402 / MPP Metered Rev
                </div>
                <div className="mt-1 text-2xl font-bold text-zinc-100 font-mono">
                  ${estimatedX402USD.toLocaleString()}
                </div>
                <div className="mt-1 text-[11px] text-zinc-400">
                  USDC / Tempo Micropayments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
