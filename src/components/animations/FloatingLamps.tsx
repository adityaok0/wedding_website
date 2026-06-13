"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Lamp {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingLamps() {
  const [lamps, setLamps] = useState<Lamp[]>([]);

  useEffect(() => {
    // Generate lamps on client side
    const generatedLamps = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // percentage vw
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
      size: 30 + Math.random() * 40,
    }));
    setLamps(generatedLamps);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {lamps.map((lamp) => (
        <motion.div
          key={lamp.id}
          className="absolute bottom-[-10%]"
          initial={{
            x: `${lamp.x}vw`,
            y: "10vh",
            opacity: 0,
          }}
          animate={{
            y: "-110vh",
            x: `${lamp.x + (Math.random() * 10 - 5)}vw`,
            opacity: [0, 1, 0.8, 1, 0], // Flickering effect
          }}
          transition={{
            duration: lamp.duration,
            delay: lamp.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Lamp Base (Diya shape) */}
          <div className="relative" style={{ width: lamp.size, height: lamp.size }}>
            <div className="absolute bottom-0 w-full h-[40%] bg-amber-800 rounded-b-full shadow-md border-t-2 border-soft-gold" />
            
            {/* Flame */}
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[30%] h-[50%] bg-orange-400 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] animate-[flicker_0.5s_infinite_alternate]" />
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[15%] h-[30%] bg-yellow-200 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] animate-[flicker_0.3s_infinite_alternate]" />
            
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-orange-400/20 blur-xl rounded-full" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300%] h-[300%] bg-soft-gold/10 blur-2xl rounded-full" />
          </div>
        </motion.div>
      ))}
      <style jsx global>{`
        @keyframes flicker {
          0% { transform: translate(-50%, 0) scale(1); opacity: 0.9; }
          100% { transform: translate(-50%, -2px) scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
