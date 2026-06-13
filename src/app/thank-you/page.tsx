"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { FloatingLamps } from "@/components/animations/FloatingLamps";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2c1b18] via-[#1a110e] to-black">
      {/* Background sunset image / gradient */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1601614917457-3f32e0bf6a33?q=80&w=2070&auto=format&fit=crop" 
          alt="Kerala Sunset"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <FloatingLamps />

      <div className="relative z-10 px-6 text-center">
        <SlideUp>
          <div className="w-16 h-16 rounded-full border border-soft-gold flex items-center justify-center mx-auto mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="font-playfair text-soft-gold text-2xl font-bold"
            >
              A&S
            </motion.div>
          </div>
        </SlideUp>
        
        <SlideUp delay={0.2}>
          <h1 className="font-playfair text-3xl md:text-5xl text-ivory mb-6 leading-tight max-w-lg mx-auto">
            Thank you for celebrating with us
          </h1>
        </SlideUp>

        <SlideUp delay={0.4}>
          <p className="font-sans text-sm md:text-base text-soft-gold tracking-[0.2em] uppercase font-medium">
            #AdityaWedsSarayu
          </p>
        </SlideUp>

        <SlideUp delay={0.8} className="mt-16">
          <p className="font-cormorant text-ivory/60 italic text-xl">
            See you at the wedding!
          </p>
        </SlideUp>
      </div>
    </main>
  );
}
