"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null; // Avoid hydration mismatch

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-14 h-16 md:w-20 md:h-24 bg-ivory/10 backdrop-blur-md rounded-lg border border-soft-gold/30 flex items-center justify-center shadow-lg mb-2">
            <span className="font-cormorant text-2xl md:text-4xl text-ivory font-medium">
              {unit.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] md:text-xs tracking-widest uppercase text-soft-gold">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
