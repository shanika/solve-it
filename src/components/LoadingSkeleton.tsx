import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { LucideSparkles } from "lucide-react";

interface LoadingSkeletonProps {
  lines?: number;
  title?: string;
  className?: string;
}

export function LoadingSkeleton({
  lines = 4,
  title = "AI Suggestions",
  className,
}: LoadingSkeletonProps) {
  return (
    <Card className={className} aria-label="Loading AI Suggestions">
      <CardHeader className="flex flex-row items-center gap-2">
        <LucideSparkles
          className="text-primary w-5 h-5 animate-pulse"
          aria-hidden="true"
        />
        <CardTitle className="text-base font-semibold flex-1">
          {title}
        </CardTitle>
        <span
          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto"
          aria-label="AI generated"
        >
          AI
        </span>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-decimal list-inside" role="list">
          {Array.from({ length: lines }).map((_, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Skeleton className="h-5 w-full max-w-[90%] rounded" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
