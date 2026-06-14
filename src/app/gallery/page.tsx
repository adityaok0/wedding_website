"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImage = {
  id: number;
  category: string;
  url: string;
};

// Aspect ratios cycled per image for visual variety
const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[16/9]",
];

const categories = ["All", "Pre Wedding", "Engagement", "Family"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      });
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-ivory pt-12 pb-32 px-4 md:px-8">
      <SlideUp className="text-center mb-8">
        <h1 className="font-playfair text-4xl text-deep-forest mb-2">Gallery</h1>
        <p className="font-cormorant text-lg text-sage-green italic">Moments captured in time</p>
        <div className="w-16 h-[1px] bg-soft-gold mx-auto mt-4" />
      </SlideUp>

      <SlideUp delay={0.2} className="mb-8 overflow-x-auto hide-scrollbar">
        <div className="flex items-center justify-center gap-2 md:gap-4 px-2 min-w-max mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300",
                activeCategory === cat
                  ? "bg-deep-forest text-ivory shadow-md"
                  : "bg-white text-sage-green border border-muted hover:border-soft-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </SlideUp>

      <SlideUp delay={0.4}>
        {loading ? (
          // Skeleton loader
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-full rounded-2xl bg-soft-gold/10 animate-pulse break-inside-avoid",
                  ASPECTS[i % ASPECTS.length]
                )}
              />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <p className="text-center font-cormorant text-lg text-sage-green italic mt-20">
            No photos yet — check back soon.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layoutId={`gallery-image-${img.id}`}
                className={cn(
                  "relative w-full rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid shadow-sm",
                  ASPECTS[index % ASPECTS.length]
                )}
                onClick={() => setSelectedImage(img.url)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.category}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-deep-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        )}
      </SlideUp>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-forest/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-ivory hover:text-soft-gold transition-colors z-[101] bg-black/20 p-2 rounded-full backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={24} />
            </button>
            <motion.div
              layoutId={`gallery-image-${images.find((i) => i.url === selectedImage)?.id}`}
              className="relative w-full max-w-5xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected full screen"
                className="w-full h-full object-contain max-h-[85vh] rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}