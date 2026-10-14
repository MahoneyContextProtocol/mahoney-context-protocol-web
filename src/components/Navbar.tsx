"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Radar,
  Sliders,
  Boxes,
  TerminalSquare,
  Sparkles,
  ExternalLink,
  Network,
} from "lucide-react";
import { ShimmerButton } from "@/components/21st";

const NAV_ITEMS = [
  { href: "/", label: "Platform & Architecture", icon: Sparkles },
  { href: "/scanner", label: "27-Protocol Scanner", icon: Radar },
  { href: "/studio", label: "WebMCP Studio", icon: Sliders },
  { href: "/verticals", label: "23 Verticals & Ventures", icon: Boxes },
  { href: "/simulator", label: "Multi-Host & A2A Simulator", icon: TerminalSquare },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-[#121215] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-zinc-100 text-sm sm:text-base">
                MahoneyContextProtocol
              </span>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                v2.0
              </span>
            </div>
            <p className="font-mono text-[10px] text-zinc-500 hidden sm:block">
              27 Protocols · 23 Regulated Verticals (184 Tools) · 6-Phase A2A
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 rounded-xl border border-white/[0.06] bg-[#121215]/90 p-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-zinc-900 text-emerald-300 border border-emerald-500/30 shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100 border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/.well-known/a2a-registry.json"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#121215] px-2.5 py-1.5 font-mono text-[11px] text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
          >
            <Network className="h-3 w-3 text-emerald-400" />
            <span>a2a-registry.json</span>
            <ExternalLink className="h-2.5 w-2.5 text-zinc-500" />
          </a>
          <Link href="/studio">
            <ShimmerButton variant="emerald" className="px-3.5 py-1.5 text-xs">
              <span>Launch Studio</span>
            </ShimmerButton>
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet Secondary Navigation */}
      <div className="flex xl:hidden overflow-x-auto border-t border-white/[0.06] px-4 py-2 gap-1.5 bg-[#09090b]/95">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                active
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090b] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-100 font-semibold">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>mahoneycontextprotocol.com</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              The commercial two-layer Agentic Web Platform: 27 deterministic discovery,
              identity, commerce, payment, and UI protocols + 23 regulated industry
              verticals (184 tools) + Dispatch Ventures multi-host A2A network.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                100/100 Dogfooding Verified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#121215] px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                21st.dev High-Craft UI
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Platform & Sister Ecosystem
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scanner" className="hover:text-emerald-400 transition">
                  27-Protocol Readiness Scanner (/scanner)
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-emerald-400 transition">
                  Business WebMCP Studio (/studio)
                </Link>
              </li>
              <li>
                <Link href="/verticals" className="hover:text-emerald-400 transition">
                  23 Regulated Verticals & 184 Tools (/verticals)
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-emerald-400 transition">
                  Multi-Host & 6-Phase A2A Simulator (/simulator)
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/mahoney-context-protocol/dispatch-ventures"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>Sister Business: dispatch-ventures (8 Lanes)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Live Discovery & A2A Endpoints
            </h3>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li>
                <a href="/.well-known/mcp.json" className="hover:text-emerald-400">
                  /.well-known/mcp.json
                </a>
              </li>
              <li>
                <a href="/.well-known/agent-card.json" className="hover:text-emerald-400">
                  /.well-known/agent-card.json
                </a>{" "}
                ·{" "}
                <a href="/.well-known/a2a-registry.json" className="text-emerald-400 hover:underline">
                  a2a-registry.json
                </a>
              </li>
              <li>
                <a href="/.well-known/agent-skills/index.json" className="hover:text-emerald-400">
                  /.well-known/agent-skills/index.json
                </a>
              </li>
              <li>
                <a href="/.well-known/ucp.json" className="hover:text-emerald-400">
                  /.well-known/ucp.json
                </a>{" "}
                ·{" "}
                <a href="/.well-known/acp.json" className="hover:text-emerald-400">
                  acp.json
                </a>{" "}
                ·{" "}
                <a href="/.well-known/ap2.json" className="hover:text-emerald-400">
                  ap2.json
                </a>
              </li>
              <li>
                <a href="/.well-known/x402.json" className="hover:text-emerald-400">
                  /.well-known/x402.json
                </a>{" "}
                ·{" "}
                <a href="/.well-known/mpp.json" className="hover:text-emerald-400">
                  mpp.json
                </a>
              </li>
              <li>
                <a href="/.well-known/mcp-apps.json" className="hover:text-emerald-400">
                  /.well-known/mcp-apps.json
                </a>{" "}
                ·{" "}
                <a href="/.well-known/ag-ui.json" className="hover:text-emerald-400">
                  ag-ui.json
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Context & Governance
            </h3>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li>
                <a href="/llms.txt" className="hover:text-emerald-400">
                  /llms.txt
                </a>{" "}
                &{" "}
                <a href="/llms-full.txt" className="hover:text-emerald-400">
                  /llms-full.txt
                </a>
              </li>
              <li>
                <a href="/operate.txt" className="hover:text-emerald-400">
                  /operate.txt (Agent Manual)
                </a>
              </li>
              <li>
                <a href="/ai.txt" className="hover:text-emerald-400">
                  /ai.txt
                </a>{" "}
                &{" "}
                <a href="/.well-known/content-signals.json" className="hover:text-emerald-400">
                  content-signals.json
                </a>
              </li>
              <li>
                <a href="/.well-known/did.json" className="hover:text-emerald-400">
                  /.well-known/did.json (W3C did:web)
                </a>
              </li>
              <li>
                <a href="/.well-known/security.txt" className="hover:text-emerald-400">
                  /.well-known/security.txt
                </a>
              </li>
              <li>
                <a href="/robots.txt" className="hover:text-emerald-400">
                  /robots.txt
                </a>{" "}
                ·{" "}
                <a href="/sitemap.xml" className="hover:text-emerald-400">
                  /sitemap.xml
                </a>{" "}
                ·{" "}
                <a href="/humans.txt" className="hover:text-emerald-400">
                  /humans.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© 2026 Mahoney Context Protocol (mahoneycontextprotocol.com) & Dispatch Ventures.</p>
          <p className="font-mono mt-2 sm:mt-0 text-[11px]">
            did:web:mahoneycontextprotocol.com · Content-Signal: ai-train=no, search=yes, ai-input=yes, ai-action=yes
          </p>
        </div>
      </div>
    </footer>
  );
}
