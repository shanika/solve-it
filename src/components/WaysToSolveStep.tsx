"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface WaysToSolveStepProps {
  problem: string;
  reasons: string[];
  expectedSolution: string;
  ways: string[];
  onAddWay: (way: string) => void;
  error?: string;
}

export function WaysToSolveStep({
  problem,
  reasons,
  expectedSolution,
  ways,
  onAddWay,
  error,
}: WaysToSolveStepProps) {
  const [input, setInput] = useState("");
  const [touched, setTouched] = useState(false);

  const handleAdd = () => {
    if (input.trim()) {
      onAddWay(input.trim());
      setInput("");
      setTouched(false);
    } else {
      setTouched(true);
    }
  };

  return (
    <Card
      className="w-full px-2 sm:px-4 md:px-8"
      role="region"
      aria-labelledby="ways-to-solve-step-title"
    >
      <CardHeader>
        <CardTitle>
          <h2 id="ways-to-solve-step-title" className="text-lg font-semibold">
            Ways to Solve
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
          <div className="font-medium mb-1">Expected Solution:</div>
          <div className="bg-muted rounded px-3 py-2 text-sm text-muted-foreground mb-2">
            {expectedSolution}
          </div>
        </div>
        <label htmlFor="way-input" className="block font-medium mb-2">
          Add a Way to Solve
        </label>
        <div className="flex gap-2 items-start">
          <Input
            id="way-input"
            aria-label="Way to solve input"
            placeholder="Enter a way to solve..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-required="true"
            aria-invalid={!!error || (touched && !input.trim())}
            aria-describedby={
              error || (touched && !input.trim()) ? "way-error" : undefined
            }
            onBlur={() => setTouched(true)}
            className="flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <Button
            type="button"
            onClick={handleAdd}
            className="min-w-[44px] min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary"
          >
            Add
          </Button>
        </div>
        {(error || (touched && !input.trim())) && (
          <div id="way-error" className="text-destructive text-sm mt-2">
            {error || "Way to solve cannot be empty."}
          </div>
        )}
        <ul className="mt-4 space-y-2" aria-label="List of ways to solve">
          {ways.map((way, idx) => (
            <li key={idx} className="bg-accent rounded px-3 py-1 text-sm">
              {way}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <span className="text-muted-foreground text-xs">
          Add as many ways as you like.
        </span>
      </CardFooter>
    </Card>
  );
}
