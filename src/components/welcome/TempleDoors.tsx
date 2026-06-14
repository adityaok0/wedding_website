"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FloatingPetals } from "../animations/FloatingPetals";

export function TempleDoors({ onComplete }: { onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(true), 800);
    const timer2 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-deep-forest overflow-hidden flex items-center justify-center">
      {/* Background Behind Doors */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-soft-gold/20 via-deep-forest to-deep-forest">
        <FloatingPetals />

        {/* Soft Sunlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-soft-gold/30 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="z-10 text-center px-6"
        >
          <h2 className="font-playfair text-3xl md:text-5xl text-ivory mb-6 leading-tight">
            Welcome to our <br />
            <span className="text-soft-gold italic">wedding celebration</span>
          </h2>
        </motion.div>
      </div>

      {/* Left Door */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#3E2723] z-20 border-r-2 border-[#5D4037] shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex items-center justify-end pr-4 md:pr-8"
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "-100%" : "0%" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Door details */}
        <div className="w-4 h-32 md:h-48 border-2 border-soft-gold rounded-full flex items-center justify-center">
          <div className="w-2 h-16 bg-soft-gold rounded-full" />
        </div>
        {/* Decorative panels */}
        <div className="absolute top-10 bottom-10 left-4 right-12 md:right-16 border border-[#5D4037] rounded-sm opacity-50" />
      </motion.div>

      {/* Right Door */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#3E2723] z-20 border-l-2 border-[#261410] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex items-center justify-start pl-4 md:pl-8"
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "100%" : "0%" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Door details */}
        <div className="w-4 h-32 md:h-48 border-2 border-soft-gold rounded-full flex items-center justify-center">
          <div className="w-2 h-16 bg-soft-gold rounded-full" />
        </div>
        {/* Decorative panels */}
        <div className="absolute top-10 bottom-10 left-12 md:left-16 right-4 border border-[#5D4037] rounded-sm opacity-50" />
      </motion.div>
    </div>
  );
}
