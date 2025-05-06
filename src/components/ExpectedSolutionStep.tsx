"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

interface ExpectedSolutionStepProps {
  problem: string;
  reasons: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ExpectedSolutionStep({
  problem,
  reasons,
  value,
  onChange,
  error,
}: ExpectedSolutionStepProps) {
  const [touched, setTouched] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (!touched) setTouched(true);
  };

  return (
    <Card
      className="w-full px-2 sm:px-4 md:px-8"
      role="region"
      aria-labelledby="expected-solution-step-title"
    >
      <CardHeader>
        <CardTitle>
          <h2
            id="expected-solution-step-title"
            className="text-lg font-semibold"
          >
            Define Your Expected Solution
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="font-medium mb-1">Problem Statement:</div>
          <div className="bg-muted rounded px-3 py-2 text-sm text-muted-foreground mb-2">
            {problem}
          </div>
          <div className="font-medium mb-1">Reasons:</div>
          <ul
            className="list-disc list-inside text-sm text-muted-foreground mb-2"
            aria-label="List of reasons"
          >
            {reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
        <label htmlFor="expected-solution" className="block font-medium mb-2">
          Expected Solution
        </label>
        <textarea
          id="expected-solution"
          aria-label="Expected solution input"
          className="w-full min-h-[80px] rounded border px-3 py-2 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary"
          placeholder="Describe your expected solution..."
          value={value}
          onChange={handleInput}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "expected-solution-error" : undefined}
          onBlur={() => setTouched(true)}
        />
        {error && (touched || value.length === 0) && (
          <div
            id="expected-solution-error"
            className="text-destructive text-sm mt-2"
          >
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <span className="text-muted-foreground text-xs">
          This field is required.
        </span>
      </CardFooter>
    </Card>
  );
}
