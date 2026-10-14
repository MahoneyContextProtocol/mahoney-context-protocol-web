import { serveProtocolResponse } from "@/lib/protocol-response";
export async function GET() {
  return serveProtocolResponse("ap2");
}
