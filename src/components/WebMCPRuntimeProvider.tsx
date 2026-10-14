"use client";

import { useEffect, useState } from "react";
import { SITE_WEBMCP_TOOLS, invokeSiteWebMCPTool } from "@/lib/site-webmcp-tools";

export interface RegisteredWebMCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: {
    readOnlyHint: boolean;
    consequentialHint: boolean;
    untrustedContentHint: boolean;
  };
  execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

declare global {
  interface Navigator {
    modelContext?: {
      version: string;
      domain: string;
      tools: Map<string, RegisteredWebMCPTool>;
      registerTool: (tool: RegisteredWebMCPTool) => void;
      unregisterTool: (name: string) => void;
      listTools: () => RegisteredWebMCPTool[];
      callTool: (name: string, args?: Record<string, unknown>) => Promise<Record<string, unknown>>;
      provideContext: (ctx: { tools: RegisteredWebMCPTool[] }) => void;
    };
  }
}

export function WebMCPRuntimeProvider() {
  const [registeredCount, setRegisteredCount] = useState<number>(6);
  const [lastCall, setLastCall] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<string>("ask_site");
  const [toolResult, setToolResult] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const toolMap = new Map<string, RegisteredWebMCPTool>();

    const modelContextApi = {
      version: "2.0.0-w3c-webmcp",
      domain: "mahoneycontextprotocol.com",
      tools: toolMap,
      registerTool: (tool: RegisteredWebMCPTool) => {
        toolMap.set(tool.name, tool);
      },
      unregisterTool: (name: string) => {
        toolMap.delete(name);
      },
      listTools: () => Array.from(toolMap.values()),
      callTool: async (name: string, args: Record<string, unknown> = {}) => {
        setLastCall(`${name}() @ ${new Date().toLocaleTimeString()}`);
        const found = toolMap.get(name);
        if (found) {
          return await found.execute(args);
        }
        return await invokeSiteWebMCPTool(name, args);
      },
      provideContext: (ctx: { tools: RegisteredWebMCPTool[] }) => {
        for (const t of ctx.tools) {
          toolMap.set(t.name, t);
        }
      },
    };

    try {
      Object.defineProperty(window.navigator, "modelContext", {
        value: modelContextApi,
        configurable: true,
        writable: true,
      });
    } catch {
      (window.navigator as Navigator).modelContext = modelContextApi;
    }

    for (const tool of SITE_WEBMCP_TOOLS) {
      window.navigator.modelContext?.registerTool({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        annotations: tool.annotations,
        execute: tool.execute,
      });
    }

    setRegisteredCount(window.navigator.modelContext?.listTools().length || 6);
  }, []);

  const handleRunSiteTool = async (toolName: string) => {
    setActiveTool(toolName);
    const defaultArgs: Record<string, Record<string, unknown>> = {
      scan_domain_readiness: { domain: "mahoneycontextprotocol.com" },
      recommend_vertical_pack: {
        industryDescription: "Enterprise SaaS + Climate ESG & Accessibility compliance",
      },
      generate_foundation_config: {
        domain: "mahoneycontextprotocol.com",
        organizationName: "Mahoney Context Protocol",
      },
      simulate_vertical_tool: {
        toolId: "check-recalls",
        input: { vin: "1HGCM82633A004352" },
        mode: "execute",
      },
      calculate_roi_and_pricing: {
        monthlyRequests: 500000,
        averageOrderValueUSD: 240,
        regulatedIndustry: true,
      },
      ask_site: {
        question: "What are the 27 protocols and 3 pricing tiers?",
      },
    };

    const res = await window.navigator.modelContext?.callTool(
      toolName,
      defaultArgs[toolName] || {}
    );
    setToolResult(JSON.stringify(res, null, 2));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {drawerOpen && (
        <div className="mb-3 w-[380px] sm:w-[440px] rounded-2xl border border-white/[0.12] bg-[#0c0c0f]/95 p-4 shadow-2xl backdrop-blur-xl text-zinc-100">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  navigator.modelContext Live Bus
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                100/100 Dogfooding: {registeredCount} Site Tools · 23 Verticals (184 Tools) · 27 Protocols
              </p>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg border border-white/[0.08] px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-2">
              Click any registered WebMCP tool to invoke in-browser:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SITE_WEBMCP_TOOLS.map((t) => (
                <button
                  key={t.name}
                  onClick={() => handleRunSiteTool(t.name)}
                  className={`rounded-lg border px-2.5 py-1.5 text-left font-mono text-[11px] transition ${
                    activeTool === t.name && toolResult
                      ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                      : "border-white/[0.08] bg-[#121215] text-zinc-300 hover:border-white/[0.16] hover:bg-zinc-900"
                  }`}
                >
                  <div className="truncate font-semibold">{t.name}</div>
                  <div className="text-[10px] text-zinc-500">
                    {t.annotations.readOnlyHint ? "readOnly" : "consequential"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {lastCall && (
            <div className="mt-2.5 font-mono text-[11px] text-emerald-400">
              Last Call: {lastCall}
            </div>
          )}

          {toolResult && (
            <pre className="mt-2 max-h-48 overflow-auto rounded-xl border border-white/[0.08] bg-[#09090b] p-2.5 font-mono text-[11px] text-emerald-300">
              {toolResult}
            </pre>
          )}
        </div>
      )}

      <button
        onClick={() => setDrawerOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-[#09090b]/95 px-4 py-2.5 text-xs font-medium text-zinc-100 shadow-lg shadow-black/60 backdrop-blur-md transition hover:border-emerald-400 hover:bg-[#121215]"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-emerald-400 font-semibold">WebMCP 27/27</span>
        <span className="text-zinc-300 hidden sm:inline">
          navigator.modelContext ({registeredCount} site + 184 vertical tools)
        </span>
      </button>
    </div>
  );
}
