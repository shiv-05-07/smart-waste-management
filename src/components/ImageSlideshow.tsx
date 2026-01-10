import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideshowImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageSlideshowProps {
  images: SlideshowImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  enableSwipe?: boolean;
}

export default function ImageSlideshow({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = false,
  enableSwipe = true,
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!enableSwipe) return;
    
    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left, go to next
        goToNext();
      } else {
        // Swiped right, go to previous
        goToPrevious();
      }
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-[2rem] flex items-center justify-center">
        <p className="text-gray-500 font-paragraph">No images available</p>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-2xl cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />

          {/* Overlay Info */}
          {(images[currentIndex].title || images[currentIndex].description) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              {images[currentIndex].title && (
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading mb-2">
                  {images[currentIndex].title}
                </h3>
              )}
              {images[currentIndex].description && (
                <p className="text-xs sm:text-sm font-paragraph opacity-90 line-clamp-2 sm:line-clamp-none">
                  {images[currentIndex].description}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white text-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white text-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Slide Counter */}
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 z-10 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-black/50 text-white font-paragraph text-xs sm:text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
