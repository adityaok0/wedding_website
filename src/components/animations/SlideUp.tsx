"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SlideUp({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  yOffset = 30,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // Apple-like easing
      className={className}
    >
      {children}
    </motion.div>
  );
}
