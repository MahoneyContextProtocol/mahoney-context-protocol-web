import { serveProtocolResponse } from "@/lib/protocol-response";
export async function GET() {
  return serveProtocolResponse("api-catalog");
}
