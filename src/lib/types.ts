// src/lib/types.ts
// Shared TypeScript interfaces and types for the application.

export interface ProblemSession {
  /** The main problem statement entered by the user */
  problem: string;
  /** List of reasons brainstormed for the problem */
  reasons: string[];
  /** The expected solution as defined by the user */
  expectedSolution: string;
  /** List of actionable ways to solve the problem */
  waysToSolve: string[];
}
