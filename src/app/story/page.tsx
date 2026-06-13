"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { Heart } from "lucide-react";

const storyEvents = [
  {
    year: "2020",
    title: "First Meeting",
    desc: "A chance encounter at a local cafe that started it all.",
    image: "https://images.unsplash.com/photo-1544078751-58fee2a8a03b?q=80&w=2070&auto=format&fit=crop", // Placeholder
  },
  {
    year: "2021",
    title: "First Date",
    desc: "A magical evening walking by the Kerala backwaters.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2069&auto=format&fit=crop", // Placeholder
  },
  {
    year: "2023",
    title: "The Proposal",
    desc: "Under a sky full of stars, a promise of forever.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop", // Placeholder
  },
  {
    year: "2024",
    title: "Engagement",
    desc: "Surrounded by family, we exchanged our rings.",
    image: "https://images.unsplash.com/photo-1606509035251-14068bd37172?q=80&w=2070&auto=format&fit=crop", // Placeholder
  },
  {
    year: "2026",
    title: "The Wedding",
    desc: "The day we tie the knot and begin our new journey.",
    image: "https://images.unsplash.com/photo-1532712938730-4e36fc55159c?q=80&w=2070&auto=format&fit=crop", // Placeholder
  },
];

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32">
      <SlideUp className="text-center mb-8 px-6">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Our Story</h1>
        <p className="font-cormorant text-lg text-sage-green italic">A journey of love</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <SlideUp delay={0.2} className="w-full">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-8 gap-6 pt-4">
          {storyEvents.map((event, index) => (
            <div 
              key={index} 
              className="snap-center shrink-0 w-[85vw] max-w-sm flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] rounded-t-[100px] rounded-b-2xl overflow-hidden shadow-xl border-4 border-white mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <span className="font-playfair text-soft-gold text-3xl">{event.year}</span>
                </div>
              </div>

              <div className="text-center px-4">
                <h3 className="font-playfair text-2xl text-deep-forest mb-2">{event.title}</h3>
                <p className="font-sans text-sm text-sage-green leading-relaxed">
                  {event.desc}
                </p>
              </div>

              {index !== storyEvents.length - 1 && (
                <div className="hidden md:flex flex-col items-center justify-center my-8">
                  <div className="w-[1px] h-12 bg-soft-gold/30" />
                  <Heart size={16} className="text-soft-gold my-2" />
                  <div className="w-[1px] h-12 bg-soft-gold/30" />
                </div>
              )}
            </div>
          ))}
          {/* Spacer for last item to allow full scroll */}
          <div className="shrink-0 w-4" />
        </div>
        
        <div className="text-center text-xs font-sans text-sage-green/60 uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
          <span>Swipe to explore</span>
          <ArrowRightIcon className="w-3 h-3" />
        </div>
      </SlideUp>
    </main>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}
