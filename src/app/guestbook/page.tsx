"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, Quote } from "lucide-react";

// Mock Guestbook entries
const initialWishes = [
  { id: 1, name: "Arun & Priya", message: "Wishing you a lifetime of love and happiness. May your journey together be as beautiful as this wedding!", date: "12 Aug 2025" },
  { id: 2, name: "Sneha Reddy", message: "So incredibly happy for both of you. Can't wait for the big day. Cheers to the beautiful couple!", date: "14 Aug 2025" },
  { id: 3, name: "The Sharma Family", message: "Congratulations Aditya and Sarayu! Sending you all our love and blessings for your future together.", date: "20 Aug 2025" }
];

export default function GuestBookPage() {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      const newWish = {
        id: Date.now(),
        name,
        message,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      
      setWishes([newWish, ...wishes]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <SlideUp className="text-center mb-10">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Guest Book</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Leave a little love</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-xl mx-auto flex flex-col md:flex-row-reverse gap-10">
        {/* Form Section */}
        <div className="md:w-1/2">
          <SlideUp delay={0.2} className="sticky top-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-xl border border-muted">
              <h2 className="font-playfair text-xl text-deep-forest mb-4 flex items-center gap-2">
                <Heart className="text-soft-gold" size={18} />
                Write a Message
              </h2>
              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <textarea 
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors resize-none h-32"
                    placeholder="Your wishes for the couple..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-deep-forest text-ivory py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-medium hover:bg-deep-forest/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send size={16} />
                      Post Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </SlideUp>
        </div>

        {/* Wishes List Section */}
        <div className="md:w-1/2 space-y-6">
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-muted relative"
              >
                <Quote className="absolute top-4 right-4 text-soft-gold/20" size={40} />
                <p className="font-sans text-sm text-deep-forest leading-relaxed mb-4 relative z-10 italic">
                  &quot;{wish.message}&quot;
                </p>
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-muted/50">
                  <h3 className="font-playfair text-lg text-deep-forest">{wish.name}</h3>
                  <span className="font-sans text-[10px] text-sage-green uppercase tracking-wider">{wish.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
