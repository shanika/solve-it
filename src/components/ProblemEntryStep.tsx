"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState, FormEvent } from "react";

interface ProblemEntryStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ProblemEntryStep({
  value,
  onChange,
  error,
}: ProblemEntryStepProps) {
  const [touched, setTouched] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (!touched) setTouched(true);
  };

  return (
    <Card
      className="w-full px-2 sm:px-4 md:px-8"
      role="region"
      aria-labelledby="problem-step-title"
    >
      <CardHeader>
        <CardTitle>
          <h2 id="problem-step-title" className="text-lg font-semibold">
            Describe Your Problem
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <label htmlFor="problem-statement" className="block font-medium mb-2">
          Problem Statement
        </label>
        <textarea
          id="problem-statement"
          aria-label="Problem statement input"
          className="w-full min-h-[80px] rounded border px-3 py-2 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary"
          placeholder="Enter your problem statement..."
          value={value}
          onChange={handleInput}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "problem-error" : undefined}
          onBlur={() => setTouched(true)}
        />
        {error && (touched || value.length === 0) && (
          <div id="problem-error" className="text-destructive text-sm mt-2">
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
