"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { CalendarPlus, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { generateICS, downloadICS } from "@/utils/calendar";


const events = [
  {
    title: "Wedding Ceremony",
    date: "09 August 2026",
    time: "12:00 - 12:30 PM",
    startTime: "12:00",
    endTime: "12:30",
    venue: "Contour Backwaters Convention Center, Kerala",
    desc: "Join us as we take our vows in a traditional Kerala Hindu ceremony.",
    // ...colors
  },
  {
    title: "Reception Celebration",
    date: "13 August 2026",
    time: "11:00 AM - 02:30 PM",
    startTime: "11:00",
    endTime: "14:30",
    venue: "City Palace Auditorium, Beypore",
    desc: "Join us for an afternoon of joy, laughter, and dancing.",
    // ...colors
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-6">
      <SlideUp className="text-center mb-10">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Events</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Join our celebrations</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <div className="max-w-md mx-auto space-y-8">
        {events.map((event, index) => (
          <SlideUp key={event.title} delay={0.2 * index}>
            <div className={`relative rounded-3xl p-8 shadow-xl ${event.color} ${event.textColor} border border-soft-gold/20 overflow-hidden`}>
              {/* Decorative corner patterns */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-soft-gold/10 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-soft-gold/10 rounded-tr-full" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="font-playfair text-3xl mb-2">{event.title}</h2>
                <div className="w-8 h-1 bg-soft-gold mb-6 rounded-full" />

                <p className="font-sans text-sm mb-6 opacity-80 leading-relaxed">
                  {event.desc}
                </p>

                <div className="space-y-4 w-full mb-8">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-soft-gold">Date</span>
                    <span className="font-cormorant text-xl">{event.date}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-soft-gold">Time</span>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-soft-gold" />
                      <span className="font-cormorant text-xl">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-soft-gold">Venue</span>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-soft-gold" />
                      <span className="font-cormorant text-xl">{event.venue}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 rounded-full border border-soft-gold flex items-center justify-center gap-2 hover:bg-soft-gold/10 transition-colors group" onClick={() => {
                  const ics = generateICS({
                    title: event.title,
                    date: event.date,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    venue: event.venue,
                    desc: event.desc,
                  });
                  downloadICS(ics, event.title);
                }}>
                  <CalendarPlus size={18} className="text-soft-gold group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-xs uppercase tracking-widest font-medium">Add to Calendar</span>
                </button>
              </div>
            </div>
          </SlideUp>
        ))}
      </div>

      <SlideUp delay={0.6} className="mt-12 text-center">
        <Link href="/venue" className="inline-flex items-center gap-2 text-deep-forest font-sans text-sm uppercase tracking-wider font-medium hover:text-soft-gold transition-colors">
          <MapPin size={16} />
          <span>View Venue Details</span>
        </Link>
      </SlideUp>
    </main>
  );
}
