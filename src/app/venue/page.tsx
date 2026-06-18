"use client";

import { FlowerPetals } from "@/components/animations/FlowerPetals";
import { SlideUp } from "@/components/animations/SlideUp";
import { Navigation } from "lucide-react";

// 1. Define the structure for your venues
interface VenueDetails {
  title: string;
  name: string;
  address: string;
  mapsLink: string;
  embedSrc: string; 
  imageSrc: string;
}

// 2. Populate your venue data
const VENUES: VenueDetails[] = [
  {
    title: "The Wedding",
    name: "Contour Backwaters, Resort and Convention Centre",
    address: "Kottayam - Alapuzha Highway, Changanassery, Kottayam",
    mapsLink: "https://maps.app.goo.gl/UXiCpaM1chx2mMoJ8",
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.205739601138!2d76.5137599!3d9.577671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062b5349695ed9%3A0x6e9f16d7a468d6c7!2sContour%20Backwaters!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin", 
    imageSrc: "assets/contour.jpg",
  },
  {
    title: "The Reception",
    name: "City Palace Auditorium",
    address: "Beypore Cheruvannor Road (BC Road), Beypore",
    mapsLink: "https://maps.app.goo.gl/jxbFVH1EFBh1xt6d9", 
    embedSrc: "https://www.google.com/maps/embed?pb=YOUR_RECEPTION_EMBED_SRC", 
    imageSrc: "assets/reception.webp", 
  },
];

export default function VenuePage() {
  return (
    // Added overflow-x-hidden to prevent petals from causing horizontal scrolling
    <main className="relative min-h-screen bg-ivory pb-32 overflow-x-hidden">
      
      {/* BACKGROUND LAYER: Fixed, behind everything, and unclickable */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FlowerPetals count={18} />
      </div>

      {/* FOREGROUND LAYER: Elevated above the background */}
      <div className="relative z-10">
        
        {/* Page Header */}
        <div className="pt-16 pb-8 text-center">
          <SlideUp>
            <h1 className="font-playfair text-4xl text-deep-forest mb-2">The Venues</h1>
            <div className="w-16 h-1 bg-soft-gold rounded-full mx-auto" />
          </SlideUp>
        </div>

        {/* Venues Container */}
        <div className="max-w-md mx-auto px-6 space-y-16">
          {VENUES.map((venue, index) => (
            <div key={index} className="space-y-6">
              
              {/* Section Header */}
              <SlideUp delay={index * 0.1}>
                <h2 className="font-playfair text-2xl text-deep-forest text-center italic">
                  {venue.title}
                </h2>
              </SlideUp>

              {/* Venue Image */}
              <SlideUp delay={index * 0.15}>
                <div className="relative w-full h-[250px] rounded-2xl overflow-hidden shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={venue.imageSrc} 
                    alt={venue.name}
                    className="w-full h-full object-cover relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
                </div>
              </SlideUp>

              {/* Venue Card Details */}
              <SlideUp delay={index * 0.2}>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-muted relative">
                  <h3 className="font-playfair text-xl text-deep-forest mb-1">{venue.name}</h3>
                  <p className="font-sans text-sm text-sage-green leading-relaxed mb-6">
                    {venue.address}
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <a 
                      href={venue.mapsLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full bg-deep-forest text-ivory py-3 rounded-xl flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest hover:bg-deep-forest/90 transition-colors"
                    >
                      <Navigation size={16} />
                      Open in Maps
                    </a>
                  </div>
                </div>
              </SlideUp>

              {/* Map Embed */}
              {/* <SlideUp delay={index * 0.25}>
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-muted overflow-hidden h-[250px] relative">
                  <iframe 
                    src={venue.embedSrc} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, borderRadius: "0.75rem" }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-10"
                  />
                </div>
              </SlideUp> */}

              {/* Subtle Divider between the two venues */}
              {index === 0 && (
                <hr className="border-t border-soft-gold/30 my-8 w-1/2 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}