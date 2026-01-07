"use client";

import { motion } from "motion/react";
import ChatGirl from "@/app/components/ai/ChatGirl";

export default function ChatModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-end sm:items-center"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="
          w-full sm:w-105 h-[70vh]
          rounded-t-3xl sm:rounded-3xl
          bg-white/80 dark:bg-neutral-900/80
          border border-border shadow-2xl
          flex flex-col
        "
      >
        <div className="px-5 py-3 border-b text-xs opacity-60">她在你身边</div>
        <ChatGirl />
      </motion.div>
    </motion.div>
  );
}
