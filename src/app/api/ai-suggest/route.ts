import { NextRequest, NextResponse } from "next/server";
import { getSuggestions } from "@/lib/anthropic";

// Helper to build a prompt for Claude based on the step
function buildPrompt(step: number, context: string, userInput: string): string {
  let instruction = "";
  let example =
    "Example response:\n1. Reason one\n2. Reason two\n3. Reason three";
  if (step === 2) {
    instruction = `Given the following problem and context, list 3-5 possible reasons in a numbered list. Do not include any introduction or explanation—just the numbered list.\n${example}\nProblem: ${context}\nUser Input: ${userInput}`;
  } else if (step === 3) {
    example =
      "Example response:\n1. Expected solution one\n2. Expected solution two\n3. Expected solution three";
    instruction = `Given the problem and reasons, list 3-5 possible expected solutions in a numbered list. Do not include any introduction or explanation—just the numbered list.\n${example}\nContext: ${context}\nUser Input: ${userInput}`;
  } else if (step === 4) {
    example =
      "Example response:\n1. Actionable way one\n2. Actionable way two\n3. Actionable way three";
    instruction = `Given the problem, reasons, and expected solution, list 3-5 actionable ways to solve this problem in a numbered list. Do not include any introduction or explanation—just the numbered list.\n${example}\nContext: ${context}\nUser Input: ${userInput}`;
  } else {
    instruction = "Invalid step.";
  }
  return instruction;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { step, context, userInput } = body;

    // Validate input
    if (
      typeof step !== "number" ||
      ![2, 3, 4].includes(step) ||
      typeof context !== "string" ||
      typeof userInput !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request: step must be 2, 3, or 4; context and userInput must be strings.",
        },
        { status: 400 }
      );
    }

    // Build prompt for multiple suggestions
    const prompt = buildPrompt(step, context, userInput);
    const aiResponse = await getSuggestions(prompt);

    // Parse Claude's response into an array of suggestions
    const suggestions = aiResponse
      .split(/\n+/)
      .map((line) => line.replace(/^\d+\.|^-|•/g, "").trim())
      .filter((line) => line.length > 0);

    if (suggestions.length === 0) {
      return NextResponse.json(
        { error: "Claude did not return any suggestions." },
        { status: 502 }
      );
    }

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    // Handle rate limits or Anthropic errors
    const message = error?.message || "Internal server error";
    const status =
      message.toLowerCase().includes("rate limit") || message.includes("429")
        ? 429
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
