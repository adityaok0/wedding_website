"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { FloatingPetals } from "../animations/FloatingPetals";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const sealControls = useAnimation();

  const handleOpen = async () => {
    if (isOpen) return;
    setIsOpen(true);

    // Seal "pops" off before flap opens — feels like breaking wax
    await sealControls.start({
      scale: [1, 1.15, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.35, ease: "easeIn" },
    });

    setTimeout(onOpen, 1800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #F7F0E6 0%, #EDE4D3 100%)" }}
    >
      {/* Subtle linen texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='transparent'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23C9B89A' opacity='0.35'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23C9B89A' opacity='0.25'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPetals />

      {/* Title */}
      <motion.div
        className="z-10 text-center mb-14"
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -8 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1
          className="font-playfair text-4xl text-deep-forest mb-3"
          style={{ letterSpacing: "0.04em", textShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
        >
          Aditya{" "}
          <span className="italic font-normal" style={{ color: "#C4973B" }}>
            &amp;
          </span>{" "}
          Sarayu
        </h1>
        <motion.p
          className="font-cormorant text-lg text-sage-green italic"
          style={{ letterSpacing: "0.08em" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap to open
        </motion.p>
      </motion.div>

      {/* Envelope scene */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleOpen}
        whileHover={!isOpen ? { scale: 1.025 } : {}}
        whileTap={!isOpen ? { scale: 0.97 } : {}}
        animate={isOpen ? { scale: 1.55, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: isOpen ? 1.1 : 0, ease: "easeIn" }}
        style={{ perspective: 1000 }}
      >
        {/* Envelope body */}
        <div
          className="relative rounded-sm overflow-hidden"
          style={{
            width: 340,
            height: 220,
            background: "linear-gradient(155deg, #D4AA6A 0%, #C49A50 45%, #B8873A 100%)",
            boxShadow: `
              0 16px 50px rgba(0,0,0,0.2),
              0 6px 16px rgba(0,0,0,0.13),
              inset 0 1px 0 rgba(255,255,255,0.22),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `,
          }}
        >
          {/* Metallic sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.07) 100%)",
              zIndex: 25,
            }}
          />

          {/* Letter */}
          <motion.div
            className="absolute left-2 right-2 bottom-0.5 flex items-start justify-center"
            style={{
              height: 192,
              background: "linear-gradient(180deg, #FDFAF6 0%, #F5EDE0 100%)",
              border: "1px solid #E5DDD0",
              borderRadius: "2px 2px 0 0",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.07), inset 0 1px 4px rgba(255,255,255,0.9)",
              zIndex: 5,
              paddingTop: 30,
            }}
            initial={{ y: 0 }}
            animate={{ y: isOpen ? -110 : 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.34, 1.1, 0.64, 1] }}
          >
            <div className="text-center">
              {/* Ornamental divider */}
              <p
                style={{
                  fontFamily: "serif",
                  fontSize: 9,
                  color: "#C4973B",
                  letterSpacing: 7,
                  marginBottom: 14,
                  opacity: 0.7,
                }}
              >
                ✦ ✦ ✦
              </p>
              <span
                className="font-playfair text-deep-forest"
                style={{
                  fontSize: 18,
                  letterSpacing: "0.06em",
                  borderBottom: "1px solid rgba(196,151,59,0.45)",
                  paddingBottom: 10,
                  paddingLeft: 24,
                  paddingRight: 24,
                  fontStyle: "italic",
                }}
              >
                You are Invited
              </span>
              <motion.p
                className="font-cormorant"
                style={{
                  fontSize: 11,
                  color: "#8B7355",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginTop: 12,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Together with their families
              </motion.p>
            </div>
          </motion.div>

          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full origin-top pointer-events-none"
            style={{ zIndex: isOpen ? 4 : 20, transformStyle: "preserve-3d" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="absolute inset-0 w-0 h-0"
              style={{
                borderLeft: "170px solid transparent",
                borderRight: "170px solid transparent",
                borderTop: "122px solid #B8873A",
                filter: "drop-shadow(0px 5px 7px rgba(0,0,0,0.18))",
              }}
            />
          </motion.div>

          {/* Crease lines for realism */}
          <div
            className="absolute pointer-events-none"
            style={{
              zIndex: 15,
              top: 0,
              left: "50%",
              width: 1,
              height: 155,
              background: "rgba(0,0,0,0.05)",
              transform: "rotate(37deg)",
              transformOrigin: "top center",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              zIndex: 15,
              top: 0,
              left: "50%",
              width: 1,
              height: 155,
              background: "rgba(0,0,0,0.05)",
              transform: "rotate(-37deg)",
              transformOrigin: "top center",
            }}
          />

          {/* Side & bottom folds */}
          <div
            className="absolute inset-0 w-0 h-0 pointer-events-none"
            style={{
              zIndex: 10,
              borderLeft: "170px solid #C49A50",
              borderRight: "170px solid #BF9245",
              borderBottom: "110px solid #D0A458",
              borderTop: "110px solid transparent",
            }}
          />

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: 110, zIndex: 30 }}
            animate={sealControls}
          >
            {/* Ambient glow ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: -8,
                background:
                  "radial-gradient(circle, rgba(196,151,59,0.25) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Seal disc */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #2E5041, #1A3027)",
                border: "2.5px solid #C4973B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow: `
                  0 4px 14px rgba(0,0,0,0.38),
                  0 1px 4px rgba(0,0,0,0.25),
                  inset 0 1px 2px rgba(255,255,255,0.12),
                  inset 0 -1px 2px rgba(0,0,0,0.3)
                `,
              }}
            >
              {/* Wax highlight */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at 30% 28%, rgba(255,255,255,0.14) 0%, transparent 55%)",
                }}
              />
              {/* Inner ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 5,
                  borderRadius: "50%",
                  border: "1px solid rgba(196,151,59,0.3)",
                }}
              />
              <span
                className="font-playfair font-bold"
                style={{
                  fontSize: 16,
                  color: "#D4AA6A",
                  letterSpacing: 1,
                  position: "relative",
                  zIndex: 1,
                  textShadow: "0 1px 3px rgba(0,0,0,0.45)",
                }}
              >
                A&S
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}