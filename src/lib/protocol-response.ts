import { NextResponse } from "next/server";
import {
  DEFAULT_FOUNDATION_CONFIG,
  generateProtocolArtifact,
} from "@/lib/protocols-catalog";

export const COMMON_AGENT_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, Signature, Signature-Input, X-PAYMENT",
  "Content-Signal": "ai-train=no, search=yes, ai-input=yes, ai-action=yes",
  "X-MaCP-Foundation-Version": "2.0.0",
  "X-MaCP-Protocols-Active": "27/27",
  Link: generateProtocolArtifact("link-headers", DEFAULT_FOUNDATION_CONFIG).content,
};

export function serveProtocolResponse(protocolId: string): NextResponse {
  const artifact = generateProtocolArtifact(protocolId, DEFAULT_FOUNDATION_CONFIG);
  return new NextResponse(artifact.content, {
    status: 200,
    headers: {
      ...COMMON_AGENT_HEADERS,
      "Content-Type": artifact.contentType,
    },
  });
}
