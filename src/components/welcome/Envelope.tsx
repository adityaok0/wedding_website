"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FloatingPetals } from "../animations/FloatingPetals";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(onOpen, 1800); // Wait for open and slide up animation
  };

  return (
    <div className="relative min-h-screen bg-ivory flex flex-col items-center justify-center overflow-hidden">
      <FloatingPetals />
      
      <motion.div 
        className="z-10 text-center mb-16"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-playfair text-4xl text-deep-forest mb-4">Aditya & Sarayu</h1>
        <p className="font-cormorant text-xl text-sage-green italic">Tap to Open</p>
      </motion.div>

      <motion.div 
        className="relative cursor-pointer"
        onClick={handleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{ scale: isOpen ? 1.5 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* Envelope Body */}
        <div className="w-80 h-52 bg-[#C7A66B] rounded-sm shadow-2xl relative flex items-center justify-center">
          
          {/* Inner Letter peaking out */}
          <motion.div 
            className="absolute bottom-1 left-2 right-2 h-48 bg-[#F9F4EE] shadow-inner flex items-start justify-center pt-8 border border-[#E8E1D9]"
            style={{ zIndex: 5 }}
            initial={{ y: 0 }}
            animate={{ y: isOpen ? -80 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
               <span className="font-playfair text-deep-forest text-xl border-b border-soft-gold pb-2 px-4">You are invited</span>
            </div>
          </motion.div>

          {/* Envelope Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full origin-top pointer-events-none"
            style={{ zIndex: isOpen ? 4 : 20, transformStyle: "preserve-3d" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div 
              className="absolute inset-0 w-0 h-0"
              style={{
                borderLeft: "160px solid transparent",
                borderRight: "160px solid transparent",
                borderTop: "120px solid #B89960", // Slightly darker soft-gold for shadow
                filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.15))"
              }}
            />
          </motion.div>

          {/* Envelope seal */}
          <motion.div 
            className="absolute top-[120px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-deep-forest flex items-center justify-center shadow-lg border-2 border-soft-gold"
            style={{ zIndex: 30 }}
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-ivory font-playfair font-bold text-xl">A&S</span>
          </motion.div>

          {/* Envelope Bottom/Sides overlay */}
          <div 
            className="absolute inset-0 w-0 h-0 pointer-events-none"
            style={{
              zIndex: 10,
              borderLeft: "160px solid #CDAE75",
              borderRight: "160px solid #CDAE75",
              borderBottom: "104px solid #D4B67F",
              borderTop: "104px solid transparent",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
