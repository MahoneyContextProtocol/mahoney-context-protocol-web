import { NextResponse } from "next/server";
import { COMMON_AGENT_HEADERS } from "@/lib/protocol-response";
import { executeVerticalOrJourneyTool } from "@/lib/verticals-catalog";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    toolId?: string;
    input?: Record<string, unknown>;
    mode?: "prepare" | "confirm" | "execute";
  };

  const toolId = body.toolId || "check-recalls";
  const input = body.input || { vin: "1HGCM82633A004352" };
  const mode = body.mode || "execute";

  const execution = executeVerticalOrJourneyTool(toolId, input, mode);
  const runId = `run_${Date.now()}`;
  const msgId = `msg_${Date.now()}`;
  const callId = `call_${Date.now()}`;

  const events = [
    {
      type: "RUN_STARTED",
      runId,
      timestamp: new Date().toISOString(),
      protocol: "AG-UI/1.0",
    },
    {
      type: "TOOL_CALL_START",
      runId,
      toolCallId: callId,
      toolCallName: toolId,
      mode,
      annotations: {
        readOnlyHint: execution.readOnlyHint,
        consequentialHint: execution.consequentialHint,
        untrustedContentHint: execution.untrustedContentHint,
      },
    },
    {
      type: "TOOL_CALL_ARGS",
      runId,
      toolCallId: callId,
      delta: JSON.stringify(input),
    },
    ...(execution.status === "confirmation_required"
      ? [
          {
            type: "INTERRUPT_CONFIRMATION_REQUIRED",
            runId,
            toolCallId: callId,
            uiResourceUri: execution.uiCard.uri,
            reason: "Tool carries consequentialHint: true — awaiting human prepare->confirm sign-off.",
          },
        ]
      : [
          {
            type: "TOOL_CALL_END",
            runId,
            toolCallId: callId,
            result: execution.output,
          },
        ]),
    {
      type: "UI_RESOURCE_RENDER",
      runId,
      uri: execution.uiCard.uri,
      mimeType: execution.uiCard.mimeType,
      card: execution.uiCard,
    },
    {
      type: "STATE_DELTA",
      runId,
      patch: [
        { op: "replace", path: "/lastToolExecuted", value: toolId },
        { op: "replace", path: "/executionStatus", value: execution.status },
      ],
    },
    {
      type: "TEXT_MESSAGE_CONTENT",
      runId,
      messageId: msgId,
      delta:
        execution.status === "confirmation_required"
          ? `Prepared ${toolId} with human-in-the-loop gate (${execution.uiCard.uri}). Please review and confirm to commit.`
          : `Completed ${toolId} via WebMCP & SEP-1865 (${execution.uiCard.badge}).`,
    },
    {
      type: "RUN_FINISHED",
      runId,
      timestamp: new Date().toISOString(),
    },
  ];

  return NextResponse.json(
    {
      protocol: "AG-UI/1.0",
      runId,
      execution,
      events,
    },
    { headers: COMMON_AGENT_HEADERS }
  );
}
