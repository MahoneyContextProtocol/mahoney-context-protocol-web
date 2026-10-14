/**
 * Mahoney Context Protocol (MaCP) v2.0 — 27 Protocols across 7 Pillars
 * Authoritative registry of all 27 mcp-foundation v2 protocols, discovery endpoints,
 * RFC/W3C/IETF standards, and deterministic generator templates.
 */

export type PillarId =
  | "discovery"
  | "identity"
  | "capabilities"
  | "commerce"
  | "payments"
  | "ui-runtime"
  | "governance";

export interface ProtocolPillar {
  id: PillarId;
  name: string;
  shortName: string;
  description: string;
  weight: number;
  color: string;
}

export interface ProtocolDefinition {
  id: string;
  number: number;
  name: string;
  pillar: PillarId;
  endpoint: string;
  contentType: string;
  standard: string;
  version: string;
  isNewInV2: boolean;
  description: string;
  remediationHint: string;
  weight: number;
}

export const PROTOCOL_PILLARS: ProtocolPillar[] = [
  {
    id: "discovery",
    name: "1. Web & Content Discovery",
    shortName: "Discovery",
    description: "Crawl directives, sitemaps, RFC 8288 Link headers, Markdown negotiation, and OpenAPI/API catalogs.",
    weight: 15,
    color: "emerald",
  },
  {
    id: "identity",
    name: "2. Cryptographic Identity & Auth",
    shortName: "Identity & Auth",
    description: "W3C did:web, RFC 9421 HTTP Message Signatures (Web Bot Auth), and OAuth 2.1 AS/Protected Resource metadata.",
    weight: 15,
    color: "cyan",
  },
  {
    id: "capabilities",
    name: "3. Agent Cards, MCP & Skills",
    shortName: "Capabilities",
    description: "MCP Server Cards, Google A2A Agent Cards, Agent Skills Index, and W3C WebMCP navigator.modelContext.",
    weight: 20,
    color: "indigo",
  },
  {
    id: "commerce",
    name: "4. Agentic Commerce & Mandates",
    shortName: "Commerce",
    description: "Universal Commerce Protocol (UCP), Agentic Commerce Protocol (ACP), and Agent Payments Protocol (AP2 Mandates).",
    weight: 15,
    color: "violet",
  },
  {
    id: "payments",
    name: "5. Machine-to-Machine Settlement",
    shortName: "Payments",
    description: "HTTP 402 x402 stablecoin micropayments and Stripe/Tempo Machine Payments Protocol (MPP).",
    weight: 10,
    color: "amber",
  },
  {
    id: "ui-runtime",
    name: "6. Interactive Agent UI & Streaming",
    shortName: "UI & Runtime",
    description: "SEP-1865 MCP Apps (ui:// sandboxed surfaces) and AG-UI bi-directional agent-user event streams.",
    weight: 15,
    color: "rose",
  },
  {
    id: "governance",
    name: "7. Policy, Context & Security",
    shortName: "Governance",
    description: "llms.txt, operate.txt, ai.txt, Content-Signal headers, RFC 9116 security.txt, JSON-LD, and humans.txt.",
    weight: 10,
    color: "teal",
  },
];

export const TWENTY_SEVEN_PROTOCOLS: ProtocolDefinition[] = [
  // Pillar 1: Discovery (6)
  {
    id: "robots-txt",
    number: 1,
    name: "Agent-Aware robots.txt",
    pillar: "discovery",
    endpoint: "/robots.txt",
    contentType: "text/plain",
    standard: "RFC 9309 + AI Crawler Directives",
    version: "2.0",
    isNewInV2: false,
    description: "Explicit crawl rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and agent discovery pointers.",
    remediationHint: "Add AI user-agent blocks and Sitemap/Host directives in /robots.txt.",
    weight: 3,
  },
  {
    id: "sitemap-xml",
    number: 2,
    name: "Semantic Sitemap XML",
    pillar: "discovery",
    endpoint: "/sitemap.xml",
    contentType: "application/xml",
    standard: "sitemaps.org 0.9 + Agent Priority",
    version: "2.0",
    isNewInV2: false,
    description: "Canonical URL inventory indexing human routes and machine-readable agent endpoints.",
    remediationHint: "Generate /sitemap.xml including canonical pages and agent documentation routes.",
    weight: 2,
  },
  {
    id: "link-headers",
    number: 3,
    name: "RFC 8288 Web Linking Headers",
    pillar: "discovery",
    endpoint: "HTTP Header: Link",
    contentType: "text/plain",
    standard: "RFC 8288 Web Linking",
    version: "2.0",
    isNewInV2: false,
    description: "Advertises service-desc, api-catalog, mcp-server, agent-card, and ucp relations on every HTTP response.",
    remediationHint: "Emit Link headers pointing to /.well-known/api-catalog and /.well-known/mcp.json.",
    weight: 3,
  },
  {
    id: "markdown-negotiation",
    number: 4,
    name: "Accept: text/markdown Negotiation",
    pillar: "discovery",
    endpoint: "/llms-full.txt",
    contentType: "text/markdown",
    standard: "HTTP Content Negotiation (RFC 9110)",
    version: "2.0",
    isNewInV2: false,
    description: "Serves token-efficient, deterministic Markdown representations when agents send Accept: text/markdown.",
    remediationHint: "Add middleware or /llms-full.txt endpoint responding with clean Markdown + X-Markdown-Tokens.",
    weight: 3,
  },
  {
    id: "api-catalog",
    number: 5,
    name: "RFC 9727 API Catalog (linkset+json)",
    pillar: "discovery",
    endpoint: "/.well-known/api-catalog",
    contentType: "application/linkset+json",
    standard: "IETF RFC 9727 (linkset+json)",
    version: "2.0",
    isNewInV2: false,
    description: "Machine-readable linkset indexing all REST, MCP, A2A, UCP, ACP, and OpenAPI endpoints.",
    remediationHint: "Publish /.well-known/api-catalog with RFC 9727 linkset entries.",
    weight: 2,
  },
  {
    id: "openapi-discovery",
    number: 6,
    name: "OpenAPI 3.1 Specification",
    pillar: "discovery",
    endpoint: "/.well-known/openapi.json",
    contentType: "application/json",
    standard: "OpenAPI 3.1.0",
    version: "3.1.0",
    isNewInV2: false,
    description: "Complete OpenAPI 3.1 schema for HTTP tool invocation, scanner endpoints, and vertical execution.",
    remediationHint: "Expose /.well-known/openapi.json with operationIds matching WebMCP tools.",
    weight: 2,
  },

  // Pillar 2: Identity & Auth (4)
  {
    id: "did-web",
    number: 7,
    name: "W3C did:web Identity Document",
    pillar: "identity",
    endpoint: "/.well-known/did.json",
    contentType: "application/did+ld+json",
    standard: "W3C DID Core 1.0 + did:web",
    version: "2.0",
    isNewInV2: false,
    description: "Cryptographic domain identity anchoring all 27 MahoneyContextProtocolFoundation service endpoints.",
    remediationHint: "Publish /.well-known/did.json with Ed25519 verificationMethod and service bindings.",
    weight: 4,
  },
  {
    id: "web-bot-auth",
    number: 8,
    name: "RFC 9421 Web Bot Auth Directory",
    pillar: "identity",
    endpoint: "/.well-known/http-message-signatures-directory",
    contentType: "application/http-message-signatures-directory+json",
    standard: "IETF RFC 9421 + Cloudflare Web Bot Auth",
    version: "2.0",
    isNewInV2: true,
    description: "JWKS public key directory and Signature-Input verification policy for cryptographic agent authentication.",
    remediationHint: "Expose /.well-known/http-message-signatures-directory with Ed25519 JWK set.",
    weight: 5,
  },
  {
    id: "oauth-discovery",
    number: 9,
    name: "OAuth 2.1 Authorization Server Metadata",
    pillar: "identity",
    endpoint: "/.well-known/oauth-authorization-server",
    contentType: "application/json",
    standard: "RFC 8414 + OAuth 2.1 PKCE",
    version: "2.0",
    isNewInV2: false,
    description: "OAuth 2.1 token, authorization, dynamic client registration, and scopes metadata for delegated agents.",
    remediationHint: "Publish /.well-known/oauth-authorization-server with S256 PKCE and MCP scopes.",
    weight: 3,
  },
  {
    id: "oauth-protected-resource",
    number: 10,
    name: "OAuth 2.0 Protected Resource Metadata",
    pillar: "identity",
    endpoint: "/.well-known/oauth-protected-resource",
    contentType: "application/json",
    standard: "RFC 9728 Protected Resource Metadata",
    version: "2.0",
    isNewInV2: false,
    description: "Binds protected MCP/API resources to trusted authorization servers and required bearer scopes.",
    remediationHint: "Publish /.well-known/oauth-protected-resource listing authorization_servers and scopes_supported.",
    weight: 3,
  },

  // Pillar 3: Capabilities (4)
  {
    id: "mcp-server-card",
    number: 11,
    name: "MCP Server Card",
    pillar: "capabilities",
    endpoint: "/.well-known/mcp.json",
    contentType: "application/json",
    standard: "Model Context Protocol 2025-11-25",
    version: "2025-11-25",
    isNewInV2: false,
    description: "Declares MCP Streamable HTTP transports, tools, resources, prompts, and SEP-1865 UI extensions.",
    remediationHint: "Create /.well-known/mcp.json advertising MCP tools and transport endpoints.",
    weight: 5,
  },
  {
    id: "a2a-agent-card",
    number: 12,
    name: "A2A Agent Card",
    pillar: "capabilities",
    endpoint: "/.well-known/agent-card.json",
    contentType: "application/json",
    standard: "Google / Linux Foundation A2A v0.3",
    version: "0.3.0",
    isNewInV2: false,
    description: "Agent-to-Agent discovery manifest defining multi-agent delegation skills, input/output modes, and auth.",
    remediationHint: "Publish /.well-known/agent-card.json (and alias /.well-known/agent.json).",
    weight: 5,
  },
  {
    id: "agent-skills",
    number: 13,
    name: "Agent Skills Index",
    pillar: "capabilities",
    endpoint: "/.well-known/agent-skills/index.json",
    contentType: "application/json",
    standard: "Agent Skills Discovery v2.0",
    version: "2.0",
    isNewInV2: false,
    description: "Structured catalog of 40 regulated vertical tools and 7 business journey packs with SHA-256 digests.",
    remediationHint: "Expose /.well-known/agent-skills/index.json mapping skill IDs to schemas and safety hints.",
    weight: 5,
  },
  {
    id: "webmcp",
    number: 14,
    name: "W3C WebMCP Runtime Manifest",
    pillar: "capabilities",
    endpoint: "/.well-known/webmcp.json",
    contentType: "application/json",
    standard: "W3C WebMCP Draft + navigator.modelContext",
    version: "2.0",
    isNewInV2: false,
    description: "Browser-native navigator.modelContext.registerTool bindings with readOnlyHint, consequentialHint, and prepare->confirm gates.",
    remediationHint: "Register tools on window.navigator.modelContext and publish /.well-known/webmcp.json.",
    weight: 5,
  },

  // Pillar 4: Commerce (3)
  {
    id: "ucp",
    number: 15,
    name: "Universal Commerce Protocol (UCP)",
    pillar: "commerce",
    endpoint: "/.well-known/ucp.json",
    contentType: "application/json",
    standard: "Shopify / Google UCP 2026-01",
    version: "2026-01",
    isNewInV2: true,
    description: "Standardized product catalog discovery, real-time quote generation, tax/shipping calculation, and order handoff.",
    remediationHint: "Publish /.well-known/ucp.json with catalog, cart, and checkout state-machine endpoints.",
    weight: 5,
  },
  {
    id: "acp",
    number: 16,
    name: "Agentic Commerce Protocol (ACP)",
    pillar: "commerce",
    endpoint: "/.well-known/acp.json",
    contentType: "application/json",
    standard: "OpenAI / Stripe ACP 2026-01",
    version: "2026-01",
    isNewInV2: true,
    description: "Shared payment token checkout sessions, delegated buyer verification, and webhook fulfillment lifecycle.",
    remediationHint: "Publish /.well-known/acp.json with checkout_session_endpoint and shared_payment_token support.",
    weight: 5,
  },
  {
    id: "ap2",
    number: 17,
    name: "Agent Payments Protocol (AP2 Mandates)",
    pillar: "commerce",
    endpoint: "/.well-known/ap2.json",
    contentType: "application/json",
    standard: "Google AP2 Verifiable Mandates v1.0",
    version: "1.0.0",
    isNewInV2: true,
    description: "Verifiable Intent Mandates and Cart Mandates with cryptographic spending caps and human-present/absent proofs.",
    remediationHint: "Expose /.well-known/ap2.json supporting verifiable_credentials intent_mandate and cart_mandate.",
    weight: 5,
  },

  // Pillar 5: Payments (2)
  {
    id: "x402",
    number: 18,
    name: "x402 HTTP 402 Micropayments",
    pillar: "payments",
    endpoint: "/.well-known/x402.json",
    contentType: "application/json",
    standard: "Coinbase / Cloudflare x402 v1.0",
    version: "1.0.0",
    isNewInV2: true,
    description: "Zero-account HTTP 402 Payment Required settlement in USDC on Base/Solana with X-PAYMENT header verification.",
    remediationHint: "Publish /.well-known/x402.json with facilitator URL, network, asset, and per-route pricing.",
    weight: 5,
  },
  {
    id: "mpp",
    number: 19,
    name: "Machine Payments Protocol (MPP)",
    pillar: "payments",
    endpoint: "/.well-known/mpp.json",
    contentType: "application/json",
    standard: "Stripe / Tempo IETF Draft MPP v1.0",
    version: "1.0.0",
    isNewInV2: true,
    description: "Session-based streaming budgets, metering, and multi-rail settlement (Stripe SPT + Tempo + Fiat).",
    remediationHint: "Publish /.well-known/mpp.json defining payment intents, budget sessions, and settlement rails.",
    weight: 5,
  },

  // Pillar 6: Interactive Agent UI & Streaming (2)
  {
    id: "mcp-apps",
    number: 20,
    name: "SEP-1865 MCP Apps (ui://)",
    pillar: "ui-runtime",
    endpoint: "/.well-known/mcp-apps.json",
    contentType: "application/json",
    standard: "MCP SEP-1865 Interactive UI Extension",
    version: "2026-01",
    isNewInV2: true,
    description: "Sandboxed ui:// interactive cards rendered inside host agent chats with JSON-RPC postMessage handshakes.",
    remediationHint: "Publish /.well-known/mcp-apps.json declaring ui:// templates, CSP sandboxes, and tool bindings.",
    weight: 8,
  },
  {
    id: "ag-ui",
    number: 21,
    name: "AG-UI Event Stream Protocol",
    pillar: "ui-runtime",
    endpoint: "/.well-known/ag-ui.json",
    contentType: "application/json",
    standard: "CopilotKit / AG-UI Bi-Directional Protocol v1.0",
    version: "1.0.0",
    isNewInV2: true,
    description: "Typed Server-Sent Events (TEXT_MESSAGE_CONTENT, TOOL_CALL_START, STATE_DELTA, INTERRUPT_CONFIRMATION).",
    remediationHint: "Publish /.well-known/ag-ui.json and stream typed AG-UI events over SSE.",
    weight: 7,
  },

  // Pillar 7: Governance & Context (6)
  {
    id: "llms-txt",
    number: 22,
    name: "llms.txt Context Summary",
    pillar: "governance",
    endpoint: "/llms.txt",
    contentType: "text/plain",
    standard: "llmstxt.org v1.0",
    version: "1.0",
    isNewInV2: false,
    description: "Concise Markdown index of site architecture, capabilities, pricing, and deep-link documentation for LLMs.",
    remediationHint: "Serve /llms.txt with structured H1/H2 sections and canonical links.",
    weight: 2,
  },
  {
    id: "operate-txt",
    number: 23,
    name: "operate.txt Agent Operating Manual",
    pillar: "governance",
    endpoint: "/operate.txt",
    contentType: "text/plain",
    standard: "MaCP operate.txt v2.0",
    version: "2.0",
    isNewInV2: false,
    description: "Operational rules of engagement: probe-gated orchestration, prepare->confirm gates, rate limits, and escalation.",
    remediationHint: "Serve /operate.txt detailing safe read-only vs consequential tool execution policies.",
    weight: 2,
  },
  {
    id: "ai-txt",
    number: 24,
    name: "ai.txt Usage & Training Permissions",
    pillar: "governance",
    endpoint: "/ai.txt",
    contentType: "text/plain",
    standard: "spawning.ai / TDMRep ai.txt",
    version: "1.1",
    isNewInV2: false,
    description: "Granular permissions for commercial AI training, RAG grounding, real-time citation, and agentic tool execution.",
    remediationHint: "Publish /ai.txt specifying Allow/Disallow rules for Training, Inference, and AgentExecution.",
    weight: 1,
  },
  {
    id: "content-signals",
    number: 25,
    name: "Content-Signal Policy Manifest",
    pillar: "governance",
    endpoint: "/.well-known/content-signals.json",
    contentType: "application/json",
    standard: "EU TDM / IETF AI Content-Signal",
    version: "2.0",
    isNewInV2: false,
    description: "Machine-verifiable Content-Signal policy (ai-train=no, search=yes, ai-input=yes, ai-action=yes).",
    remediationHint: "Emit Content-Signal headers and publish /.well-known/content-signals.json.",
    weight: 2,
  },
  {
    id: "security-txt",
    number: 26,
    name: "RFC 9116 security.txt",
    pillar: "governance",
    endpoint: "/.well-known/security.txt",
    contentType: "text/plain",
    standard: "IETF RFC 9116",
    version: "2.0",
    isNewInV2: false,
    description: "Vulnerability disclosure contacts, PGP keys, and agent security escalation channels.",
    remediationHint: "Publish /.well-known/security.txt with Contact, Expires, and Canonical fields.",
    weight: 2,
  },
  {
    id: "humans-jsonld",
    number: 27,
    name: "JSON-LD & humans.txt Provenance",
    pillar: "governance",
    endpoint: "/humans.txt",
    contentType: "text/plain",
    standard: "Schema.org JSON-LD + humanstxt.org",
    version: "2.0",
    isNewInV2: false,
    description: "Rich Schema.org SoftwareApplication/WebSite JSON-LD graph paired with human engineering attribution.",
    remediationHint: "Embed application/ld+json in HTML head and serve /humans.txt.",
    weight: 1,
  },
];

export interface FoundationConfigOptions {
  domain: string;
  organizationName: string;
  description: string;
  verticals: string[];
  journeyPacks: string[];
  enabledProtocols: string[];
  tier: "open-source" | "pro-business" | "regulated-enterprise";
  paymentWallet?: string;
  contactEmail?: string;
}

export const DEFAULT_FOUNDATION_CONFIG: FoundationConfigOptions = {
  domain: "mahoneycontextprotocol.com",
  organizationName: "Mahoney Context Protocol (MaCP)",
  description:
    "The Commercial Agentic Web Platform — 27 Discovery, Identity, Commerce, Payment & UI Protocols + 23 Regulated Verticals (184 Tools) + 7 Business Journey Packs + Dispatch Ventures A2A Federation.",
  verticals: [
    "event-planning",
    "carbon-footprint",
    "accessibility",
    "patent-filing",
    "vehicle-maintenance",
    "healthcare-clinical-ehr",
    "healthcare-pharmacy-fda",
    "healthcare-revenue-claims",
    "healthcare-clinical-trials",
    "banking-retail-treasury",
    "wealth-brokerage-sec",
    "insurance-underwriting-claims",
    "real-estate-mortgage-respa",
    "legal-compliance-ediscovery",
    "energy-grid-ferc-nerc",
    "crypto-defi-onchain",
    "quant-trading-execution",
    "institutional-investing-risk",
    "govcon-defense-cmmc",
    "aviation-faa-mro",
    "maritime-customs-trade",
    "biotech-clia-ivd",
    "cyber-incident-sec-nis2",
  ],
  journeyPacks: [
    "ecommerce",
    "saas",
    "travel",
    "fintech",
    "healthcare",
    "telecom",
    "analytics",
  ],
  enabledProtocols: TWENTY_SEVEN_PROTOCOLS.map((p) => p.id),
  tier: "regulated-enterprise",
  paymentWallet: "0x4D61686F6E6579436F6E7465787450726F746F636F6C",
  contactEmail: "security@mahoneycontextprotocol.com",
};

/**
 * Generates deterministic protocol artifacts for any domain & configuration.
 * Used both by our own 100/100 dogfooding routes and by the Studio / Scanner.
 */
export function generateProtocolArtifact(
  protocolId: string,
  config: FoundationConfigOptions = DEFAULT_FOUNDATION_CONFIG
): { content: string; contentType: string; filename: string } {
  const baseUrl = config.domain.startsWith("http")
    ? config.domain.replace(/\/$/, "")
    : `https://${config.domain}`;
  const host = baseUrl.replace(/^https?:\/\//, "");
  const nowIso = "2026-10-14T00:00:00Z";
  const expiresIso = "2027-10-14T00:00:00Z";

  switch (protocolId) {
    case "robots-txt":
      return {
        filename: "/robots.txt",
        contentType: "text/plain; charset=utf-8",
        content: `# Mahoney Context Protocol (mcp-foundation v2.0) — Agent-Aware robots.txt
# Domain: ${baseUrl}
# Content-Signal: ai-train=no, search=yes, ai-input=yes, ai-action=yes

User-agent: *
Allow: /
Allow: /.well-known/

User-agent: GPTBot
Allow: /
Allow: /.well-known/

User-agent: ClaudeBot
Allow: /
Allow: /.well-known/

User-agent: PerplexityBot
Allow: /
Allow: /.well-known/

User-agent: Google-Extended
Allow: /

# Agentic Discovery Endpoints
# MCP Server Card: ${baseUrl}/.well-known/mcp.json
# A2A Agent Card: ${baseUrl}/.well-known/agent-card.json
# Agent Skills Index: ${baseUrl}/.well-known/agent-skills/index.json
# WebMCP Manifest: ${baseUrl}/.well-known/webmcp.json
# UCP Commerce: ${baseUrl}/.well-known/ucp.json
# ACP Checkout: ${baseUrl}/.well-known/acp.json
# AP2 Mandates: ${baseUrl}/.well-known/ap2.json
# x402 Payments: ${baseUrl}/.well-known/x402.json
# MPP Payments: ${baseUrl}/.well-known/mpp.json
# SEP-1865 MCP Apps: ${baseUrl}/.well-known/mcp-apps.json
# AG-UI Stream: ${baseUrl}/.well-known/ag-ui.json
# LLMs Context: ${baseUrl}/llms.txt
# Agent Operations: ${baseUrl}/operate.txt

Sitemap: ${baseUrl}/sitemap.xml
Host: ${host}
`,
      };

    case "sitemap-xml":
      return {
        filename: "/sitemap.xml",
        contentType: "application/xml; charset=utf-8",
        content: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/scanner</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/studio</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/verticals</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/simulator</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/llms.txt</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/operate.txt</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/.well-known/mcp.json</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/.well-known/agent-card.json</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,
      };

    case "link-headers":
      return {
        filename: "HTTP Response Header: Link",
        contentType: "text/plain; charset=utf-8",
        content: [
          `<${baseUrl}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
          `<${baseUrl}/.well-known/mcp.json>; rel="mcp-server"; type="application/json"`,
          `<${baseUrl}/.well-known/agent-card.json>; rel="agent-card"; type="application/json"`,
          `<${baseUrl}/.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"`,
          `<${baseUrl}/.well-known/openapi.json>; rel="service-desc"; type="application/json"`,
          `<${baseUrl}/llms.txt>; rel="llms-txt"; type="text/plain"`,
          `<${baseUrl}/operate.txt>; rel="operate-txt"; type="text/plain"`,
        ].join(", "),
      };

    case "markdown-negotiation":
      return {
        filename: "/llms-full.txt",
        contentType: "text/markdown; charset=utf-8",
        content: `# ${config.organizationName} — Full Machine-Readable Platform Specification

> Domain: ${baseUrl}
> Protocol Suite: mcp-foundation v2.0 (27/27 protocols active)
> Regulated Verticals: ${config.verticals.join(", ")} (40 WebMCP tools)
> Business Journey Packs: ${config.journeyPacks.join(", ")}

## 1. Architecture Overview (2-Layer Design)
1. **Presentation Layer (Human UI):** Next.js App Router, interactive 27-protocol scanner, Business WebMCP Studio, Verticals Marketplace, and SEP-1865 + AG-UI Live Simulator.
2. **Agent-Surface Layer (Machine Interface):** 27 deterministic discovery & transaction protocols plus in-browser \`navigator.modelContext\` WebMCP tools with prepare->confirm human-in-the-loop safety boundaries.

## 2. Active WebMCP Site Tools
- \`scan_domain_readiness\`: Audits any domain across all 27 protocols and 7 pillars.
- \`recommend_vertical_pack\`: Recommends regulated vertical plugins and business journey packs.
- \`generate_foundation_config\`: Generates complete \`.well-known/*\` artifacts and one-line script embed.
- \`simulate_vertical_tool\`: Executes any of the 40 regulated vertical tools or 7 journey tools with SEP-1865 UI output.
- \`calculate_roi_and_pricing\`: Calculates token savings, conversion lift, and tier fit (Free / $49 Pro / $299 Enterprise).
- \`ask_site\`: Universal grounded Q&A tool over the platform catalog and compliance documentation.
`,
      };

    case "api-catalog":
      return {
        filename: "/.well-known/api-catalog",
        contentType: "application/linkset+json",
        content: JSON.stringify(
          {
            linkset: [
              {
                anchor: `${baseUrl}/`,
                "service-desc": [
                  { href: `${baseUrl}/.well-known/openapi.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/mcp.json`, type: "application/json" },
                ],
                "service-doc": [
                  { href: `${baseUrl}/llms.txt`, type: "text/plain" },
                  { href: `${baseUrl}/operate.txt`, type: "text/plain" },
                ],
                " service-meta": [
                  { href: `${baseUrl}/.well-known/agent-card.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/agent-skills/index.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/ucp.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/acp.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/ap2.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/x402.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/mpp.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/mcp-apps.json`, type: "application/json" },
                  { href: `${baseUrl}/.well-known/ag-ui.json`, type: "application/json" },
                ],
              },
            ],
          },
          null,
          2
        ),
      };

    case "openapi-discovery":
      return {
        filename: "/.well-known/openapi.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            openapi: "3.1.0",
            info: {
              title: `${config.organizationName} Agentic API`,
              version: "2.0.0",
              description: config.description,
              contact: { email: config.contactEmail || "security@mahoneycontextprotocol.com" },
            },
            servers: [{ url: baseUrl, description: "Production Agentic Surface" }],
            paths: {
              "/api/scan": {
                post: {
                  operationId: "scan_domain_readiness",
                  summary: "Audit any domain against all 27 mcp-foundation v2 protocols",
                  responses: { "200": { description: "27-protocol readiness report with remediation diff" } },
                },
              },
              "/api/mcp": {
                post: {
                  operationId: "invoke_mcp_tool",
                  summary: "Streamable HTTP MCP JSON-RPC 2.0 endpoint",
                  responses: { "200": { description: "MCP JSON-RPC response" } },
                },
              },
              "/api/ag-ui": {
                post: {
                  operationId: "stream_ag_ui_events",
                  summary: "AG-UI bi-directional agent event stream",
                  responses: { "200": { description: "AG-UI event sequence" } },
                },
              },
            },
          },
          null,
          2
        ),
      };

    case "did-web":
      return {
        filename: "/.well-known/did.json",
        contentType: "application/did+ld+json",
        content: JSON.stringify(
          {
            "@context": [
              "https://www.w3.org/ns/did/v1",
              "https://w3id.org/security/suites/ed25519-2020/v1",
            ],
            id: `did:web:${host.replace(/:/g, "%3A")}`,
            verificationMethod: [
              {
                id: `did:web:${host.replace(/:/g, "%3A")}#key-1`,
                type: "Ed25519VerificationKey2020",
                controller: `did:web:${host.replace(/:/g, "%3A")}`,
                publicKeyMultibase: "z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
              },
            ],
            authentication: [`did:web:${host.replace(/:/g, "%3A")}#key-1`],
            assertionMethod: [`did:web:${host.replace(/:/g, "%3A")}#key-1`],
            service: [
              {
                id: `#macp-foundation`,
                type: "MahoneyContextProtocolFoundation",
                serviceEndpoint: baseUrl,
                protocolsSupported: 27,
                endpoints: {
                  mcp: `${baseUrl}/.well-known/mcp.json`,
                  a2a: `${baseUrl}/.well-known/agent-card.json`,
                  skills: `${baseUrl}/.well-known/agent-skills/index.json`,
                  webmcp: `${baseUrl}/.well-known/webmcp.json`,
                  webBotAuth: `${baseUrl}/.well-known/http-message-signatures-directory`,
                  ucp: `${baseUrl}/.well-known/ucp.json`,
                  acp: `${baseUrl}/.well-known/acp.json`,
                  ap2: `${baseUrl}/.well-known/ap2.json`,
                  x402: `${baseUrl}/.well-known/x402.json`,
                  mpp: `${baseUrl}/.well-known/mpp.json`,
                  mcpApps: `${baseUrl}/.well-known/mcp-apps.json`,
                  agUi: `${baseUrl}/.well-known/ag-ui.json`,
                },
              },
            ],
          },
          null,
          2
        ),
      };

    case "web-bot-auth":
      return {
        filename: "/.well-known/http-message-signatures-directory",
        contentType: "application/http-message-signatures-directory+json",
        content: JSON.stringify(
          {
            protocol: "RFC-9421-Web-Bot-Auth",
            version: "2.0",
            issuer: baseUrl,
            signaturePolicy: {
              requiredComponents: ["@authority", "@method", "@path", "content-digest"],
              maxClockSkewSeconds: 300,
              nonceRequired: true,
              algorithmsSupported: ["ed25519", "ecdsa-p256-sha256", "rsa-pss-sha512"],
            },
            keys: [
              {
                kty: "OKP",
                crv: "Ed25519",
                kid: "macp-web-bot-auth-2026-01",
                use: "sig",
                alg: "EdDSA",
                x: "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo",
              },
            ],
          },
          null,
          2
        ),
      };

    case "oauth-discovery":
      return {
        filename: "/.well-known/oauth-authorization-server",
        contentType: "application/json",
        content: JSON.stringify(
          {
            issuer: baseUrl,
            authorization_endpoint: `${baseUrl}/api/oauth/authorize`,
            token_endpoint: `${baseUrl}/api/oauth/token`,
            registration_endpoint: `${baseUrl}/api/oauth/register`,
            jwks_uri: `${baseUrl}/.well-known/http-message-signatures-directory`,
            response_types_supported: ["code"],
            grant_types_supported: ["authorization_code", "client_credentials", "refresh_token"],
            code_challenge_methods_supported: ["S256"],
            scopes_supported: [
              "mcp:tools:read",
              "mcp:tools:execute",
              "ucp:checkout",
              "ap2:mandate",
              "verticals:regulated",
            ],
          },
          null,
          2
        ),
      };

    case "oauth-protected-resource":
      return {
        filename: "/.well-known/oauth-protected-resource",
        contentType: "application/json",
        content: JSON.stringify(
          {
            resource: baseUrl,
            authorization_servers: [baseUrl],
            bearer_methods_supported: ["header"],
            scopes_supported: [
              "mcp:tools:read",
              "mcp:tools:execute",
              "ucp:checkout",
              "ap2:mandate",
              "verticals:regulated",
            ],
            resource_documentation: `${baseUrl}/operate.txt`,
          },
          null,
          2
        ),
      };

    case "mcp-server-card":
      return {
        filename: "/.well-known/mcp.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            mcpVersion: "2025-11-25",
            name: "mahoney-context-protocol-platform",
            title: config.organizationName,
            version: "2.0.0",
            description: config.description,
            transports: [
              {
                type: "streamable-http",
                url: `${baseUrl}/api/mcp`,
                authentication: ["oauth2", "rfc9421-http-signature", "x402"],
              },
              {
                type: "webmcp-browser",
                namespace: "window.navigator.modelContext",
              },
            ],
            extensions: {
              "io.modelcontextprotocol/ui": {
                spec: "SEP-1865",
                manifestUrl: `${baseUrl}/.well-known/mcp-apps.json`,
                supportedMimeTypes: ["text/html;profile=mcp-app"],
              },
              "io.ag-ui/stream": {
                manifestUrl: `${baseUrl}/.well-known/ag-ui.json`,
              },
            },
            capabilities: {
              tools: { listChanged: true },
              resources: { subscribe: true, listChanged: true },
              prompts: { listChanged: false },
            },
            toolsSummary: {
              siteToolsCount: 6,
              regulatedVerticalsCount: 23,
              regulatedVerticalToolsCount: 184,
              businessJourneyToolsCount: 28,
              dispatchVenturesCount: 8,
              siteTools: [
                "scan_domain_readiness",
                "recommend_vertical_pack",
                "generate_foundation_config",
                "simulate_vertical_tool",
                "calculate_roi_and_pricing",
                "ask_site",
              ],
            },
          },
          null,
          2
        ),
      };

    case "a2a-agent-card":
      return {
        filename: "/.well-known/agent-card.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocolVersion: "0.3.0",
            name: config.organizationName,
            description: config.description,
            url: `${baseUrl}/api/mcp`,
            provider: {
              organization: config.organizationName,
              url: baseUrl,
            },
            version: "2.0.0",
            capabilities: {
              streaming: true,
              pushNotifications: true,
              stateTransitionHistory: true,
            },
            defaultInputModes: ["application/json", "text/plain"],
            defaultOutputModes: ["application/json", "text/markdown", "text/html;profile=mcp-app"],
            skills: [
              {
                id: "scan-27-protocols",
                name: "27-Protocol Agentic Readiness Audit",
                description: "Audits any domain across all 27 mcp-foundation v2 protocols and generates remediation diffs.",
                tags: ["audit", "webmcp", "mcp", "ucp", "acp", "x402"],
              },
              {
                id: "regulated-verticals-suite",
                name: "40 Regulated Vertical WebMCP Tools",
                description: "Executes compliant workflows across Event Planning, Carbon Footprint, Accessibility, Patent Filing, and Vehicle Maintenance.",
                tags: ["compliance", "wcag", "uspto", "nhtsa", "ghg-protocol", "events"],
              },
              {
                id: "business-journey-packs",
                name: "7 Business Journey Packs",
                description: "Pre-built WebMCP + UCP/ACP commerce and operational packs for E-Commerce, SaaS, Travel, Fintech, Healthcare, Telecom, and Analytics.",
                tags: ["ecommerce", "saas", "travel", "fintech", "healthcare", "telecom", "analytics"],
              },
            ],
          },
          null,
          2
        ),
      };

    case "agent-skills":
      return {
        filename: "/.well-known/agent-skills/index.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            schemaVersion: "2.0.0",
            domain: baseUrl,
            generatedAt: nowIso,
            totalVerticals: 5,
            totalVerticalTools: 40,
            totalJourneyPacks: 7,
            siteTools: [
              { id: "scan_domain_readiness", readOnlyHint: true, consequentialHint: false },
              { id: "recommend_vertical_pack", readOnlyHint: true, consequentialHint: false },
              { id: "generate_foundation_config", readOnlyHint: true, consequentialHint: false },
              { id: "simulate_vertical_tool", readOnlyHint: false, consequentialHint: true },
              { id: "calculate_roi_and_pricing", readOnlyHint: true, consequentialHint: false },
              { id: "ask_site", readOnlyHint: true, consequentialHint: false },
            ],
            regulatedVerticals: [
              {
                id: "event-planning",
                package: "@macp/vertical-event-planning",
                toolsCount: 8,
                compliance: ["ADA Title III", "NFPA 101 Fire Code", "CAN-SPAM", "ASCAP/BMI"],
              },
              {
                id: "carbon-footprint",
                package: "@macp/vertical-carbon-footprint",
                toolsCount: 8,
                compliance: ["EU CSRD ESRS E1", "CA SB 253", "GHG Protocol", "SBTi", "GLEC v3.0"],
              },
              {
                id: "accessibility",
                package: "@macp/vertical-accessibility",
                toolsCount: 8,
                compliance: ["WCAG 2.2 AA/AAA", "ADA Title III", "Section 508", "EN 301 549", "VPAT 2.5"],
              },
              {
                id: "patent-filing",
                package: "@macp/vertical-patent-filing",
                toolsCount: 8,
                compliance: ["37 CFR 1.56", "35 U.S.C. 100/102/184", "MPEP", "PCT"],
              },
              {
                id: "vehicle-maintenance",
                package: "@macp/vertical-vehicle-maintenance",
                toolsCount: 8,
                compliance: ["NHTSA 49 CFR 573", "EPA 40 CFR 85", "Magnuson-Moss Warranty Act"],
              },
            ],
            businessJourneyPacks: config.journeyPacks,
          },
          null,
          2
        ),
      };

    case "webmcp":
      return {
        filename: "/.well-known/webmcp.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            spec: "W3C-WebMCP-v2",
            runtimeNamespace: "window.navigator.modelContext",
            probeGateRequired: true,
            prepareConfirmBoundary: true,
            universalAskSite: true,
            verticalsEnabled: config.verticals,
            journeyPacksEnabled: config.journeyPacks,
            tools: [
              {
                name: "scan_domain_readiness",
                description: "Scan any URL or domain across all 27 mcp-foundation v2 protocols and return per-pillar scores and remediation diffs.",
                annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
              },
              {
                name: "recommend_vertical_pack",
                description: "Recommend regulated vertical plugins and business journey packs for a company profile.",
                annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
              },
              {
                name: "generate_foundation_config",
                description: "Generate .well-known/* protocol manifests and a one-line <script> embed for any domain.",
                annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
              },
              {
                name: "simulate_vertical_tool",
                description: "Execute any of the 40 regulated vertical tools or 7 journey packs with prepare->confirm gates and SEP-1865 UI output.",
                annotations: { readOnlyHint: false, consequentialHint: true, untrustedContentHint: false },
              },
              {
                name: "calculate_roi_and_pricing",
                description: "Calculate agent traffic conversion lift, token savings, and recommended MaCP pricing tier.",
                annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
              },
              {
                name: "ask_site",
                description: "Universal grounded Q&A across all 27 protocols, 40 vertical tools, compliance rules, and pricing.",
                annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
              },
            ],
          },
          null,
          2
        ),
      };

    case "ucp":
      return {
        filename: "/.well-known/ucp.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocol: "UCP",
            version: "2026-01",
            merchant: {
              name: config.organizationName,
              domain: host,
              currency: "USD",
            },
            capabilities: ["catalog.search", "quote.create", "cart.prepare", "order.confirm"],
            catalog: [
              {
                sku: "macp-open-source",
                name: "MaCP Open Source Foundation",
                priceUSD: 0,
                billingPeriod: "monthly",
                protocolsIncluded: 27,
              },
              {
                sku: "macp-pro-business",
                name: "MaCP Pro Business Studio",
                priceUSD: 49,
                billingPeriod: "monthly",
                protocolsIncluded: 27,
                journeyPacksIncluded: 7,
              },
              {
                sku: "macp-regulated-enterprise",
                name: "MaCP Regulated Enterprise Suite",
                priceUSD: 299,
                billingPeriod: "monthly",
                protocolsIncluded: 27,
                regulatedVerticalsIncluded: 5,
                journeyPacksIncluded: 7,
              },
            ],
            endpoints: {
              catalog: `${baseUrl}/api/mcp`,
              quote: `${baseUrl}/api/mcp`,
              checkout: `${baseUrl}/.well-known/acp.json`,
            },
          },
          null,
          2
        ),
      };

    case "acp":
      return {
        filename: "/.well-known/acp.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocol: "ACP",
            version: "2026-01",
            provider: "OpenAI-Stripe-Agentic-Commerce",
            merchantId: `acct_${host.replace(/[^a-z0-9]/gi, "_")}`,
            supportedPaymentMethods: ["shared_payment_token", "stripe_spt", "ap2_mandate", "x402_usdc"],
            checkoutSessionEndpoint: `${baseUrl}/api/mcp`,
            humanConfirmationRequiredForCapture: true,
            webhooks: {
              orderCreated: `${baseUrl}/api/mcp`,
              orderFulfilled: `${baseUrl}/api/mcp`,
            },
          },
          null,
          2
        ),
      };

    case "ap2":
      return {
        filename: "/.well-known/ap2.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocol: "AP2",
            version: "1.0.0",
            specification: "Google-Agent-Payments-Protocol-Mandates",
            verifiableCredentials: {
              intentMandate: {
                supported: true,
                maxAutonomousSpendUSD: 500,
                requiresCounterSignatureAboveUSD: 500,
              },
              cartMandate: {
                supported: true,
                hashAlgorithm: "SHA-256",
                signingAlgorithms: ["EdDSA", "ES256"],
              },
            },
            verificationEndpoint: `${baseUrl}/api/mcp`,
            didAnchor: `did:web:${host.replace(/:/g, "%3A")}#key-1`,
          },
          null,
          2
        ),
      };

    case "x402":
      return {
        filename: "/.well-known/x402.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocol: "x402",
            version: "1.0.0",
            facilitator: "https://x402.org/facilitator",
            recipientWallet:
              config.paymentWallet || "0x4D61686F6E6579436F6E7465787450726F746F636F6C",
            networks: [
              { chain: "base-mainnet", chainId: 8453, asset: "USDC" },
              { chain: "solana-mainnet", asset: "USDC" },
            ],
            headers: {
              challenge: "X-PAYMENT-REQUIRED",
              proof: "X-PAYMENT",
              receipt: "X-PAYMENT-RESPONSE",
            },
            routes: [
              {
                path: "/api/scan",
                tier: "free-preview-then-x402",
                priceUSDC: "0.005",
                description: "Deep 27-protocol enterprise compliance audit",
              },
              {
                path: "/api/mcp",
                tier: "metered",
                priceUSDC: "0.001",
                description: "Per-invocation regulated vertical tool execution",
              },
            ],
          },
          null,
          2
        ),
      };

    case "mpp":
      return {
        filename: "/.well-known/mpp.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocol: "MPP",
            version: "1.0.0",
            specification: "IETF-Draft-Machine-Payments-Protocol",
            rails: ["stripe-spt", "tempo-l2", "x402-usdc", "ach-instant"],
            sessionBudgets: {
              supported: true,
              defaultSessionCapUSD: 25.0,
              meteringUnit: "tool_invocation",
              autoRefundUnusedBalance: true,
            },
            settlementEndpoint: `${baseUrl}/api/mcp`,
          },
          null,
          2
        ),
      };

    case "mcp-apps":
      return {
        filename: "/.well-known/mcp-apps.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            extension: "io.modelcontextprotocol/ui",
            spec: "SEP-1865",
            version: "2026-01",
            mimeType: "text/html;profile=mcp-app",
            sandboxPermissions: ["allow-scripts", "allow-forms"],
            rpcBridge: "jsonrpc-2.0-postMessage",
            resources: [
              {
                uri: "ui://macp/scanner-report-card",
                name: "27-Protocol Readiness Scorecard",
                boundTools: ["scan_domain_readiness"],
                description: "Interactive 7-pillar radar & remediation diff viewer.",
              },
              {
                uri: "ui://macp/vertical-compliance-card",
                name: "Regulated Vertical Execution & Approval Card",
                boundTools: ["simulate_vertical_tool"],
                description: "Renders WCAG contrast matrices, GHG Scope 1/2/3 breakdowns, USPTO fee tables, NHTSA recall alerts, and Event floor plans.",
              },
              {
                uri: "ui://macp/prepare-confirm-gate",
                name: "Human-in-the-Loop Consequential Action Gate",
                boundTools: [
                  "send-invitation",
                  "generate-sustainability-report",
                  "generate-vpat",
                  "prepare-provisional-application",
                  "schedule-service",
                ],
                description: "Cryptographic prepare->confirm approval surface for consequential actions.",
              },
            ],
          },
          null,
          2
        ),
      };

    case "ag-ui":
      return {
        filename: "/.well-known/ag-ui.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            protocol: "AG-UI",
            version: "1.0.0",
            transport: "text/event-stream",
            endpoint: `${baseUrl}/api/ag-ui`,
            eventTypes: [
              "RUN_STARTED",
              "TEXT_MESSAGE_START",
              "TEXT_MESSAGE_CONTENT",
              "TEXT_MESSAGE_END",
              "TOOL_CALL_START",
              "TOOL_CALL_ARGS",
              "TOOL_CALL_END",
              "STATE_SNAPSHOT",
              "STATE_DELTA",
              "INTERRUPT_CONFIRMATION_REQUIRED",
              "UI_RESOURCE_RENDER",
              "RUN_FINISHED",
            ],
            sharedStatePatchFormat: "RFC-6902-JSON-Patch",
          },
          null,
          2
        ),
      };

    case "llms-txt":
      return {
        filename: "/llms.txt",
        contentType: "text/plain; charset=utf-8",
        content: `# ${config.organizationName}

> ${config.description}

Mahoney Context Protocol (\`mahoneycontextprotocol.com\`) upgrades any web property into a 100/100 agent-ready surface implementing all 27 modern agent protocols (\`mcp-foundation\` v2.0), 5 regulated industry verticals (40 WebMCP tools), and 7 business journey packs.

## Core Platform Routes
- [Home & Pricing](${baseUrl}/): Architectural overview, 2-layer model, and commercial plans (Open Source $0, Pro Business $49/mo, Regulated Enterprise $299/mo).
- [27-Protocol Readiness Scanner](${baseUrl}/scanner): Audit any domain across all 27 protocols and 7 pillars with one-click remediation diffs.
- [Business WebMCP Studio](${baseUrl}/studio): Configure verticals, journey packs, and all 27 protocols; preview generated \`.well-known/*\` manifests and copy the one-line \`<script>\` embed.
- [Verticals & Skills Marketplace](${baseUrl}/verticals): Explore and test all 40 regulated industry tools and 7 business journey packs.
- [SEP-1865 & AG-UI Live Simulator](${baseUrl}/simulator): Split-screen interactive agent simulator with prepare->confirm gates, \`ui://\` cards, and AG-UI event streams.

## Machine Discovery Endpoints (27 Protocols)
- [MCP Server Card](${baseUrl}/.well-known/mcp.json)
- [A2A Agent Card](${baseUrl}/.well-known/agent-card.json)
- [Agent Skills Index](${baseUrl}/.well-known/agent-skills/index.json)
- [WebMCP Runtime Manifest](${baseUrl}/.well-known/webmcp.json)
- [W3C did:web Identity](${baseUrl}/.well-known/did.json)
- [RFC 9421 Web Bot Auth](${baseUrl}/.well-known/http-message-signatures-directory)
- [Universal Commerce Protocol (UCP)](${baseUrl}/.well-known/ucp.json)
- [Agentic Commerce Protocol (ACP)](${baseUrl}/.well-known/acp.json)
- [Agent Payments Protocol (AP2)](${baseUrl}/.well-known/ap2.json)
- [x402 Micropayments](${baseUrl}/.well-known/x402.json)
- [Machine Payments Protocol (MPP)](${baseUrl}/.well-known/mpp.json)
- [SEP-1865 MCP Apps](${baseUrl}/.well-known/mcp-apps.json)
- [AG-UI Event Stream](${baseUrl}/.well-known/ag-ui.json)
- [Agent Operating Manual](${baseUrl}/operate.txt)
`,
      };

    case "operate-txt":
      return {
        filename: "/operate.txt",
        contentType: "text/plain; charset=utf-8",
        content: `# Agent Operating Manual (operate.txt v2.0)
# Domain: ${baseUrl}
# Maintainer: ${config.organizationName}

## 1. Probe-Gated Orchestration
1. Always inspect \`/.well-known/mcp.json\`, \`/.well-known/webmcp.json\`, and \`/.well-known/agent-skills/index.json\` before invoking tools.
2. In browser contexts, check \`typeof window.navigator.modelContext !== "undefined"\` and invoke registered tools directly rather than scraping DOM elements.

## 2. Safety Annotations & Human-in-the-Loop Gates
- \`readOnlyHint: true\`: Safe to execute autonomously and in parallel (e.g., \`scan_domain_readiness\`, \`check-recalls\`, \`audit-wcag\`, \`calculate-product-footprint\`).
- \`consequentialHint: true\`: MUST use the two-step \`prepare -> confirm\` pattern. Never execute a consequential action (e.g., \`send-invitation\`, \`prepare-provisional-application\`, \`generate-vpat\`, \`schedule-service\`) without presenting the prepared preview card (\`ui://macp/prepare-confirm-gate\`) and obtaining explicit user confirmation.
- \`untrustedContentHint: true\`: Outputs incorporate external registry data (e.g., \`verify-carbon-credits\`, \`check-novelty\`, \`estimate-resale-value\`). Isolate and verify before downstream mutations.

## 3. Authentication & Payment Rails
- Supports RFC 9421 HTTP Message Signatures (\`/.well-known/http-message-signatures-directory\`).
- Supports OAuth 2.1 PKCE (\`/.well-known/oauth-authorization-server\`).
- Supports x402 USDC micropayments (\`/.well-known/x402.json\`) and MPP session budgets (\`/.well-known/mpp.json\`).
`,
      };

    case "ai-txt":
      return {
        filename: "/ai.txt",
        contentType: "text/plain; charset=utf-8",
        content: `# ai.txt — AI Usage, Grounding & Execution Policy
# Domain: ${baseUrl}

User-agent: *
Allow-AI-Search: yes
Allow-AI-Grounding: yes
Allow-AI-Agent-Execution: yes
Allow-AI-Training: no
Require-Attribution: yes
Attribution-URL: ${baseUrl}
MCP-Endpoint: ${baseUrl}/api/mcp
WebMCP-Manifest: ${baseUrl}/.well-known/webmcp.json
`,
      };

    case "content-signals":
      return {
        filename: "/.well-known/content-signals.json",
        contentType: "application/json",
        content: JSON.stringify(
          {
            version: "2.0",
            domain: host,
            headerValue: "ai-train=no, search=yes, ai-input=yes, ai-action=yes",
            policies: {
              "ai-train": false,
              search: true,
              "ai-input": true,
              "ai-action": true,
            },
            tdmReservation: "reserved-for-training-allowed-for-agent-execution",
          },
          null,
          2
        ),
      };

    case "security-txt":
      return {
        filename: "/.well-known/security.txt",
        contentType: "text/plain; charset=utf-8",
        content: `Contact: mailto:${config.contactEmail || "security@mahoneycontextprotocol.com"}
Expires: ${expiresIso}
Preferred-Languages: en
Canonical: ${baseUrl}/.well-known/security.txt
Policy: ${baseUrl}/operate.txt
`,
      };

    case "humans-jsonld":
      return {
        filename: "/humans.txt",
        contentType: "text/plain; charset=utf-8",
        content: `/* TEAM */
Platform: ${config.organizationName}
Architecture: 2-Layer Presentation + Agent-Surface (mcp-foundation v2.0)
Site: ${baseUrl}

/* STANDARDS */
Protocols: 27 (MCP, WebMCP, A2A, UCP, ACP, AP2, x402, MPP, RFC 9421, SEP-1865, AG-UI, did:web)
Regulated Verticals: 5 (40 Tools)
Business Journey Packs: 7 (28 Tools)
Updated: 2026-10-14
`,
      };

    default:
      return {
        filename: `/.well-known/${protocolId}.json`,
        contentType: "application/json",
        content: JSON.stringify({ protocolId, status: "active", domain: baseUrl }, null, 2),
      };
  }
}

/**
 * Generates the one-line script embed tag and initialization snippet for a configured studio bundle.
 */
export function generateOneLineEmbed(config: FoundationConfigOptions): string {
  const verticalsAttr = config.verticals.join(",");
  const journeysAttr = config.journeyPacks.join(",");
  return `<script src="https://cdn.mahoneycontextprotocol.com/v2/macp-foundation.min.js" data-domain="${config.domain}" data-tier="${config.tier}" data-verticals="${verticalsAttr}" data-journeys="${journeysAttr}" data-protocols="${config.enabledProtocols.length}" async></script>`;
}
