import { NextResponse } from "next/server";
import {
  A2A_SIX_PHASES,
  DISPATCH_VENTURES_CATALOG,
  MULTI_HOST_CLIENTS,
  REGULATED_VERTICALS,
} from "@/lib/verticals-catalog";

export async function GET() {
  return NextResponse.json(
    {
      schemaVersion: "2.0.0",
      protocol: "MaCP-Universal-A2A-Registry",
      domain: "https://mahoneycontextprotocol.com",
      a2aEndpoint: "https://mahoneycontextprotocol.com/api/a2a",
      agentCardEndpoint: "https://mahoneycontextprotocol.com/.well-known/agent-card.json",
      didAnchor: "did:web:mahoneycontextprotocol.com#key-1",
      rfc9421Directory: "https://mahoneycontextprotocol.com/.well-known/http-message-signatures-directory",
      sixPhaseMesh: A2A_SIX_PHASES,
      supportedJsonRpcMethods: [
        "agent/registerPeer",
        "tasks/send",
        "tasks/sendSubscribe",
        "tasks/get",
        "tasks/cancel",
      ],
      multiHostMcpApps: MULTI_HOST_CLIENTS,
      federatedOrganizations: [
        {
          id: "mahoney-context-protocol",
          name: "Mahoney Context Protocol (MaCP)",
          role: "27-Protocol Foundation & 23 Regulated Verticals Authority",
          verticalsCount: REGULATED_VERTICALS.length,
          totalRegulatedTools: REGULATED_VERTICALS.length * 8,
          endpoint: "https://mahoneycontextprotocol.com/api/mcp",
        },
        {
          id: "dispatch-ventures",
          name: "Dispatch Ventures (@dispatch-ventures/platform)",
          repository: "https://github.com/mahoney-context-protocol/dispatch-ventures",
          role: "Sister Business — Autonomous Property, Winter Storm & Data Center HVAC Dispatch Network",
          venturesCount: DISPATCH_VENTURES_CATALOG.length,
          ventures: DISPATCH_VENTURES_CATALOG.map((v) => ({
            slug: v.slug,
            name: v.name,
            liveOrigin: v.liveOrigin,
            primaryRegion: v.primaryRegion,
            uiResourceUri: v.uiResourceUri,
            settlementRails: v.settlementRails,
          })),
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "X-Agent-Protocol": "a2a-registry-v2.0",
      },
    }
  );
}
