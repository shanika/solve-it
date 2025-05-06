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

interface ReasonsStepProps {
  problem: string;
  reasons: string[];
  onAddReason: (reason: string) => void;
  error?: string;
}

export function ReasonsStep({
  problem,
  reasons,
  onAddReason,
  error,
}: ReasonsStepProps) {
  const [input, setInput] = useState("");
  const [touched, setTouched] = useState(false);

  const handleAdd = () => {
    if (input.trim()) {
      onAddReason(input.trim());
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
      aria-labelledby="reasons-step-title"
    >
      <CardHeader>
        <CardTitle>
          <h2 id="reasons-step-title" className="text-lg font-semibold">
            Brainstorm Reasons
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="font-medium mb-1">Problem Statement:</div>
          <div className="bg-muted rounded px-3 py-2 text-sm text-muted-foreground">
            {problem}
          </div>
        </div>
        <label htmlFor="reason-input" className="block font-medium mb-2">
          Add a Reason
        </label>
        <div className="flex gap-2 items-start">
          <Input
            id="reason-input"
            aria-label="Reason input"
            placeholder="Enter a reason..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-required="true"
            aria-invalid={!!error || (touched && !input.trim())}
            aria-describedby={
              error || (touched && !input.trim()) ? "reason-error" : undefined
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
          <div id="reason-error" className="text-destructive text-sm mt-2">
            {error || "Reason cannot be empty."}
          </div>
        )}
        <ul className="mt-4 space-y-2" aria-label="List of reasons">
          {reasons.map((reason, idx) => (
            <li key={idx} className="bg-accent rounded px-3 py-1 text-sm">
              {reason}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <span className="text-muted-foreground text-xs">
          Add as many reasons as you like.
        </span>
      </CardFooter>
    </Card>
  );
}
