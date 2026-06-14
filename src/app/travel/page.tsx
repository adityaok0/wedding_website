"use client";

import { FlowerPetals } from "@/components/animations/FlowerPetals";
import { SlideUp } from "@/components/animations/SlideUp";
import { Train, Plane, Hotel, MapPin, ExternalLink } from "lucide-react";

const TRAVEL_DATA = [
  {
    event: "The Wedding",
    airports: [
      { name: "Cochin International Airport (COK)", dist: "109 km" },
    ],
    trainStations: [
      { name: "Changanassery Railway Station (CGY)", note: "Nearest (4km)" },
      { name: "Kottayam Railway Station (KTYM)", note: "23 km" },
    ],
  },
  {
    event: "The Reception",
    airports: [
      { name: "Calicut International Airport (CCJ)", dist: "20km" },
    ],
    trainStations: [
      { name: "Feroke Railway Station (FK)", note: "Nearest (5km)" },
      { name: "Kozhikode Railway Station (CLT)", note: "9km" },
    ],
  },
];

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <FlowerPetals count={18} />
      <SlideUp className="text-center mb-12">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Travel & Stay</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Your guide to joining us</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-md mx-auto space-y-12">
        {TRAVEL_DATA.map((item, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="font-playfair text-2xl text-deep-forest border-b border-soft-gold/30 pb-2">
              {item.event}
            </h2>
            
            {/* Air Section */}
            <SlideUp delay={0.1 * idx}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-muted">
                <h3 className="font-playfair text-xl text-deep-forest mb-4 flex items-center gap-2">
                  <Plane className="text-soft-gold" size={20} /> By Air
                </h3>
                {item.airports.map((apt, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <h4 className="font-sans font-medium text-deep-forest text-sm">{apt.name}</h4>
                    {apt.dist && <span className="font-cormorant text-soft-gold text-lg">{apt.dist}</span>}
                  </div>
                ))}
              </div>
            </SlideUp>

            {/* Train Section */}
            <SlideUp delay={0.2 * idx}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-muted">
                <h3 className="font-playfair text-xl text-deep-forest mb-4 flex items-center gap-2">
                  <Train className="text-soft-gold" size={20} /> By Train
                </h3>
                <div className="space-y-3">
                  {item.trainStations.map((stn, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-sans font-medium text-deep-forest text-sm">{stn.name}</h4>
                        {stn.note && <p className="font-sans text-[10px] text-sage-green uppercase tracking-wider">{stn.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideUp>
          </div>
        ))}
      </div>
    </main>
  );
}