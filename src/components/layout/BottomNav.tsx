"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Image as ImageIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/explore", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: ImageIcon }
    // { name: "RSVP", href: "/rsvp", icon: Mail },
  ];

  // Don't show nav on the initial sequence pages
  if (pathname === "/" || pathname === "/welcome") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-8 md:pb-6 pointer-events-none">
      <nav className="mx-auto max-w-md pointer-events-auto bg-ivory/80 backdrop-blur-md border border-soft-gold/30 rounded-2xl shadow-[0_8px_32px_rgba(85,107,79,0.1)] px-6 py-3 flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center p-2"
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-deep-forest" : "text-sage-green"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-300",
                    isActive ? "text-deep-forest" : "text-sage-green"
                  )}
                >
                  {item.name}
                </span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-soft-gold/20 rounded-xl"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
