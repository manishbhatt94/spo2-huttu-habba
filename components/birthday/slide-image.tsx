"use client"

import { motion } from "framer-motion"
import { ZoomIn } from "lucide-react"
import type { Slide } from "@/lib/slides-data"

interface SlideImageProps {
  slide: Slide
  isActive: boolean
  onZoom: () => void
  priority?: boolean
}

export function SlideImage({ slide, isActive, onZoom, priority = false }: SlideImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      {/* Picture element for responsive images */}
      <picture>
        <source 
          media="(max-width: 768px)" 
          srcSet={slide.mobile}
        />
        <source 
          media="(min-width: 769px)" 
          srcSet={slide.desktop}
        />
        <img
          src={slide.desktop}
          alt={`Slide ${slide.id}: ${slide.name}`}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
        />
      </picture>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Zoom button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        onClick={onZoom}
        className="glass absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-6 sm:top-6"
        aria-label="Zoom image"
      >
        <ZoomIn className="h-5 w-5" />
      </motion.button>

      {/* Captions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute bottom-20 left-0 right-0 px-6 text-center sm:bottom-28 sm:px-12"
      >
        {/* Kannada caption - prominent */}
        <p className="font-[var(--font-noto-kannada)] text-xl font-medium text-white drop-shadow-lg sm:text-3xl md:text-4xl leading-relaxed">
          {slide.captionKannada}
        </p>
        
        {/* English caption - subtle */}
        <p className="mt-3 font-sans text-sm text-white/80 drop-shadow-md sm:text-base md:text-lg">
          {slide.captionEnglish}
        </p>
      </motion.div>
    </motion.div>
  )
}
