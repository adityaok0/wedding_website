"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { Train, Plane, Hotel, MapPin, ExternalLink } from "lucide-react";

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <SlideUp className="text-center mb-10">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Travel & Stay</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Your guide to joining us</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-md mx-auto space-y-6">
        <SlideUp delay={0.2}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-muted">
            <h2 className="font-playfair text-2xl text-deep-forest mb-4 flex items-center gap-2">
              <Plane className="text-soft-gold" size={24} />
              By Air
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-muted pb-3">
                <div>
                  <h3 className="font-sans font-medium text-deep-forest">Cochin International Airport (COK)</h3>
                  <p className="font-sans text-xs text-sage-green">Nearest Airport</p>
                </div>
                <span className="font-cormorant text-soft-gold text-lg">75 km</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-sans font-medium text-deep-forest">Trivandrum International Airport (TRV)</h3>
                  <p className="font-sans text-xs text-sage-green">Alternative Airport</p>
                </div>
                <span className="font-cormorant text-soft-gold text-lg">165 km</span>
              </div>
            </div>
          </div>
        </SlideUp>

        <SlideUp delay={0.4}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-muted">
            <h2 className="font-playfair text-2xl text-deep-forest mb-4 flex items-center gap-2">
              <Train className="text-soft-gold" size={24} />
              By Train
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-sans font-medium text-deep-forest">Kottayam Railway Station (KTYM)</h3>
                  <p className="font-sans text-xs text-sage-green">Nearest Station</p>
                </div>
                <span className="font-cormorant text-soft-gold text-lg">15 km</span>
              </div>
            </div>
          </div>
        </SlideUp>

        <SlideUp delay={0.6}>
          <div className="bg-deep-forest rounded-2xl p-6 shadow-xl border border-soft-gold/20 text-ivory">
            <h2 className="font-playfair text-2xl mb-1 flex items-center gap-2">
              <Hotel className="text-soft-gold" size={24} />
              Recommended Stay
            </h2>
            <p className="font-sans text-xs text-sage-green/80 mb-6 uppercase tracking-widest">For our guests</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-playfair text-xl text-soft-gold mb-1">Taj Kumarakom Resort & Spa</h3>
                <p className="font-sans text-sm text-ivory/80 mb-3 flex items-center gap-1">
                  <MapPin size={14} /> Kumarakom, Kerala
                </p>
                <p className="font-sans text-xs leading-relaxed opacity-80 mb-4">
                  We have secured a special rate for our guests here. Please use code WED2026 when booking.
                </p>
                <a 
                  href="https://www.tajhotels.com/" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-soft-gold text-deep-forest px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-medium hover:bg-ivory transition-colors"
                >
                  View Hotel <ExternalLink size={14} />
                </a>
              </div>
              
              <div className="w-full h-[1px] bg-soft-gold/20" />

              <div>
                <h3 className="font-playfair text-xl text-soft-gold mb-1">Kumarakom Lake Resort</h3>
                <p className="font-sans text-sm text-ivory/80 mb-3 flex items-center gap-1">
                  <MapPin size={14} /> Kumarakom, Kerala
                </p>
                <a 
                  href="https://www.kumarakomlakeresort.in/" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-soft-gold text-soft-gold px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-medium hover:bg-soft-gold/10 transition-colors"
                >
                  View Hotel <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </main>
  );
}
