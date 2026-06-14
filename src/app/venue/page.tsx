"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { MapPin, Phone, Navigation } from "lucide-react";
import Image from "next/image";

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-ivory pb-32">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="assets/contour.jpg" 
          alt="Contour backwaters, Resort and Convention Centre"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-deep-forest/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 pb-10">
          <SlideUp>
            <h1 className="font-playfair text-4xl text-deep-forest mb-2">The Venue</h1>
            <div className="w-16 h-1 bg-soft-gold rounded-full" />
          </SlideUp>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 relative z-10 space-y-8">
        <SlideUp delay={0.2}>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-muted">
            <h2 className="font-playfair text-2xl text-deep-forest mb-1">Contour backwaters, Resort and Convention Centre</h2>
            <p className="font-sans text-sm text-sage-green leading-relaxed mb-6">
              Kottayam - Alapuzha Highway, Changanassery, Kottayam
            </p>
            
            <div className="flex flex-col gap-3">
              <a 
                href="https://maps.app.goo.gl/UXiCpaM1chx2mMoJ8" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-deep-forest text-ivory py-3 rounded-xl flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest hover:bg-deep-forest/90 transition-colors"
              >
                <Navigation size={16} />
                Open in Maps
              </a>
              {/* <a 
                href="tel:+914812525711" 
                className="w-full bg-white border border-soft-gold text-deep-forest py-3 rounded-xl flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest hover:bg-soft-gold/10 transition-colors"
              >
                <Phone size={16} />
                Call Venue
              </a> */}
            </div>
          </div>
        </SlideUp>

        <SlideUp delay={0.4}>
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-muted overflow-hidden h-[300px]">
            {/* Map Embed Placeholder */}
            <iframe 
              src="https://maps.app.goo.gl/fmrnCzJHB2VAucNj8" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "0.75rem" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </SlideUp>
      </div>
    </main>
  );
}
