import { useEffect, useState } from "react";

const KEY = "girl-memory";

export function useGirlMemory() {
  const [memory, setMemory] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setMemory(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(memory.slice(-30)));
  }, [memory]);

  return {
    memory,
    remember: (text: string) => setMemory((m) => [...m, text]),
  };
}
