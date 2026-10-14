import { NextResponse } from "next/server";
import { COMMON_AGENT_HEADERS } from "@/lib/protocol-response";
import { runDomainReadinessScan } from "@/lib/scanner-engine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain") || "mahoneycontextprotocol.com";
  const report = runDomainReadinessScan(domain);
  return NextResponse.json(report, { headers: COMMON_AGENT_HEADERS });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { domain?: string };
  const domain = body.domain || "mahoneycontextprotocol.com";
  const report = runDomainReadinessScan(domain);
  return NextResponse.json(report, { headers: COMMON_AGENT_HEADERS });
}
