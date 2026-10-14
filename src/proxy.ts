import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_FOUNDATION_CONFIG,
  generateProtocolArtifact,
} from "@/lib/protocols-catalog";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  // Content Negotiation for AI Agents requesting Accept: text/markdown on HTML pages
  if (
    accept.includes("text/markdown") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/.well-known/") &&
    !pathname.startsWith("/_next/")
  ) {
    const md = generateProtocolArtifact("markdown-negotiation", DEFAULT_FOUNDATION_CONFIG);
    return new NextResponse(md.content, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "X-Markdown-Tokens": "410",
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes, ai-action=yes",
        Link: generateProtocolArtifact("link-headers", DEFAULT_FOUNDATION_CONFIG).content,
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set(
    "Content-Signal",
    "ai-train=no, search=yes, ai-input=yes, ai-action=yes"
  );
  response.headers.set(
    "Link",
    generateProtocolArtifact("link-headers", DEFAULT_FOUNDATION_CONFIG).content
  );
  response.headers.set("X-MaCP-Foundation", "v2.0-27-protocols");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
