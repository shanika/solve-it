import Anthropic from "@anthropic-ai/sdk";

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  throw new Error("ANTHROPIC_API_KEY is not set in environment variables.");
}

const anthropic = new Anthropic({
  apiKey: anthropicApiKey,
});

/**
 * Sends a prompt to Claude and returns the response as a string.
 * @param prompt The prompt to send to Claude
 */
export async function getSuggestions(prompt: string): Promise<string> {
  try {
    // You may need to adjust the model and parameters as needed
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });
    // Extract all text blocks from the content array
    const text = response.content
      .filter(
        (block: any) => block.type === "text" && typeof block.text === "string"
      )
      .map((block: any) => block.text)
      .join("\n");
    return text;
  } catch (error: any) {
    // Add more robust error handling/logging as needed
    throw new Error(`Anthropic API error: ${error.message || error}`);
  }
}
