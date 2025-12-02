import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StateProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useUserInfo = create(
  persist<StateProps>(
    (set) => ({
      theme: "dark",
      setTheme: (theme) =>
        set(() => {
          theme === "dark"
            ? document.documentElement.classList.remove("dark")
            : document.documentElement.classList.add("dark");
          return { theme };
        }),
    }),
    {
      name: "its-me-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
