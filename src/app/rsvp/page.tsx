"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MailOpen, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RsvpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock Supabase submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to thank you page after showing success animation
      setTimeout(() => {
        router.push("/thank-you");
      }, 2000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <SlideUp className="text-center mb-10">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">RSVP</h1>
        <p className="font-cormorant text-lg text-sage-green italic">We hope you can join us</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-md mx-auto">
        <AnimatePresence mode="sync">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SlideUp delay={0.2}>
                <form 
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-muted"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-deep-forest mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-deep-forest mb-2">Phone</label>
                        <input 
                          type="tel" 
                          required
                          className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors"
                          placeholder="+91..."
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-deep-forest mb-2">Guests</label>
                        <select className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors appearance-none">
                          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-deep-forest mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-ivory/50 border border-muted rounded-xl px-4 py-3 font-sans text-sm text-deep-forest focus:outline-none focus:border-soft-gold transition-colors"
                        placeholder="For updates"
                      />
                    </div>

                    <div className="w-full h-[1px] bg-muted my-6" />

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-deep-forest mb-3">Events Attending</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 rounded border-muted text-soft-gold focus:ring-soft-gold focus:ring-offset-0 bg-ivory accent-soft-gold" defaultChecked />
                          <span className="font-sans text-sm text-deep-forest group-hover:text-soft-gold transition-colors">Wedding Ceremony</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 rounded border-muted text-soft-gold focus:ring-soft-gold focus:ring-offset-0 bg-ivory accent-soft-gold" defaultChecked />
                          <span className="font-sans text-sm text-deep-forest group-hover:text-soft-gold transition-colors">Reception Gala</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-deep-forest mb-3">Food Preference</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="food" value="veg" className="w-5 h-5 border-muted text-soft-gold focus:ring-soft-gold bg-ivory accent-soft-gold" defaultChecked />
                          <span className="font-sans text-sm text-deep-forest group-hover:text-soft-gold transition-colors">Vegetarian</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="food" value="nonveg" className="w-5 h-5 border-muted text-soft-gold focus:ring-soft-gold bg-ivory accent-soft-gold" />
                          <span className="font-sans text-sm text-deep-forest group-hover:text-soft-gold transition-colors">Non-Vegetarian</span>
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-deep-forest text-ivory py-4 rounded-xl font-sans text-sm uppercase tracking-widest font-medium mt-8 hover:bg-deep-forest/90 transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <MailOpen size={18} />
                          Confirm RSVP
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </SlideUp>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-soft-gold flex flex-col items-center text-center mt-12"
            >
              <div className="w-20 h-20 bg-soft-gold/10 rounded-full flex items-center justify-center mb-6 text-soft-gold">
                <Check size={40} />
              </div>
              <h2 className="font-playfair text-3xl text-deep-forest mb-2">Thank You!</h2>
              <p className="font-sans text-sm text-sage-green leading-relaxed">
                We have received your RSVP. <br/> We can&apos;t wait to celebrate with you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
