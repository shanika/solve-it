"use client";
// Main client component for stepwise problem-solving workflow
import { useState } from "react";
import { Button } from "./ui/button";
import { ProblemEntryStep } from "./ProblemEntryStep";
import { ReasonsStep } from "./ReasonsStep";
import { ExpectedSolutionStep } from "./ExpectedSolutionStep";

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
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleAddReason = (reason: string) => {
    setReasons((prev) => [...prev, reason]);
    setReasonsError(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="text-lg font-semibold mb-2">{STEP_TITLES[step]}</div>
      <div className="w-full min-h-[120px] flex items-center justify-center border rounded bg-muted/30">
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
        ) : (
          <span className="text-muted-foreground text-base">
            {`Step ${step + 1}: ${STEP_TITLES[step]} (content coming soon)`}
          </span>
        )}
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={prevStep} disabled={step === 0} variant="secondary">
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={
            (step === 0 && !problem.trim()) ||
            (step === 1 && reasons.length === 0) ||
            (step === 2 && !expectedSolution.trim())
          }
        >
          Next
        </Button>
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Step {step + 1} of {STEP_TITLES.length}
      </div>
    </div>
  );
}
