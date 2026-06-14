"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { ArrowRight, BookHeart, CalendarHeart, MapPin, Image as ImageIcon, MailOpen, Plane, MessageSquareHeart } from "lucide-react";
import Link from "next/link";

const exploreItems = [
  // { name: "Our Story", href: "/story", icon: BookHeart, desc: "How we met and fell in love" },
  { name: "Events", href: "/events", icon: CalendarHeart, desc: "Schedule of our celebrations" },
  { name: "Venue", href: "/venue", icon: MapPin, desc: "Where the magic happens" },
  { name: "Gallery", href: "/gallery", icon: ImageIcon, desc: "Moments captured in time" },
  // { name: "RSVP", href: "/rsvp", icon: MailOpen, desc: "Confirm your presence" },
  { name: "Travel", href: "/travel", icon: Plane, desc: "Accommodation and directions" },
  { name: "Guest Book", href: "/guestbook", icon: MessageSquareHeart, desc: "Leave your wishes for us" },
];

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <SlideUp className="text-center mb-10">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Explore</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Discover our wedding details</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-md mx-auto space-y-4">
        {exploreItems.map((item, index) => (
          <SlideUp key={item.name} delay={0.1 * index}>
            <Link 
              href={item.href}
              className="group block relative bg-white rounded-2xl p-6 shadow-sm border border-muted hover:border-soft-gold transition-colors duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-soft-gold/0 via-soft-gold/5 to-soft-gold/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-soft-gold/30 flex items-center justify-center text-deep-forest">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl text-deep-forest mb-1">{item.name}</h2>
                    <p className="font-sans text-xs text-sage-green uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
                <ArrowRight className="text-soft-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={20} />
              </div>
            </Link>
          </SlideUp>
        ))}
      </div>
    </main>
  );
}
