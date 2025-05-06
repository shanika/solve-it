"use client";
// This is a Next.js client component because it uses useState and interactive UI logic.
// See: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-client-components

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Shadcn UI Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-4"
          />
          <div className="text-muted-foreground text-sm mb-2">
            Input value: {inputValue || <span className="italic">(empty)</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => alert(`Input: ${inputValue}`)}>
            Show Input Value
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
