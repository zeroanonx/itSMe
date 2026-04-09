"use client";

import { cn } from "@/app/utils";
import localFont from "next/font/local";
import styled from "styled-components";

const playwrite = localFont({
  src: "../../assets/font/IN.ttf",
  display: "swap",
});

const SvgLogo = styled.div`
  @keyframes drawSignature {
    0% {
      stroke-dashoffset: var(--stroke-dashoffset);
    }
    15% {
      fill: transparent;
    }
    35%,
    75% {
      stroke-dashoffset: 0;
      fill: var(--stroke-theme);
    }
    90%,
    100% {
      stroke-dashoffset: var(--stroke-dashoffset);
      fill: transparent;
    }
  }

  .svg-logo {
    display: block;
    overflow: visible;
    vertical-align: middle;
  }

  .logo-text {
    font-weight: 400;
    letter-spacing: 0;
    stroke: var(--stroke-theme);
    stroke-linecap: round;
    stroke-linejoin: round;
    paint-order: stroke fill;
  }

  .logo-path {
    fill: transparent;
    stroke-width: var(--stroke-width);
    stroke-dasharray: var(--stroke-dashoffset);
    stroke-dashoffset: var(--stroke-dashoffset);
    animation: drawSignature var(--animation-duration)
      cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

export default function Logo({ isPosition = true }: { isPosition?: boolean }) {
  return (
    <SvgLogo
      className={cn([
        "select-none outline-none md:pl-[30px]",
        isPosition ? "absolute top-[20px] xl:fixed" : "",
      ])}
    >
      <svg
        viewBox="0 20 340 130"
        className="svg-logo !block h-[36px] sm:!hidden"
        role="img"
        aria-label="zeroanonx animated logo"
      >
        <text
          x="6"
          y="76"
          className={cn("logo-text logo-path text-5xl", playwrite.className)}
        >
          zeroanonx
        </text>
      </svg>

      <svg
        viewBox="0 10 340 130"
        className="svg-logo !hidden h-[42px] sm:!block md:h-[50px]"
        role="img"
        aria-label="zeroanonx animated logo"
      >
        <text
          x="6"
          y="76"
          className={cn(
            "logo-text logo-path sm:text-6xl text-4xl",
            playwrite.className
          )}
        >
          zeroanonx
        </text>
      </svg>
    </SvgLogo>
  );
}
