import { NextResponse } from "next/server";
import { COMMON_AGENT_HEADERS } from "@/lib/protocol-response";
import { SITE_WEBMCP_TOOLS, invokeSiteWebMCPTool } from "@/lib/site-webmcp-tools";
import { getAllVerticalTools } from "@/lib/verticals-catalog";

export async function GET() {
  return NextResponse.json(
    {
      protocol: "Model Context Protocol (Streamable HTTP + WebMCP)",
      mcpVersion: "2025-11-25",
      siteTools: SITE_WEBMCP_TOOLS.map((t) => ({
        name: t.name,
        description: t.description,
        annotations: t.annotations,
        inputSchema: t.inputSchema,
      })),
      verticalToolsCount: getAllVerticalTools().length,
    },
    { headers: COMMON_AGENT_HEADERS }
  );
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    jsonrpc?: string;
    id?: string | number;
    method?: string;
    params?: { name?: string; arguments?: Record<string, unknown> };
    tool?: string;
    args?: Record<string, unknown>;
  };

  // Support both MCP JSON-RPC 2.0 (tools/list, tools/call) and direct REST tool calls
  if (body.method === "tools/list") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: body.id ?? 1,
        result: {
          tools: SITE_WEBMCP_TOOLS.map((t) => ({
            name: t.name,
            description: t.description,
            inputSchema: t.inputSchema,
            annotations: t.annotations,
          })),
        },
      },
      { headers: COMMON_AGENT_HEADERS }
    );
  }

  const toolName = body.params?.name || body.tool || "ask_site";
  const toolArgs = body.params?.arguments || body.args || {};

  const output = await invokeSiteWebMCPTool(toolName, toolArgs);

  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id: body.id ?? 1,
      result: {
        content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
        structuredContent: output,
      },
    },
    { headers: COMMON_AGENT_HEADERS }
  );
}
