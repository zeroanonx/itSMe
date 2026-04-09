// app/store/theme.ts
import { create } from "zustand";

type Theme = "light" | "dark";

export const useTheme = create<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>(() => ({
  theme:
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
      : "dark",
  setTheme: () => {},
}));
