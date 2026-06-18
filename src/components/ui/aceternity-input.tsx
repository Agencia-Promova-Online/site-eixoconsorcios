"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const AceternityInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="group/input rounded-xl transition duration-300">
        <input
          type={type}
          className={cn(
            `shadow-input flex h-12 w-full rounded-xl border-none bg-zinc-900 px-4 py-3 text-sm text-white transition duration-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
AceternityInput.displayName = "AceternityInput";

export { AceternityInput };

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AceternityTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="group/input rounded-xl transition duration-300">
        <textarea
          className={cn(
            `shadow-input flex min-h-[120px] w-full rounded-xl border-none bg-zinc-900 px-4 py-3 text-sm text-white transition duration-400 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none resize-none`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
AceternityTextarea.displayName = "AceternityTextarea";

export { AceternityTextarea };
