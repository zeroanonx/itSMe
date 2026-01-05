"use client";
export type BackgroundType = "tree" | "off" | "pattern";

let currentType: BackgroundType = "pattern";
const listeners = new Set<(t: BackgroundType) => void>();

export const BACKGROUNDS: BackgroundType[] = [
  "tree",
  "pattern",
  "pattern",
  "pattern",
];

function hashString(str: string): number {
  let hash = 0x811c9dc5; // FNV offset basis

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }

  return hash >>> 0; // 转无符号
}

/** 根据 pathname 稳定生成背景 */
export function getBackgroundByPathname(pathname: string): BackgroundType {
  // 可选：忽略 query / hash
  const purePath = pathname.split("?")[0].split("#")[0];

  const hash = hashString(purePath);
  const index = hash % BACKGROUNDS.length;

  return BACKGROUNDS[index];
}

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
    listeners.delete(fn);
  };
}
