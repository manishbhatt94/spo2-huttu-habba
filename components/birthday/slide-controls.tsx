"use client"

import { motion } from "framer-motion"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

interface SlideControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  currentSlide: number
  totalSlides: number
  isVisible: boolean
}

export function SlideControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  currentSlide,
  totalSlides,
  isVisible,
}: SlideControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none absolute inset-x-0 bottom-42 z-20 flex items-center justify-center gap-4 px-4 sm:bottom-52"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 opacity-80 backdrop-blur-md">
        {/* Previous button */}
        <button
          onClick={onPrevious}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Play/Pause button */}
        <button
          onClick={onPlayPause}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--forest)] transition-all hover:bg-[var(--gold-light)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-black/40"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </button>

        {/* Next button */}
        <button
          onClick={onNext}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide counter */}
        <span className="ml-2 min-w-[4ch] text-center text-sm font-medium text-white/70">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </motion.div>
  )
}
