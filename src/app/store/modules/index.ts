import { PROJECT_STORAGE_KEY } from "@/app/constants";
import { UseUserInfo } from "@/app/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserInfo = create(
  persist(
    (set) => ({
      project: "dark",
    }),
    {
      name: PROJECT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
