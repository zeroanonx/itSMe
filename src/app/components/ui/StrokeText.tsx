import { cn } from "@/app/utils";
import React from "react";
import styled from "styled-components";

const StrokeTextComponents = styled.span`
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #aaa;
`;

interface Props {
  text: string;
  size?: string;
  left?: string;
  top?: string;
}

export default function StrokeText({
  text,
  size = "text-9xl",
  left = "-left-2",
  top = "-top-16",
}: Props) {
  return (
    <StrokeTextComponents
      className={cn(
        "text-transparent absolute  font-bold  opacity-10",
        size,
        left,
        top
      )}
    >
      {text}
    </StrokeTextComponents>
  );
}
