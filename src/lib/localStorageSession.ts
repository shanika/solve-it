import type { ProblemSession } from "./types";

const SESSION_KEY = "problemSession";

export function saveSession(session: ProblemSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    // Handle quota or serialization errors
    // Optionally log or notify
  }
}

export function loadSession(): ProblemSession | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    return JSON.parse(data) as ProblemSession;
  } catch (e) {
    // Handle parse errors
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // Ignore
  }
}
