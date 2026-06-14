"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/welcome/Envelope";
import { TempleDoors } from "@/components/welcome/TempleDoors";
import { Hero } from "@/components/welcome/Hero";
import { useMusic } from "@/context/MusicContext";
import { Volume2, VolumeX } from "lucide-react";

type SequenceStep = "envelope" | "doors" | "hero";

export default function WelcomeSequence() {
  const [step, setStep] = useState<SequenceStep>("envelope");
  const [muted, setMuted] = useState(false);
  const { play,pause } = useMusic();

  const handleEnvelopeOpen = () => {
    play(); // safe here — triggered by user gesture
    setStep("doors");
  };

  const toggleMute = () => {
    if (muted) {
      play();
    } else {
      pause();
    }
    setMuted(!muted);
  };

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
            <Envelope onOpen={handleEnvelopeOpen} />
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

      {/* Mute toggle — only show after music has started */}
      {step !== "envelope" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-deep-forest/80 text-ivory backdrop-blur-sm hover:bg-deep-forest transition-colors"
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}
    </main>
  );
}