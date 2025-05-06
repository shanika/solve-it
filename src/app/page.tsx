"use client";
// This is a Next.js client component because it uses useState and interactive UI logic.
// See: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-client-components

import { StepwiseWorkflow } from "../components/StepwiseWorkflow";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <StepwiseWorkflow />
    </main>
  );
}
