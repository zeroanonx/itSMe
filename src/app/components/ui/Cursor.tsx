"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const CursorComponents = styled.div`
  @media screen and (max-width: 480px) {
    body {
      -webkit-overflow-scrolling: auto;
      scroll-snap-stop: always;
      cursor: auto;
    }

    .cursor {
      display: none;
    }
  }

  html::-webkit-scrollbar {
    display: none;
  }

  html {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .cursor {
    pointer-events: none;
  }

  .cursor__ball--big {
    opacity: 0;
  }

  .cursor__ball--small {
    opacity: 0;
  }

  .cursor__ball {
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: difference;
    z-index: 99999;
  }

  .cursor__ball circle {
    fill: white;
  }
`;

const styles = [
  "color: #FF6B00",
  "font-size: 20px",
  "font-family: sans-serif",
  "padding: 10px 20px",
].join(";");

export default function Cursor() {
  const bigBallRef = useRef<HTMLDivElement>(null);
  const smallBallRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bigBall = bigBallRef.current!;
    const smallBall = smallBallRef.current!;

    gsap.set(bigBall, { x: 0, y: 0, opacity: 0 });
    gsap.set(smallBall, { x: 0, y: 0, opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(bigBall, {
        duration: 0.6,
        x: e.clientX - 30,
        y: e.clientY - 30,
        opacity: 1,
      });
      gsap.to(smallBall, {
        duration: 0.1,
        x: e.clientX - 7,
        y: e.clientY - 7,
        opacity: 1,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.killTweensOf([bigBall, smallBall]);
    };
  }, []);

  console.log("%cMade by https://zeroanon.com ", styles);
  return (
    <CursorComponents>
      <div className="cursor">
        <div ref={bigBallRef} className="cursor__ball cursor__ball--big ">
          <svg height="60" width="60">
            <circle cx="30" cy="30" r="20" stroke-width="0" />
          </svg>
        </div>
        <div ref={smallBallRef} className="cursor__ball cursor__ball--small">
          <svg height="14" width="14">
            <circle cx="7" cy="7" r="5" stroke-width="0" />
          </svg>
        </div>
      </div>
    </CursorComponents>
  );
}
