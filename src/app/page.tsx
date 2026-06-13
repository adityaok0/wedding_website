"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/welcome/Envelope";
import { TempleDoors } from "@/components/welcome/TempleDoors";
import { Hero } from "@/components/welcome/Hero";

type SequenceStep = "envelope" | "doors" | "hero";

export default function WelcomeSequence() {
  const [step, setStep] = useState<SequenceStep>("envelope");

  return (
    <main className="w-full min-h-screen bg-ivory">
      <AnimatePresence mode="wait">
        {step === "envelope" && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Envelope onOpen={() => setStep("doors")} />
          </motion.div>
        )}

        {step === "doors" && (
          <motion.div
            key="doors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <TempleDoors onComplete={() => setStep("hero")} />
          </motion.div>
        )}

        {step === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 overflow-y-auto"
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
