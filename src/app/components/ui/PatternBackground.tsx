"use client";

import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

/* -------------------------------- constants -------------------------------- */

export const PATTERN_BACKGROUND_DIRECTION = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
  TopLeft: "top-left",
  TopRight: "top-right",
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
} as const;

export const PATTERN_BACKGROUND_VARIANT = {
  Grid: "grid",
  Dot: "dot",
  BigDot: "big-dot",
} as const;

export const PATTERN_BACKGROUND_MASK = {
  Ellipse: "ellipse",
  EllipseTop: "ellipse-top",
} as const;

export const PATTERN_BACKGROUND_SPEED = {
  Default: 10000,
  Slow: 25000,
  Fast: 5000,
} as const;

/* -------------------------------- cva -------------------------------- */

const patternBackgroundVariants = cva(
  "fixed inset-0 pointer-events-none z-1 overflow-hidden",
  {
    variants: {
      variant: {
        grid: "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]",
        dot: "bg-[radial-gradient(currentColor_1px,transparent_1px)]",
        "big-dot": "bg-[radial-gradient(currentColor_3px,transparent_3px)]",
      },
      size: {
        xs: "bg-[size:8px_8px]",
        sm: "bg-[size:16px_16px]",
        md: "bg-[size:24px_24px]",
        lg: "bg-[size:32px_32px]",
      },
      mask: {
        ellipse:
          "[mask-image:radial-gradient(ellipse_at_center,transparent,black_80%)]",
        "ellipse-top":
          "[mask-image:radial-gradient(ellipse_at_top,transparent,black_80%)]",
      },
    },
    defaultVariants: {
      variant: "grid",
      size: "md",
      mask: "ellipse",
    },
  }
);

/* -------------------------------- props -------------------------------- */

export interface PatternBackgroundProps {
  variant?: keyof typeof PATTERN_BACKGROUND_VARIANT;
  size?: "xs" | "sm" | "md" | "lg";
  mask?: keyof typeof PATTERN_BACKGROUND_MASK;
  animate?: boolean;
  direction?: keyof typeof PATTERN_BACKGROUND_DIRECTION;
  speed?: number;
  className?: string;
  children?: ReactNode;
}

/* -------------------------------- component -------------------------------- */

export default function PatternBackground({
  variant = "Grid",
  size = "md",
  mask = "Ellipse",
  animate = false,
  direction = "Top",
  speed = PATTERN_BACKGROUND_SPEED.Default,
  className,
  children,
}: PatternBackgroundProps) {
  return (
    <div
      className={clsx(
        patternBackgroundVariants({
          variant: PATTERN_BACKGROUND_VARIANT[variant],
          size,
          mask: PATTERN_BACKGROUND_MASK[mask],
        }),
        "text-neutral-300 dark:text-neutral-700",
        animate && `move move-${PATTERN_BACKGROUND_DIRECTION[direction]}`,
        className
      )}
      style={{ animationDuration: `${speed}ms` }}
    >
      {children}
    </div>
  );
}

/* -------------------------------- animations -------------------------------- */

if (typeof document !== "undefined") {
  const id = "pattern-background-animations";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
@keyframes to-top { from { background-position: 0 100%; } to { background-position: 0 0; } }
@keyframes to-bottom { from { background-position: 0 0; } to { background-position: 0 100%; } }
@keyframes to-left { from { background-position: 100% 0; } to { background-position: 0 0; } }
@keyframes to-right { from { background-position: 0 0; } to { background-position: 100% 0; } }
@keyframes to-top-left { from { background-position: 100% 100%; } to { background-position: 0 0; } }
@keyframes to-top-right { from { background-position: 0 100%; } to { background-position: 100% 0; } }
@keyframes to-bottom-left { from { background-position: 100% 0; } to { background-position: 0 100%; } }
@keyframes to-bottom-right { from { background-position: 0 0; } to { background-position: 100% 100%; } }

.move {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.move-top { animation-name: to-top; }
.move-bottom { animation-name: to-bottom; }
.move-left { animation-name: to-left; }
.move-right { animation-name: to-right; }
.move-top-left { animation-name: to-top-left; }
.move-top-right { animation-name: to-top-right; }
.move-bottom-left { animation-name: to-bottom-left; }
.move-bottom-right { animation-name: to-bottom-right; }
`;
    document.head.appendChild(style);
  }
}
