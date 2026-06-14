"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export function MuteButton() {
  const { toggle, muted, started } = useMusic();

  return (
    <AnimatePresence>
      {started && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 1 }}
          onClick={toggle}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-deep-forest/80 text-ivory backdrop-blur-sm hover:bg-deep-forest transition-colors"
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}