"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FloatingPetals } from "../animations/FloatingPetals";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Extended timeout to allow the richer sequence to complete beautifully
    setTimeout(onOpen, 2400); 
  };

  return (
    <div className="relative min-h-screen bg-ivory flex flex-col items-center justify-center overflow-hidden">
      <FloatingPetals />
      
      {/* Dynamic Title with depth blur */}
      <motion.div 
        className="z-10 text-center mb-16"
        animate={{ 
          opacity: isOpen ? 0 : 1,
          filter: isOpen ? "blur(8px)" : "blur(0px)",
          y: isOpen ? -20 : 0
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-playfair text-4xl text-deep-forest mb-4 drop-shadow-sm">Aditya & Sarayu</h1>
        <p className="font-cormorant text-xl text-sage-green italic opacity-80">Tap to Open</p>
      </motion.div>

      {/* 3D Perspective Container */}
      <motion.div 
        className="relative cursor-pointer"
        style={{ perspective: "1200px" }} // Adds real 3D depth to the flap rotation
        onClick={handleOpen}
        whileHover={{ scale: isOpen ? 1 : 1.03 }}
        whileTap={{ scale: isOpen ? 1 : 0.98 }}
        animate={{ 
          scale: isOpen ? 1.8 : 1, 
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 40 : 0 
        }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Envelope Body / Base */}
        <div className="w-80 h-56 bg-gradient-to-br from-[#b89456] to-[#9c7b43] rounded-md shadow-2xl relative flex items-center justify-center border border-[#c4a46a]">
          
          {/* Inner Envelope Shadow (makes it look empty inside) */}
          <div className="absolute inset-2 bg-[#2a332c] rounded-sm opacity-20 shadow-inner" />

          {/* The Letter inside */}
          <motion.div 
            className="absolute bottom-2 left-3 right-3 h-48 bg-[#FDFBF7] shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-sm flex items-start justify-center pt-8 border border-[#E8E1D9] overflow-hidden"
            style={{ zIndex: 5 }}
            initial={{ y: 0 }}
            animate={{ y: isOpen ? -110 : 0 }}
            // Spring gives it a heavy, realistic paper slide
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.5 }}
          >
            <div className="text-center w-full px-6">
              <div className="w-full border-b border-soft-gold/40 pb-3 mb-3">
                 <span className="font-playfair text-deep-forest text-xl tracking-wide uppercase">You are invited</span>
              </div>
              {/* Subtle dummy text lines for realism */}
              <div className="space-y-2 px-4 opacity-30">
                <div className="h-1 w-full bg-deep-forest rounded-full" />
                <div className="h-1 w-5/6 bg-deep-forest rounded-full mx-auto" />
                <div className="h-1 w-4/6 bg-deep-forest rounded-full mx-auto" />
              </div>
            </div>
          </motion.div>

          {/* Top Flap Container (Handles Drop Shadow) */}
          <motion.div
            className="absolute top-0 left-0 w-full origin-top pointer-events-none"
            style={{ 
              zIndex: isOpen ? 4 : 20, 
              height: "65%",
              filter: isOpen ? "none" : "drop-shadow(0px 6px 6px rgba(0,0,0,0.25))",
              transformStyle: "preserve-3d"
            }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
             {/* The Flap Shape */}
             <div 
               className="w-full h-full bg-gradient-to-b from-[#e6c998] to-[#c7a66b]" 
               style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
             />
          </motion.div>

          {/* Envelope Pocket (Bottom & Sides) Container */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 10,
              filter: "drop-shadow(0px -2px 4px rgba(0,0,0,0.1))"
            }}
          >
             {/* The Pocket Shape */}
            <div 
              className="w-full h-full bg-gradient-to-tr from-[#b89456] via-[#d4b67f] to-[#c7a66b]" 
              style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
            />
          </div>

          {/* Wax Seal */}
          <motion.div 
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#1a2e22] to-[#0f1b14] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-[#3a4d40]"
            style={{ zIndex: 30 }}
            initial={{ scale: 1 }}
            animate={
              isOpen 
                ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } 
                : { scale: [1, 1.05, 1] } // Breathing effect when idle
            }
            transition={
              isOpen 
                ? { duration: 0.4, ease: "anticipate" } // Satisfying pop before breaking
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {/* Inner ring for stamped wax impression */}
            <div className="w-12 h-12 rounded-full border border-soft-gold/30 flex items-center justify-center">
              <span className="text-[#e2cda3] font-playfair font-bold text-xl drop-shadow-md">A&S</span>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
}