"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate petals only on the client to avoid hydration mismatch
    const generatedPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage vw
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      size: 10 + Math.random() * 20,
      rotation: Math.random() * 360,
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-10%]"
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + (Math.random() * 20 - 10)}vw`,
            rotate: petal.rotation + 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Subtle petal shape using CSS */}
          <div
            className="bg-blush-peach/40 blur-[1px]"
            style={{
              width: petal.size,
              height: petal.size,
              borderRadius: "0 50% 50% 50%",
              transform: "rotate(45deg)",
              boxShadow: "0 0 10px rgba(235, 205, 196, 0.5)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
