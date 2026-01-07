"use client";

import { useState } from "react";
import ChatModal from "./ChatModal";
import { motion, AnimatePresence } from "motion/react";

import Spline from "@splinetool/react-spline";

export default function AIEntry() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-10 right-10 w-60 h-60 flex items-center justify-center z-50 cursor-pointer"
        animate={{
          y: [0, -10, 0, -6, 0], // 上下轻微漂浮
          rotate: [0, 5, -5, 0], // 微旋转
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-25 h-28 overflow-hidden flex items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <div className="w-200 h-200">
            <Spline scene="https://prod.spline.design/d4xJyLrARYgO6Buq/scene.splinecode" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ChatModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
