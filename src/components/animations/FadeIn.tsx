"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
