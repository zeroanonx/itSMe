"use client";

import { useState } from "react";
import ChatModal from "./ChatModal";
import { motion, AnimatePresence } from "motion/react";

export default function AIEntry() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="打开聊天"
        title="打开聊天"
        animate={{
          boxShadow: [
            "0 6px 18px rgba(99,102,241,0.18)",
            "0 24px 48px rgba(99,102,241,0.14)",
            "0 6px 18px rgba(99,102,241,0.18)",
          ],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="
    fixed bottom-6 right-6 z-50
    h-14 w-14 rounded-full
    bg-gradient-to-br from-indigo-500 to-purple-600
    text-white flex items-center justify-center
    shadow-xl transform-gpu
    hover:scale-105 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-indigo-300/40
    ring-offset-2 ring-offset-transparent
  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-3.582 7-8 7-1.02 0-1.98-.17-2.86-.48L3 21l1.5-4.64A8.94 8.94 0 013 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
          />
        </svg>
      </motion.button>
      <AnimatePresence>
        {open && <ChatModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
