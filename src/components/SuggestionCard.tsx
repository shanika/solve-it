import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LucideSparkles, LucideCopy } from "lucide-react";

interface SuggestionCardProps {
  suggestions: string[];
  title?: string;
  className?: string;
}

export function SuggestionCard({
  suggestions,
  title = "AI Suggestions",
  className,
}: SuggestionCardProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Card className={className} aria-label="AI Suggestions">
      <CardHeader className="flex flex-row items-center gap-2">
        <LucideSparkles className="text-primary w-5 h-5" aria-hidden="true" />
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
          {suggestions.map((suggestion, idx) => (
            <li key={idx} className="flex items-start gap-2 group">
              <span className="flex-1 break-words">{suggestion}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Copy suggestion ${idx + 1}`}
                onClick={() => handleCopy(suggestion)}
                className="opacity-70 group-hover:opacity-100"
              >
                <LucideCopy className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
