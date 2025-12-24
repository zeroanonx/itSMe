"use client";

export type BackgroundType = "flow" | "tree" | "off" | "pattern";

let currentType: BackgroundType = "pattern";
const listeners = new Set<(t: BackgroundType) => void>();

export function useBackground() {
  return {
    setType(type: BackgroundType) {
      currentType = type;
      listeners.forEach((fn) => fn(type));
    },
  };
}
export function subscribeBackground(fn: (t: BackgroundType) => void) {
  listeners.add(fn);
  fn(currentType);

  return () => {
    listeners.delete(fn); // 👈 不 return
  };
}
