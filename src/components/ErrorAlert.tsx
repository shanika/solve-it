import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { LucideAlertTriangle } from "lucide-react";
import { ReactNode } from "react";

interface ErrorAlertProps {
  message: string | ReactNode;
  className?: string;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function ErrorAlert({
  message,
  className,
  title = "Error",
  dismissible = false,
  onDismiss,
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className={className} role="alert">
      <div className="flex items-center gap-2">
        <LucideAlertTriangle
          className="text-destructive w-5 h-5"
          aria-hidden="true"
        />
        <AlertTitle className="font-semibold text-destructive flex-1">
          {title}
        </AlertTitle>
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss error"
            className="ml-auto text-destructive hover:underline text-xs"
            onClick={onDismiss}
          >
            Dismiss
          </button>
        )}
      </div>
      <AlertDescription className="mt-1 text-destructive">
        {message}
      </AlertDescription>
    </Alert>
  );
}
