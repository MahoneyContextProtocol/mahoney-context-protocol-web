"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Radar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sliders,
  ShieldCheck,
  FileDiff,
} from "lucide-react";
import { runDomainReadinessScan, type DomainScanReport } from "@/lib/scanner-engine";
import {
  BentoGrid,
  BentoCard,
  ShimmerButton,
  NumberTicker,
  TerminalWindow,
  FileTreePreview,
  type FileTreeNode,
} from "@/components/21st";

const SCANNER_FILE_TREE: FileTreeNode[] = [
  {
    name: ".well-known",
    type: "folder",
    children: [
      { name: "mcp.json", type: "file", badge: "✓", meta: "MCP Server Card" },
      { name: "agent-card.json", type: "file", badge: "✓", meta: "A2A v0.3" },
      { name: "a2a-registry.json", type: "file", badge: "A", meta: "6-Phase A2A" },
      { name: "agent-skills/index.json", type: "file", badge: "✓", meta: "184 Tools" },
      { name: "did.json", type: "file", badge: "✓", meta: "W3C did:web" },
      { name: "ucp.json", type: "file", badge: "✓", meta: "Universal Commerce" },
      { name: "acp.json", type: "file", badge: "✓", meta: "Agentic Commerce" },
      { name: "ap2.json", type: "file", badge: "✓", meta: "AP2 Mandates" },
      { name: "x402.json", type: "file", badge: "✓", meta: "x402 USDC" },
      { name: "mpp.json", type: "file", badge: "✓", meta: "Stripe/Tempo MPP" },
      { name: "mcp-apps.json", type: "file", badge: "✓", meta: "SEP-1865 UI" },
      { name: "ag-ui.json", type: "file", badge: "✓", meta: "AG-UI Stream" },
    ],
  },
  {
    name: "root-governance",
    type: "folder",
    children: [
      { name: "llms.txt", type: "file", badge: "✓", meta: "Index" },
      { name: "llms-full.txt", type: "file", badge: "✓", meta: "Full Corpus" },
      { name: "operate.txt", type: "file", badge: "✓", meta: "Agent Manual" },
      { name: "ai.txt", type: "file", badge: "✓", meta: "Permissions" },
    ],
  },
];

function ScannerContent() {
  const searchParams = useSearchParams();
  const initialDomain = searchParams.get("domain") || "mahoneycontextprotocol.com";

  const [domainInput, setDomainInput] = useState(initialDomain);
  const [report, setReport] = useState<DomainScanReport>(() =>
    runDomainReadinessScan(initialDomain)
  );
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>("mcp-server-card");

  useEffect(() => {
    const paramDomain = searchParams.get("domain");
    if (paramDomain) {
      setDomainInput(paramDomain);
      setReport(runDomainReadinessScan(paramDomain));
    }
  }, [searchParams]);

  const handleScan = (targetDomain?: string) => {
    const d = targetDomain ?? domainInput;
    setDomainInput(d);
    setReport(runDomainReadinessScan(d));
  };

  const activeCheck =
    report.checks.find((c) => c.protocolId === selectedProtocolId) || report.checks[0];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search Bar */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider">
                <Radar className="h-4 w-4" />
                <span>27-Protocol Readiness Scanner · 21st.dev Diagnostic Suite</span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-100">
                Agentic Web Protocol & Compliance Auditor
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Inspects all 27 discovery, identity, capability, commerce, payment, UI, and
                governance protocols across 7 pillars.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["mahoneycontextprotocol.com", "stripe.com", "shopify.com", "cloudflare.com"].map(
                (preset) => (
                  <button
                    key={preset}
                    onClick={() => handleScan(preset)}
                    className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition ${
                      report.domain === preset
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                        : "border-white/[0.08] bg-[#09090b] text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {preset}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="Enter any domain (e.g. mahoneycontextprotocol.com or acme.com)"
              className="flex-1 rounded-xl border border-white/[0.08] bg-[#09090b] px-4 py-3 font-mono text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none"
            />
            <ShimmerButton
              variant="emerald"
              onClick={() => handleScan()}
              className="px-6 py-3 text-sm"
            >
              <Radar className="h-4 w-4 text-emerald-400" />
              <span>Run 27-Protocol Audit</span>
            </ShimmerButton>
          </div>
        </div>

        {/* Score Overview + 7 Pillar Breakdown */}
        <BentoGrid className="lg:grid-cols-3">
          <BentoCard
            badge={`AUDIT TARGET · ${report.domain.toUpperCase()}`}
            title={`Grade ${report.grade} (${report.overallScore}/100)`}
            subtitle={`${report.passedProtocols} of ${report.totalProtocols} Agentic Protocols Active`}
            icon={<ShieldCheck className="h-5 w-5" />}
            beam={report.overallScore === 100}
          >
            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-4xl font-bold text-emerald-400">
                <NumberTicker value={report.overallScore} suffix="/100" />
              </div>
              <span className="font-mono text-xs text-zinc-400">
                {report.passedProtocols}/27 Passing
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-[11px] text-zinc-400">
                Recommended Verticals: {report.recommendedVerticals.length}
              </span>
              <Link
                href={`/studio?domain=${encodeURIComponent(report.domain)}`}
                className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 hover:underline"
              >
                <span>Fix in Studio</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </BentoCard>

          <BentoCard
            badge="7 ARCHITECTURAL PILLARS"
            title="Per-Pillar Protocol Telemetry"
            subtitle="Weighted compliance across Discovery, Identity, Commerce, Payments & UI"
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-1">
              {report.pillarScores.map((p) => (
                <div
                  key={p.pillarId}
                  className="rounded-xl border border-white/[0.06] bg-[#09090b] p-3"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-300 font-semibold">{p.shortName}</span>
                    <span
                      className={
                        p.percentage === 100
                          ? "text-emerald-400 font-bold"
                          : p.percentage >= 50
                            ? "text-amber-400 font-bold"
                            : "text-rose-400 font-bold"
                      }
                    >
                      {p.percentage}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.percentage === 100
                          ? "bg-emerald-500"
                          : p.percentage >= 50
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                      style={{ width: `${p.percentage}%` }}
                    />
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] text-zinc-500">
                    {p.passedCount}/{p.totalCount} protocols
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoGrid>

        {/* 27 Protocol Check Matrix + Artifact Inspector */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#121215] p-5">
            <h2 className="font-semibold text-zinc-100 text-base mb-4">
              All 27 Protocol Verification Checks (Click Any Protocol to Inspect Manifest)
            </h2>
            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {report.checks.map((chk) => (
                <button
                  key={chk.protocolId}
                  onClick={() => setSelectedProtocolId(chk.protocolId)}
                  className={`w-full text-left rounded-xl border p-3 transition flex items-start justify-between gap-3 ${
                    activeCheck?.protocolId === chk.protocolId
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-white/[0.06] bg-[#09090b] hover:border-white/[0.14]"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {chk.status === "pass" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : chk.status === "warn" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                      )}
                      <span className="font-mono text-xs font-bold text-zinc-400">
                        #{String(chk.number).padStart(2, "0")}
                      </span>
                      <span className="font-semibold text-xs text-zinc-100">
                        {chk.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-6">{chk.evidence}</p>
                  </div>
                  <div className="text-right shrink-0 font-mono text-[11px]">
                    <div className="text-zinc-300">{chk.endpoint}</div>
                    <div className="text-zinc-500">
                      HTTP {chk.statusCode} · {chk.latencyMs}ms
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <TerminalWindow
              title={`${activeCheck?.endpoint} (${activeCheck?.standard})`}
              statusBadge={activeCheck?.status.toUpperCase()}
              tabs={[
                {
                  id: "manifest",
                  label: "Generated Artifact",
                  language: "json",
                  code: activeCheck?.generatedArtifactPreview || "",
                },
                {
                  id: "diff",
                  label: "Remediation Diff",
                  language: "diff",
                  code: report.oneClickRemediationDiff,
                },
                {
                  id: "embed",
                  label: "1-Line Script",
                  language: "html",
                  code: report.oneLineScriptEmbed,
                },
              ]}
            />

            <FileTreePreview
              title="mcp-foundation v2.0 Generated Bundle"
              nodes={SCANNER_FILE_TREE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScannerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] p-12 text-center font-mono text-xs text-zinc-400">
          Initializing 27-Protocol Readiness Scanner...
        </div>
      }
    >
      <ScannerContent />
    </Suspense>
  );
}
