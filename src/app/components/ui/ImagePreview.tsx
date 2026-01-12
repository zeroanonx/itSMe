"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/app/components/shadcn/dialog";
import { VisuallyHidden } from "./VisuallyHidden";

type ImagePreviewProps = React.ComponentProps<"img"> & {
  width?: number;
  height?: number;
};

export default function ImagePreview({
  src,
  alt,
  ...props
}: ImagePreviewProps) {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={src}
          alt={alt}
          {...props}
          className="cursor-zoom-in rounded-md"
        />
      </DialogTrigger>

      <DialogContent
        className="
    max-w-[90vw]
    max-h-[60vh]
    p-0
    bg-transparent
    border-none
    flex
    items-center
    justify-center
  "
      >
        <VisuallyHidden>
          <DialogTitle>{alt || "Image preview"}</DialogTitle>
        </VisuallyHidden>

        <img
          src={src}
          alt={alt ?? ""}
          className="
      max-h-[60vh]
      max-w-[90vw]
      object-contain
    "
        />
      </DialogContent>
    </Dialog>
  );
}
