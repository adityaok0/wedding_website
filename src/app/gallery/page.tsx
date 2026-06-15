"use client";

import { SlideUp } from "@/components/animations/SlideUp";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlowerPetals } from "@/components/animations/FlowerPetals";

type GalleryImage = {
  id: number;
  category: string;
  url: string;
  title?: string;
  date?: string;
  likes?: number;
};

const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[16/9]",
  "aspect-[2/3]",
  "aspect-[5/4]",
];

const categories = ["All", "Pre Wedding", "Engagement", "Family"];

function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2",
        type === 'success' ? 'bg-deep-forest text-ivory' : 'bg-red-500 text-white'
      )}
    >
      {type === 'success' ? (
        <Check className="w-4 h-4" />
      ) : (
        <X className="w-4 h-4" />
      )}
      <span className="font-sans text-sm">{message}</span>
    </motion.div>
  );
}

// Custom Intersection Observer Hook
function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-full rounded-2xl bg-gradient-to-br from-soft-gold/10 to-soft-gold/5 animate-pulse break-inside-avoid relative overflow-hidden",
            ASPECTS[i % ASPECTS.length]
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// Fallback images function
function getFallbackImages(): GalleryImage[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
    url: `https://picsum.photos/800/${600 + Math.floor(Math.random() * 400)}?random=${i}`,
    title: `Beautiful Moment ${i + 1}`,
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    likes: Math.floor(Math.random() * 150),
  }));
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { ref: loadMoreRef } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: GalleryImage[]) => {
        const enhanced = data.map((img: GalleryImage) => ({
          ...img,
          title: `${img.category} Session ${img.id}`,
          date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          likes: Math.floor(Math.random() * 150),
        }));
        setImages(enhanced);
        setLoading(false);
      })
      .catch(() => {
        setImages(getFallbackImages());
        setLoading(false);
      });
  }, []);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const openLightbox = useCallback((image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }, [currentIndex, filteredImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeLightbox, navigateImage]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-ivory to-ivory/50 pt-12 pb-32 px-4 md:px-8">
      <FlowerPetals count={18} />

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <SlideUp className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-5xl md:text-7xl text-deep-forest mb-3">
            Our Gallery
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-sage-green italic">
            Where moments become memories
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-[1px] bg-soft-gold" />
            <div className="w-1.5 h-1.5 rounded-full bg-soft-gold" />
            <div className="w-12 h-[1px] bg-soft-gold" />
          </div>
        </motion.div>
      </SlideUp>

      <SlideUp delay={0.2} className="mb-12">
        <motion.div
          className="flex items-center gap-2 md:gap-4 overflow-x-auto hide-scrollbar justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative px-6 py-2.5 rounded-full font-sans text-xs md:text-sm uppercase tracking-widest transition-all duration-300 group",
                activeCategory === cat
                  ? "bg-deep-forest text-ivory shadow-lg shadow-deep-forest/20"
                  : "bg-white/80 backdrop-blur-sm text-sage-green border border-muted hover:border-soft-gold hover:shadow-md"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-deep-forest rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </SlideUp>

      <SlideUp delay={0.3}>
        {loading ? (
          <SkeletonLoader />
        ) : filteredImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="font-cormorant text-2xl text-deep-forest mb-2">
              No images found
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-7xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={cn(
                    "relative w-full rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid shadow-lg hover:shadow-2xl transition-shadow duration-500",
                    ASPECTS[index % ASPECTS.length]
                  )}
                  onClick={() => openLightbox(img, index)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.title || img.category}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-sans text-deep-forest uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {img.category}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div ref={loadMoreRef} className="h-10" />
          </>
        )}
      </SlideUp>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-forest/98 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <div className="absolute inset-y-0 left-4 flex items-center z-[101]">
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-ivory hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center z-[101]">
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-ivory hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-[101]">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full text-ivory hover:bg-white/20 transition-all ml-2"
                  onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title || selectedImage.category}
                className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-ivory font-sans text-sm">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}