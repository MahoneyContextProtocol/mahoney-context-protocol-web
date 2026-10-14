"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sliders,
  CheckCircle2,
  Download,
  Sparkles,
  Boxes,
  Network,
  ShieldCheck,
} from "lucide-react";
import {
  TWENTY_SEVEN_PROTOCOLS,
  DEFAULT_FOUNDATION_CONFIG,
  generateProtocolArtifact,
  generateOneLineEmbed,
  type FoundationConfigOptions,
} from "@/lib/protocols-catalog";
import {
  REGULATED_VERTICALS,
  BUSINESS_JOURNEY_PACKS,
  DISPATCH_VENTURES_CATALOG,
  type VerticalSuiteId,
} from "@/lib/verticals-catalog";
import {
  BentoGrid,
  BentoCard,
  ShimmerButton,
  TerminalWindow,
  FileTreePreview,
  type FileTreeNode,
} from "@/components/21st";

const SUITE_TABS: Array<{ id: VerticalSuiteId | "all"; label: string }> = [
  { id: "all", label: "All 23 Verticals" },
  { id: "core-regulated", label: "Core Regulated (5)" },
  { id: "healthcare-life-sciences", label: "Healthcare (5)" },
  { id: "banking-capital-markets-enterprise", label: "Banking & FinTech (5)" },
  { id: "crypto-quant-institutional", label: "Crypto & Quant (4)" },
  { id: "high-revenue-niche", label: "High-Revenue Niche (4)" },
];

function StudioContent() {
  const searchParams = useSearchParams();
  const initialDomain = searchParams.get("domain") || "mahoneycontextprotocol.com";
  const initialTier =
    (searchParams.get("tier") as FoundationConfigOptions["tier"]) ||
    "regulated-enterprise";

  const [domain, setDomain] = useState(initialDomain);
  const [organizationName, setOrganizationName] = useState("Mahoney Context Protocol");
  const [tier, setTier] = useState<FoundationConfigOptions["tier"]>(initialTier);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(
    REGULATED_VERTICALS.map((v) => v.id)
  );
  const [selectedJourneys, setSelectedJourneys] = useState<string[]>(
    BUSINESS_JOURNEY_PACKS.map((j) => j.id)
  );
  const [selectedVentures, setSelectedVentures] = useState<string[]>(
    DISPATCH_VENTURES_CATALOG.map((d) => d.slug)
  );
  const [suiteFilter, setSuiteFilter] = useState<VerticalSuiteId | "all">("all");
  const [activeProtocolId, setActiveProtocolId] = useState("mcp-server-card");

  const toggleItem = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const config: FoundationConfigOptions = {
    domain,
    organizationName,
    description: DEFAULT_FOUNDATION_CONFIG.description,
    verticals: selectedVerticals,
    journeyPacks: selectedJourneys,
    enabledProtocols: TWENTY_SEVEN_PROTOCOLS.map((p) => p.id),
    tier,
  };

  const activeArtifact = generateProtocolArtifact(activeProtocolId, config);
  const oneLineEmbed = generateOneLineEmbed(config);

  const visibleVerticals =
    suiteFilter === "all"
      ? REGULATED_VERTICALS
      : REGULATED_VERTICALS.filter((v) => v.suite === suiteFilter);

  const bundleTree: FileTreeNode[] = [
    {
      name: ".well-known",
      type: "folder",
      children: [
        { name: "mcp.json", type: "file", badge: "A", meta: `${selectedVerticals.length * 8} tools` },
        { name: "agent-card.json", type: "file", badge: "A", meta: "A2A v0.3" },
        { name: "a2a-registry.json", type: "file", badge: "A", meta: `${selectedVentures.length} ventures` },
        { name: "agent-skills/index.json", type: "file", badge: "A", meta: "SHA-256" },
        { name: "did.json", type: "file", badge: "A", meta: `did:web:${domain}` },
        { name: "ucp.json", type: "file", badge: "A", meta: "Checkout" },
        { name: "acp.json", type: "file", badge: "A", meta: "Negotiation" },
        { name: "ap2.json", type: "file", badge: "A", meta: "Mandates" },
        { name: "x402.json", type: "file", badge: "A", meta: "USDC" },
        { name: "mpp.json", type: "file", badge: "A", meta: "Stripe/Tempo" },
      ],
    },
    {
      name: "root",
      type: "folder",
      children: [
        { name: "llms.txt", type: "file", badge: "A", meta: "Index" },
        { name: "operate.txt", type: "file", badge: "A", meta: "Agent Manual" },
        { name: "ai.txt", type: "file", badge: "A", meta: "Governance" },
      ],
    },
  ];

  const handleDownloadBundle = () => {
    const bundle = {
      generatedAt: new Date().toISOString(),
      config,
      selectedDispatchVentures: selectedVentures,
      totalRegulatedTools: selectedVerticals.length * 8,
      oneLineEmbed,
      artifacts: TWENTY_SEVEN_PROTOCOLS.map((p) => generateProtocolArtifact(p.id, config)),
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${domain.replace(/[^a-z0-9.-]/gi, "_")}-macp-v2-bundle.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
              <Sliders className="h-4 w-4" />
              <span>Business WebMCP Studio · 27 Protocols + 23 Verticals + Dispatch Ventures</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
              Configure & Export Your Agentic Web Bundle
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select your regulated industry verticals ({selectedVerticals.length}/23 active ·{" "}
              {selectedVerticals.length * 8} tools), 7 journey packs, and Dispatch Ventures A2A bridges.
            </p>
          </div>
          <ShimmerButton
            variant="emerald"
            onClick={handleDownloadBundle}
            className="px-5 py-3 text-xs"
          >
            <Download className="h-4 w-4 text-emerald-400" />
            <span>Export 27-Protocol Bundle (.json)</span>
          </ShimmerButton>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Configurator Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Domain & Tier */}
            <BentoCard
              badge="STEP 1 · DOMAIN & COMMERCIAL TIER"
              title="Target Domain & Licensing Tier"
              icon={<ShieldCheck className="h-5 w-5" />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] px-3.5 py-2 font-mono text-xs text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] px-3.5 py-2 text-xs text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "open-source", label: "Open Source ($0)", sub: "27 Protocols" },
                    { id: "pro-business", label: "Pro Business ($49)", sub: "+7 Journey Packs" },
                    {
                      id: "regulated-enterprise",
                      label: "Enterprise ($299)",
                      sub: "+23 Verticals (184 Tools)",
                    },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    className={`rounded-xl border p-2.5 text-left transition ${
                      tier === t.id
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                        : "border-white/[0.08] bg-[#09090b] text-zinc-400"
                    }`}
                  >
                    <div className="font-mono text-xs font-semibold text-zinc-100">
                      {t.label}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{t.sub}</div>
                  </button>
                ))}
              </div>
            </BentoCard>

            {/* Step 2: 23 Regulated Verticals */}
            <BentoCard
              badge={`STEP 2 · 23 REGULATED INDUSTRY VERTICALS (${selectedVerticals.length * 8} TOOLS ENABLED)`}
              title="Select Regulated Vertical Tool Suites (8 Tools Each)"
              icon={<Boxes className="h-5 w-5" />}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap gap-1">
                  {SUITE_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSuiteFilter(tab.id)}
                      className={`rounded-lg px-2.5 py-1 font-mono text-[10px] transition ${
                        suiteFilter === tab.id
                          ? "bg-emerald-500 text-zinc-950 font-semibold"
                          : "border border-white/[0.08] bg-[#09090b] text-zinc-400"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 font-mono text-[10px]">
                  <button
                    onClick={() => setSelectedVerticals(REGULATED_VERTICALS.map((v) => v.id))}
                    className="text-emerald-400 hover:underline"
                  >
                    Select All 23
                  </button>
                  <button
                    onClick={() => setSelectedVerticals(["event-planning", "carbon-footprint", "accessibility"])}
                    className="text-zinc-400 hover:underline"
                  >
                    Minimal (3)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {visibleVerticals.map((v) => {
                  const active = selectedVerticals.includes(v.id);
                  return (
                    <button
                      key={v.id}
                      onClick={() => toggleItem(selectedVerticals, setSelectedVerticals, v.id)}
                      className={`rounded-xl border p-2.5 text-left transition flex items-start justify-between gap-2 ${
                        active
                          ? "border-emerald-500/40 bg-emerald-500/10"
                          : "border-white/[0.06] bg-[#09090b] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs text-zinc-100">{v.name}</div>
                        <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                          {v.packageName} · 8 tools
                        </div>
                      </div>
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          active ? "text-emerald-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </BentoCard>

            {/* Step 3: Sister Business Dispatch Ventures & 7 Business Journey Packs */}
            <BentoCard
              badge="STEP 3 · DISPATCH VENTURES A2A FEDERATION & 7 JOURNEY PACKS"
              title="Multi-Host Dispatch Ventures & Commerce Flows"
              icon={<Network className="h-5 w-5" />}
            >
              <div className="mb-3 font-mono text-[11px] text-zinc-400">
                Sister Business: Dispatch Ventures (8 Multi-Host A2A Lanes)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {DISPATCH_VENTURES_CATALOG.map((venture) => {
                  const active = selectedVentures.includes(venture.slug);
                  return (
                    <button
                      key={venture.slug}
                      onClick={() =>
                        toggleItem(selectedVentures, setSelectedVentures, venture.slug)
                      }
                      className={`rounded-xl border p-2.5 text-left transition flex items-center justify-between ${
                        active
                          ? "border-emerald-500/40 bg-emerald-500/10"
                          : "border-white/[0.06] bg-[#09090b] opacity-60"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs text-zinc-100">
                          {venture.name}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400">
                          {venture.category} · ChatGPT/Claude/Grok/Gemini
                        </div>
                      </div>
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          active ? "text-emerald-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mb-2 font-mono text-[11px] text-zinc-400">
                7 Business Journey Packs
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS_JOURNEY_PACKS.map((j) => {
                  const active = selectedJourneys.includes(j.id);
                  return (
                    <button
                      key={j.id}
                      onClick={() => toggleItem(selectedJourneys, setSelectedJourneys, j.id)}
                      className={`rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition ${
                        active
                          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                          : "border-white/[0.06] bg-[#09090b] text-zinc-500"
                      }`}
                    >
                      {j.name}
                    </button>
                  );
                })}
              </div>
            </BentoCard>
          </div>

          {/* Right Live Preview Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-4">
              <label className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2">
                Inspect Any of the 27 Generated Protocol Manifests:
              </label>
              <select
                value={activeProtocolId}
                onChange={(e) => setActiveProtocolId(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#09090b] px-3 py-2 font-mono text-xs text-zinc-100"
              >
                {TWENTY_SEVEN_PROTOCOLS.map((p) => (
                  <option key={p.id} value={p.id}>
                    #{String(p.number).padStart(2, "0")} — {p.endpoint} ({p.name})
                  </option>
                ))}
              </select>
            </div>

            <TerminalWindow
              title={`${activeArtifact.filename} — Live Output`}
              statusBadge={`${selectedVerticals.length * 8} TOOLS`}
              tabs={[
                {
                  id: "manifest",
                  label: activeArtifact.filename,
                  language: "json",
                  code: activeArtifact.content,
                },
                {
                  id: "embed",
                  label: "1-Line Script Embed",
                  language: "html",
                  code: oneLineEmbed,
                },
              ]}
            />

            <FileTreePreview
              title={`Deployment Tree for ${domain}`}
              nodes={bundleTree}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] p-12 text-center font-mono text-xs text-zinc-400">
          Loading Business WebMCP Studio...
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}
