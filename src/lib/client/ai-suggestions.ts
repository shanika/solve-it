export interface SuggestionRequest {
  step: number;
  context: string;
  userInput: string;
}

export interface SuggestionResponse {
  suggestions: string[];
}

export class SuggestionError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "SuggestionError";
  }
}

// Simple in-memory cache for session
const suggestionCache = new Map<string, SuggestionResponse>();

function getCacheKey(req: SuggestionRequest): string {
  return JSON.stringify(req);
}

export async function fetchSuggestions(
  req: SuggestionRequest,
  options?: { signal?: AbortSignal; timeoutMs?: number; retries?: number }
): Promise<SuggestionResponse> {
  const { step, context, userInput } = req;
  const timeoutMs = options?.timeoutMs ?? 15000;
  const retries = options?.retries ?? 2;

  // Validate input
  if (![2, 3, 4].includes(step)) {
    throw new SuggestionError("Step must be 2, 3, or 4");
  }
  if (!context.trim() || !userInput.trim()) {
    throw new SuggestionError("Context and userInput are required");
  }

  // Check cache
  const cacheKey = getCacheKey(req);
  if (suggestionCache.has(cacheKey)) {
    return suggestionCache.get(cacheKey)!;
  }

  let lastError: any = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch("/api/ai-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step,
          context: context.trim(),
          userInput: userInput.trim(),
        }),
        signal: options?.signal ?? controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new SuggestionError(
          data.error || "Failed to fetch suggestions",
          response.status
        );
      }
      const data = (await response.json()) as SuggestionResponse;
      if (!Array.isArray(data.suggestions)) {
        throw new SuggestionError("Malformed response from server");
      }
      // Cache and return
      suggestionCache.set(cacheKey, data);
      return data;
    } catch (err: any) {
      clearTimeout(timeout);
      lastError = err;
      // AbortError: only throw if user-initiated, else retry
      if (err.name === "AbortError" && options?.signal) throw err;
      // Only retry on network/server errors
      if (attempt === retries) {
        if (err instanceof SuggestionError) throw err;
        throw new SuggestionError(err.message || "Unknown error");
      }
      // Wait a bit before retrying
      await new Promise((res) => setTimeout(res, 400 * (attempt + 1)));
    }
  }
  throw lastError || new SuggestionError("Unknown error");
}

// Optional: expose cache clear for testing
export function clearSuggestionCache() {
  suggestionCache.clear();
}
