"use client";

import { useEffect } from "react";

export default function Search() {
  useEffect(() => {
    // @ts-ignore
    new window.PagefindUI({
      element: "#search",
      showImages: false,
    });
  }, []);

  return <div id="search" />;
}
