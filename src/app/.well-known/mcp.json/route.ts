import { serveProtocolResponse } from "@/lib/protocol-response";
export async function GET() {
  return serveProtocolResponse("mcp-server-card");
}
