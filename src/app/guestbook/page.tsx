"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, Quote, Loader2 } from "lucide-react";
import { FlowerPetals } from "@/components/animations/FlowerPetals";

type Wish = {
  id: number;
  name: string;
  message: string;
  date: string;
};

const API = process.env.NEXT_PUBLIC_GUESTBOOK_URL!;

export default function GuestBookPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing wishes
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data: Wish[]) => {
        setWishes(data.reverse()); // newest first
        setIsLoading(false);
      })
      .catch(() => {
        setError("Couldn't load messages. Please refresh.");
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(API, {
        method: "POST",
        body: JSON.stringify({ name, message }),
      });

      const newWish: Wish = await res.json();
      setWishes((prev) => [newWish, ...prev]);
      setName("");
      setMessage("");
    } catch {
      setError("Failed to post message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <FlowerPetals count={18} />
      <SlideUp className="text-center mb-10">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Guest Book</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Leave a little love</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-xl mx-auto flex flex-col md:flex-row-reverse gap-10">
        {/* Form */}
        <div className="md:w-1/2">
          <SlideUp delay={0.2} className="sticky top-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-xl border border-muted">
              <h2 className="font-playfair text-xl text-deep-forest mb-4 flex items-center gap-2">
                <Heart className="text-soft-gold" size={18} />
                Write a Message
              </h2>

              {error && (
                <p className="text-red-400 font-sans text-xs mb-4 text-center">{error}</p>
              )}

              <div className="space-y-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors"
                  placeholder="Your Name"
                />
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors resize-none h-32"
                  placeholder="Your wishes for the couple..."
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-deep-forest text-ivory py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-medium hover:bg-deep-forest/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Post Message</>
                  )}
                </button>
              </div>
            </form>
          </SlideUp>
        </div>

        {/* Wishes */}
        <div className="md:w-1/2 space-y-6">
          {isLoading ? (
            // Skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-muted animate-pulse space-y-3">
                <div className="h-3 bg-soft-gold/20 rounded w-3/4" />
                <div className="h-3 bg-soft-gold/20 rounded w-full" />
                <div className="h-3 bg-soft-gold/20 rounded w-1/2" />
              </div>
            ))
          ) : (
            <AnimatePresence>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-muted relative"
                >
                  <Quote className="absolute top-4 right-4 text-soft-gold/20" size={40} />
                  <p className="font-sans text-sm text-deep-forest leading-relaxed mb-4 relative z-10 italic">
                    &quot;{wish.message}&quot;
                  </p>
                  <div className="flex justify-between items-end mt-4 pt-4 border-t border-muted/50">
                    <h3 className="font-playfair text-lg text-deep-forest">{wish.name}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </main>
  );
}