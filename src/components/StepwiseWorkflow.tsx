"use client";
// Main client component for stepwise problem-solving workflow
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ProblemEntryStep } from "./ProblemEntryStep";
import { ReasonsStep } from "./ReasonsStep";
import { ExpectedSolutionStep } from "./ExpectedSolutionStep";
import { WaysToSolveStep } from "./WaysToSolveStep";
import {
  saveSession,
  loadSession,
  clearSession,
} from "../lib/localStorageSession";
import type { ProblemSession } from "../lib/types";

const STEP_TITLES = [
  "Problem Entry",
  "Reasons Brainstorming",
  "Expected Solution",
  "Ways to Solve",
];

export function StepwiseWorkflow() {
  const [step, setStep] = useState(0); // 0-based index for 4 steps
  const [problem, setProblem] = useState("");
  const [problemError, setProblemError] = useState<string | undefined>(
    undefined
  );
  const [reasons, setReasons] = useState<string[]>([]);
  const [reasonsError, setReasonsError] = useState<string | undefined>(
    undefined
  );
  const [expectedSolution, setExpectedSolution] = useState("");
  const [expectedSolutionError, setExpectedSolutionError] = useState<
    string | undefined
  >(undefined);
  const [waysToSolve, setWaysToSolve] = useState<string[]>([]);
  const [waysToSolveError, setWaysToSolveError] = useState<string | undefined>(
    undefined
  );
  const [loaded, setLoaded] = useState(false);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);
  const ariaLiveRef = useRef<HTMLDivElement>(null);

  // Load session on mount
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setProblem(session.problem);
      setReasons(session.reasons);
      setExpectedSolution(session.expectedSolution);
      setWaysToSolve(session.waysToSolve);
      setStep(0);
      window.alert("Session loaded from previous visit.");
    }
    setLoaded(true);
  }, []);

  // Auto-save session on state change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    const session: ProblemSession = {
      problem,
      reasons,
      expectedSolution,
      waysToSolve,
    };
    saveSession(session);
  }, [problem, reasons, expectedSolution, waysToSolve, loaded]);

  // Announce step changes for screen readers
  useEffect(() => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = `Step ${step + 1}: ${
        STEP_TITLES[step]
      }`;
    }
    if (stepTitleRef.current) {
      stepTitleRef.current.focus();
    }
  }, [step]);

  const handleReset = () => {
    setProblem("");
    setReasons([]);
    setExpectedSolution("");
    setWaysToSolve([]);
    setStep(0);
    clearSession();
    window.alert("Session has been reset.");
  };

  const validateStep = () => {
    if (step === 0) {
      if (!problem.trim()) {
        setProblemError("Problem statement is required.");
        return false;
      }
      setProblemError(undefined);
    }
    if (step === 1) {
      if (reasons.length === 0) {
        setReasonsError("Please add at least one reason.");
        return false;
      }
      setReasonsError(undefined);
    }
    if (step === 2) {
      if (!expectedSolution.trim()) {
        setExpectedSolutionError("Expected solution is required.");
        return false;
      }
      setExpectedSolutionError(undefined);
    }
    if (step === 3) {
      if (waysToSolve.length === 0) {
        setWaysToSolveError("Please add at least one way to solve.");
        return false;
      }
      setWaysToSolveError(undefined);
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEP_TITLES.length));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleAddReason = (reason: string) => {
    setReasons((prev) => [...prev, reason]);
    setReasonsError(undefined);
  };

  const handleAddWay = (way: string) => {
    setWaysToSolve((prev) => [...prev, way]);
    setWaysToSolveError(undefined);
  };

  return (
    <main
      role="main"
      className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10"
    >
      <div className="flex w-full justify-between items-center mb-2">
        <h1
          ref={stepTitleRef}
          tabIndex={-1}
          className="text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {step < STEP_TITLES.length ? STEP_TITLES[step] : "Completed"}
        </h1>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div
        className="w-full min-h-[120px] flex items-center justify-center border rounded bg-muted/30"
        style={{ minHeight: 180 }}
      >
        {step === 0 ? (
          <ProblemEntryStep
            value={problem}
            onChange={setProblem}
            error={problemError}
          />
        ) : step === 1 ? (
          <ReasonsStep
            problem={problem}
            reasons={reasons}
            onAddReason={handleAddReason}
            error={reasonsError}
          />
        ) : step === 2 ? (
          <ExpectedSolutionStep
            problem={problem}
            reasons={reasons}
            value={expectedSolution}
            onChange={setExpectedSolution}
            error={expectedSolutionError}
          />
        ) : step === 3 ? (
          <WaysToSolveStep
            problem={problem}
            reasons={reasons}
            expectedSolution={expectedSolution}
            ways={waysToSolve}
            onAddWay={handleAddWay}
            error={waysToSolveError}
          />
        ) : (
          <section className="flex flex-col items-center w-full p-8">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              All steps completed!
            </h2>
            <p className="text-base mb-2">
              You have finished the problem-solving workflow.
            </p>
            <p className="text-sm text-muted-foreground">
              Review your entries or start a new session as needed.
            </p>
          </section>
        )}
      </div>
      <div className="flex gap-4 mt-4 w-full justify-center">
        <Button
          onClick={prevStep}
          disabled={step === 0}
          variant="secondary"
          className="focus-visible:ring-2 focus-visible:ring-primary min-w-[44px] min-h-[44px]"
        >
          Previous
        </Button>
        {step < STEP_TITLES.length - 1 && (
          <Button
            onClick={nextStep}
            disabled={
              (step === 0 && !problem.trim()) ||
              (step === 1 && reasons.length === 0) ||
              (step === 2 && !expectedSolution.trim())
            }
            className="focus-visible:ring-2 focus-visible:ring-primary min-w-[44px] min-h-[44px]"
          >
            Next
          </Button>
        )}
        {step === STEP_TITLES.length - 1 && (
          <Button
            onClick={nextStep}
            disabled={waysToSolve.length === 0}
            className="focus-visible:ring-2 focus-visible:ring-primary min-w-[44px] min-h-[44px]"
          >
            Finish
          </Button>
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        {step < STEP_TITLES.length
          ? `Step ${step + 1} of ${STEP_TITLES.length}`
          : "Workflow complete"}
      </div>
      <div
        ref={ariaLiveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </main>
  );
}
