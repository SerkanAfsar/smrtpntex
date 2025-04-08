"use client"; // Error boundaries must be Client Components

import { cn } from "@/Utils";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // const [isOpened, toggleOpened] = useLeftMenuStore((state) => [
  //   state.isOpened,
  //   state.toggleOpened,
  // ]);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className={cn(
        "ml-[244px] flex flex-1 flex-col bg-adminBgColor transition-all",
      )}
    >
      <div>
        <h2>{error.message || "error"} </h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
