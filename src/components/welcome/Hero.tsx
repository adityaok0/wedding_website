"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";
import { SlideUp } from "../animations/SlideUp";
import { Countdown } from "./Countdown";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const weddingDate = new Date("2026-08-09T12:00:00+05:30"); // 09 August 2026, 12:00 PM IST

  return (
    <div className="relative min-h-screen bg-deep-forest flex flex-col items-center justify-center overflow-hidden">
      {/* Dreamy Kerala backwaters background (placeholder using CSS gradients + animation) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-sage-green/40 via-deep-forest/80 to-deep-forest mix-blend-multiply"
        />
        {/* Subtle motion background simulating water ripples */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #C7A66B 0%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center text-center mt-12 md:mt-20">
        <SlideUp className="mb-2">
          <span className="font-poppins tracking-[0.3em] text-xs text-soft-gold uppercase">
            The Wedding Of
          </span>
        </SlideUp>

        <SlideUp delay={0.2} className="mb-8">
          <h1 className="font-playfair text-5xl md:text-7xl text-ivory mb-2">
            Aditya
          </h1>
          <span className="font-playfair text-3xl md:text-5xl text-soft-gold italic block mb-2">
            &
          </span>
          <h1 className="font-playfair text-5xl md:text-7xl text-ivory">
            Sarayu
          </h1>
        </SlideUp>

        <SlideUp delay={0.4} className="mb-12 flex flex-col items-center gap-2">
          <div className="w-12 h-[1px] bg-soft-gold/50 mb-2" />
          <p className="font-cormorant text-xl text-ivory tracking-wide">
            09 August 2026
          </p>
          <p className="font-poppins text-sm text-sage-green uppercase tracking-wider">
            Muhurtham • 12:00 PM - 12:30 PM
          </p>
          <div className="w-12 h-[1px] bg-soft-gold/50 mt-2" />
        </SlideUp>

        <SlideUp delay={0.6} className="mb-16 w-full">
          <Countdown targetDate={weddingDate} />
        </SlideUp>

        <SlideUp delay={0.8}>
          <button
            onClick={() => router.push("/explore")}
            className="group relative flex items-center gap-3 bg-soft-gold text-deep-forest px-8 py-4 rounded-full font-medium font-poppins text-sm tracking-widest uppercase overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-ivory/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
            <span className="relative z-10">View Invitation</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </SlideUp>
      </div>
    </div>
  );
}
