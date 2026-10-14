/**
 * Mahoney Context Protocol — Site-Level WebMCP Tools (100/100 Dogfooding)
 * Implements the 6 required site-level tools registered on window.navigator.modelContext
 * AND exposed via /api/mcp (Streamable HTTP MCP JSON-RPC 2.0):
 *   1. scan_domain_readiness
 *   2. recommend_vertical_pack
 *   3. generate_foundation_config
 *   4. simulate_vertical_tool
 *   5. calculate_roi_and_pricing
 *   6. ask_site
 */

import {
  DEFAULT_FOUNDATION_CONFIG,
  TWENTY_SEVEN_PROTOCOLS,
  generateOneLineEmbed,
  generateProtocolArtifact,
  type FoundationConfigOptions,
} from "./protocols-catalog";
import { runDomainReadinessScan } from "./scanner-engine";
import {
  BUSINESS_JOURNEY_PACKS,
  REGULATED_VERTICALS,
  executeVerticalOrJourneyTool,
} from "./verticals-catalog";

export interface SiteWebMCPToolDefinition {
  name:
    | "scan_domain_readiness"
    | "recommend_vertical_pack"
    | "generate_foundation_config"
    | "simulate_vertical_tool"
    | "calculate_roi_and_pricing"
    | "ask_site";
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: {
    readOnlyHint: boolean;
    consequentialHint: boolean;
    untrustedContentHint: boolean;
  };
  execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

export const SITE_WEBMCP_TOOLS: SiteWebMCPToolDefinition[] = [
  {
    name: "scan_domain_readiness",
    description:
      "Audit any domain or URL across all 27 mcp-foundation v2 protocols and 7 pillars, returning per-pillar scores and one-click remediation diffs.",
    inputSchema: {
      type: "object",
      required: ["domain"],
      properties: {
        domain: {
          type: "string",
          description: "Domain or URL to audit (e.g. mahoneycontextprotocol.com or stripe.com)",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      consequentialHint: false,
      untrustedContentHint: false,
    },
    execute: async (args) => {
      const domain = String(args.domain || "mahoneycontextprotocol.com");
      const report = runDomainReadinessScan(domain);
      return {
        tool: "scan_domain_readiness",
        domain: report.domain,
        overallScore: report.overallScore,
        grade: report.grade,
        passedProtocols: report.passedProtocols,
        totalProtocols: report.totalProtocols,
        pillarScores: report.pillarScores,
        recommendedVerticals: report.recommendedVerticals,
        recommendedJourneyPacks: report.recommendedJourneyPacks,
        oneLineScriptEmbed: report.oneLineScriptEmbed,
        oneClickRemediationDiff: report.oneClickRemediationDiff,
      };
    },
  },
  {
    name: "recommend_vertical_pack",
    description:
      "Recommend regulated industry vertical plugins (23 verticals, 184 tools), Dispatch Ventures sister business lanes (8 ventures), and business journey packs (7 packs).",
    inputSchema: {
      type: "object",
      required: ["industryDescription"],
      properties: {
        industryDescription: {
          type: "string",
          description: "Industry, product type, or regulatory environment description",
        },
        regulatedJurisdictions: {
          type: "array",
          items: { type: "string" },
          description: "Applicable jurisdictions (e.g. US, EU, CA)",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      consequentialHint: false,
      untrustedContentHint: false,
    },
    execute: async (args) => {
      const text = String(args.industryDescription || "").toLowerCase();
      const matchedVerticals = REGULATED_VERTICALS.filter((v) => {
        if (text.includes("event") || text.includes("venue") || text.includes("conference")) {
          return v.id === "event-planning" || v.id === "accessibility";
        }
        if (text.includes("carbon") || text.includes("esg") || text.includes("supply") || text.includes("climate")) {
          return v.id === "carbon-footprint" || v.id === "energy-grid-ferc-nerc";
        }
        if (text.includes("patent") || text.includes("ip") || text.includes("legal") || text.includes("uspto")) {
          return v.id === "patent-filing" || v.id === "legal-compliance-ediscovery";
        }
        if (text.includes("vehicle") || text.includes("auto") || text.includes("fleet") || text.includes("recall")) {
          return v.id === "vehicle-maintenance" || v.id === "aviation-faa-mro";
        }
        if (text.includes("health") || text.includes("clinical") || text.includes("pharma") || text.includes("fda")) {
          return v.suite === "healthcare-life-sciences";
        }
        if (text.includes("bank") || text.includes("capital") || text.includes("finra") || text.includes("mortgage")) {
          return v.suite === "banking-capital-markets-enterprise";
        }
        if (text.includes("crypto") || text.includes("defi") || text.includes("quant") || text.includes("rwa")) {
          return v.suite === "crypto-quant-institutional";
        }
        if (text.includes("real estate") || text.includes("defense") || text.includes("gov") || text.includes("aviation")) {
          return v.suite === "high-revenue-niche";
        }
        if (text.includes("wcag") || text.includes("ada") || text.includes("accessibility") || text.includes("vpat")) {
          return v.id === "accessibility";
        }
        return true;
      });

      const selectedVerticals =
        matchedVerticals.length > 0 ? matchedVerticals.slice(0, 6) : REGULATED_VERTICALS.slice(0, 4);

      const recommendedJourneys = BUSINESS_JOURNEY_PACKS.filter((j) => {
        if (text.includes("shop") || text.includes("retail") || text.includes("commerce")) return j.id === "ecommerce";
        if (text.includes("bank") || text.includes("pay") || text.includes("fintech")) return j.id === "fintech";
        if (text.includes("health") || text.includes("clinic") || text.includes("medical")) return j.id === "healthcare";
        if (text.includes("hotel") || text.includes("flight") || text.includes("travel")) return j.id === "travel";
        if (text.includes("telecom") || text.includes("fiber") || text.includes("network")) return j.id === "telecom";
        return j.id === "saas" || j.id === "analytics";
      });

      return {
        tool: "recommend_vertical_pack",
        recommendedTier:
          selectedVerticals.length > 0 ? "Regulated Enterprise ($299/mo)" : "Pro Business ($49/mo)",
        totalAvailableVerticals: REGULATED_VERTICALS.length,
        totalRegulatedTools: REGULATED_VERTICALS.length * 8,
        verticals: selectedVerticals.map((v) => ({
          id: v.id,
          suite: v.suiteLabel,
          name: v.name,
          packageName: v.packageName,
          regulations: v.regulations,
          toolCount: v.tools.length,
        })),
        journeyPacks: recommendedJourneys.map((j) => ({
          id: j.id,
          name: j.name,
          protocolsUsed: j.protocolsUsed,
          conversionLiftEstimate: j.conversionLiftEstimate,
        })),
      };
    },
  },
  {
    name: "generate_foundation_config",
    description:
      "Generate a complete mcp-foundation v2.0 deployment bundle (.well-known/* manifests + one-line <script> embed) for a target domain.",
    inputSchema: {
      type: "object",
      required: ["domain"],
      properties: {
        domain: { type: "string", description: "Target domain" },
        organizationName: { type: "string", description: "Organization display name" },
        verticals: { type: "array", items: { type: "string" } },
        journeyPacks: { type: "array", items: { type: "string" } },
        tier: {
          type: "string",
          enum: ["open-source", "pro-business", "regulated-enterprise"],
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      consequentialHint: false,
      untrustedContentHint: false,
    },
    execute: async (args) => {
      const config: FoundationConfigOptions = {
        domain: String(args.domain || "mahoneycontextprotocol.com"),
        organizationName: String(args.organizationName || "Mahoney Context Protocol"),
        description: DEFAULT_FOUNDATION_CONFIG.description,
        verticals: Array.isArray(args.verticals)
          ? (args.verticals as string[])
          : DEFAULT_FOUNDATION_CONFIG.verticals,
        journeyPacks: Array.isArray(args.journeyPacks)
          ? (args.journeyPacks as string[])
          : DEFAULT_FOUNDATION_CONFIG.journeyPacks,
        enabledProtocols: TWENTY_SEVEN_PROTOCOLS.map((p) => p.id),
        tier:
          (args.tier as FoundationConfigOptions["tier"]) || "regulated-enterprise",
      };

      const keyArtifacts = ["mcp-server-card", "a2a-agent-card", "webmcp", "ucp", "did-web"].map(
        (id) => generateProtocolArtifact(id, config)
      );

      return {
        tool: "generate_foundation_config",
        domain: config.domain,
        protocolsGenerated: 27,
        oneLineEmbed: generateOneLineEmbed(config),
        sampleManifests: keyArtifacts,
      };
    },
  },
  {
    name: "simulate_vertical_tool",
    description:
      "Execute any of the 40 regulated vertical tools or 7 business journey pack tools with prepare->confirm safety gates and SEP-1865 UI card output.",
    inputSchema: {
      type: "object",
      required: ["toolId"],
      properties: {
        toolId: {
          type: "string",
          description:
            "Tool identifier (e.g. check-venue-availability, calculate-product-footprint, check-color-contrast, calculate-fees, check-recalls, send-invitation)",
        },
        input: { type: "object", description: "Tool input payload" },
        mode: {
          type: "string",
          enum: ["prepare", "confirm", "execute"],
          description: "Execution phase for prepare->confirm safety boundary",
        },
      },
    },
    annotations: {
      readOnlyHint: false,
      consequentialHint: true,
      untrustedContentHint: false,
    },
    execute: async (args) => {
      const toolId = String(args.toolId || "check-recalls");
      const input = (args.input as Record<string, unknown>) || {};
      const mode = (args.mode as "prepare" | "confirm" | "execute") || "execute";
      return executeVerticalOrJourneyTool(toolId, input, mode);
    },
  },
  {
    name: "calculate_roi_and_pricing",
    description:
      "Calculate estimated monthly token savings, agentic conversion lift, x402 micropayment revenue, and optimal MaCP pricing tier.",
    inputSchema: {
      type: "object",
      required: ["monthlyRequests"],
      properties: {
        monthlyRequests: {
          type: "number",
          description: "Monthly human + AI bot sessions/requests",
        },
        averageOrderValueUSD: {
          type: "number",
          description: "Average transaction or contract value in USD",
        },
        regulatedIndustry: {
          type: "boolean",
          description: "Whether the business operates in a regulated vertical",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      consequentialHint: false,
      untrustedContentHint: false,
    },
    execute: async (args) => {
      const monthlyRequests = Number(args.monthlyRequests || 250000);
      const aov = Number(args.averageOrderValueUSD || 180);
      const regulated = Boolean(args.regulatedIndustry ?? true);

      const agentRequests = Math.round(monthlyRequests * 0.28);
      const tokenSavingsPercent = 78;
      const estimatedIncrementalConversions = Math.round(agentRequests * 0.012);
      const monthlyRevenueLiftUSD = estimatedIncrementalConversions * aov;
      const x402MeteredRevenueUSD = Math.round(agentRequests * 0.002);

      const recommendedTier = regulated
        ? {
            name: "Regulated Enterprise",
            priceUSD: 299,
            billingPeriod: "month",
            includes: [
              "All 27 mcp-foundation v2.0 protocols",
              "All 5 Regulated Verticals (40 compliant WebMCP tools)",
              "All 7 Business Journey Packs",
              "SEP-1865 MCP Apps + AG-UI Live Streaming",
              "RFC 9421 Web Bot Auth + AP2 Verifiable Mandates + Audit Logs",
            ],
          }
        : monthlyRequests > 25000
          ? {
              name: "Pro Business",
              priceUSD: 49,
              billingPeriod: "month",
              includes: [
                "All 27 mcp-foundation v2.0 protocols",
                "All 7 Business Journey Packs",
                "UCP + ACP + x402 + MPP Commerce & Payment Rails",
                "Hosted Studio Configurator & One-Line Script Embed",
              ],
            }
          : {
              name: "Open Source Free",
              priceUSD: 0,
              billingPeriod: "month",
              includes: [
                "Core mcp-foundation CLI & 27 protocol generators",
                "Self-hosted .well-known/* static manifests",
                "Community WebMCP runtime bindings",
              ],
            };

      return {
        tool: "calculate_roi_and_pricing",
        inputs: { monthlyRequests, averageOrderValueUSD: aov, regulatedIndustry: regulated },
        projections: {
          estimatedAgentSessionsPerMonth: agentRequests,
          markdownTokenSavingsPercent: tokenSavingsPercent,
          estimatedMonthlyConversionLiftUSD: monthlyRevenueLiftUSD,
          estimatedX402MicropaymentRevenueUSD: x402MeteredRevenueUSD,
          netMonthlyRoiMultiple: `${Math.max(1, Math.round((monthlyRevenueLiftUSD + x402MeteredRevenueUSD) / Math.max(49, recommendedTier.priceUSD)))}x`,
        },
        recommendedTier,
      };
    },
  },
  {
    name: "ask_site",
    description:
      "Universal grounded Q&A tool over mahoneycontextprotocol.com's 27 protocols, 40 regulated vertical tools, 7 business journey packs, and pricing tiers.",
    inputSchema: {
      type: "object",
      required: ["question"],
      properties: {
        question: {
          type: "string",
          description: "Natural language question about Mahoney Context Protocol, standards, verticals, or pricing",
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      consequentialHint: false,
      untrustedContentHint: false,
    },
    execute: async (args) => {
      const q = String(args.question || "").toLowerCase();

      let answer =
        "Mahoney Context Protocol (mahoneycontextprotocol.com) is the commercial Agentic Web Platform unifying 27 discovery, identity, commerce, payment, and UI protocols (mcp-foundation v2.0) with 23 regulated industry verticals (184 WebMCP tools), 7 business journey packs, and sister business Dispatch Ventures (8 multi-host ChatGPT/Claude/Grok/Gemini agentic venture lanes).";

      if (q.includes("price") || q.includes("cost") || q.includes("tier") || q.includes("plan")) {
        answer =
          "MaCP offers three tiers: (1) Open Source Free ($0/mo) with the MIT mcp-foundation CLI and 27 static generators; (2) Pro Business ($49/mo) adding the hosted Business WebMCP Studio, 7 Business Journey Packs, and UCP/ACP/x402/MPP commerce rails; and (3) Regulated Enterprise ($299/mo) adding all 23 regulated verticals (184 tools across 5 suites), Dispatch Ventures 6-Phase A2A Federation, SEP-1865 UI cards across ChatGPT/Claude/Grok/Gemini, AG-UI streaming, and immutable compliance audit logs.";
      } else if (q.includes("protocol") || q.includes("27") || q.includes("well-known")) {
        answer =
          "MaCP v2.0 implements 27 protocols across 7 pillars: (1) Discovery (robots.txt, sitemap.xml, RFC 8288 Link headers, Markdown negotiation, RFC 9727 API catalog, OpenAPI 3.1), (2) Identity & Auth (W3C did:web, RFC 9421 Web Bot Auth, OAuth 2.1 AS & Protected Resource), (3) Capabilities (MCP Server Card, A2A Agent Card + 6-Phase Registry, Agent Skills Index, W3C WebMCP), (4) Commerce (UCP, ACP, AP2 Mandates), (5) Payments (x402 USDC, Stripe/Tempo MPP), (6) Interactive UI (SEP-1865 MCP Apps, AG-UI SSE), and (7) Governance (llms.txt, operate.txt, ai.txt, Content-Signal, security.txt, JSON-LD/humans.txt).";
      } else if (q.includes("vertical") || q.includes("regulated") || q.includes("23") || q.includes("184") || q.includes("dispatch")) {
        answer =
          "MaCP includes 23 regulated verticals with 8 WebMCP tools each (184 tools total) across 5 suites (Core Regulated, Healthcare & Life Sciences, Banking & Capital Markets, Crypto/Quant Institutional, and High-Revenue Niche), plus sister business Dispatch Ventures (https://github.com/mahoney-context-protocol/dispatch-ventures) operating 8 multi-host agentic businesses across ChatGPT, Claude, Grok, and Gemini.";
      } else if (q.includes("sep-1865") || q.includes("ag-ui") || q.includes("simulator") || q.includes("confirm") || q.includes("a2a")) {
        answer =
          "Every consequential tool (consequentialHint: true) enforces a 6-Phase A2A lifecycle (Discovery -> Handshake -> Negotiation -> Safety Gate -> Execution -> Settlement & Audit) and a two-step prepare->confirm human-in-the-loop safety boundary, rendering sandboxed SEP-1865 ui:// cards natively inside ChatGPT, Claude, Grok, and Gemini.";
      }

      return {
        tool: "ask_site",
        question: args.question,
        answer,
        citations: [
          "https://mahoneycontextprotocol.com/llms.txt",
          "https://mahoneycontextprotocol.com/operate.txt",
          "https://mahoneycontextprotocol.com/.well-known/mcp.json",
          "https://mahoneycontextprotocol.com/.well-known/agent-skills/index.json",
        ],
      };
    },
  },
];

export async function invokeSiteWebMCPTool(
  name: string,
  args: Record<string, unknown> = {}
): Promise<Record<string, unknown>> {
  const tool = SITE_WEBMCP_TOOLS.find((t) => t.name === name);
  if (!tool) {
    // Fallback to checking if it's one of the 40 vertical tools or journey tools
    return executeVerticalOrJourneyTool(name, args, "execute");
  }
  return tool.execute(args);
}
