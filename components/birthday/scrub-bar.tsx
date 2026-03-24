"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface ScrubBarProps {
  currentSlide: number
  totalSlides: number
  progress: number
  onSeek: (slideIndex: number) => void
}

export function ScrubBar({ currentSlide, totalSlides, progress, onSeek }: ScrubBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)

  const calculateSlideFromPosition = useCallback(
    (clientX: number) => {
      if (!barRef.current) return currentSlide
      const rect = barRef.current.getBoundingClientRect()
      const position = (clientX - rect.left) / rect.width
      const slideIndex = Math.floor(position * totalSlides)
      return Math.max(0, Math.min(totalSlides - 1, slideIndex))
    },
    [currentSlide, totalSlides]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const slideIndex = calculateSlideFromPosition(e.clientX)
      setHoverPosition(slideIndex)
    },
    [calculateSlideFromPosition]
  )

  const handleMouseLeave = useCallback(() => {
    setHoverPosition(null)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const slideIndex = calculateSlideFromPosition(e.clientX)
      onSeek(slideIndex)
    },
    [calculateSlideFromPosition, onSeek]
  )

  const handleTouchStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return
      const slideIndex = calculateSlideFromPosition(e.touches[0].clientX)
      onSeek(slideIndex)
    },
    [isDragging, calculateSlideFromPosition, onSeek]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Calculate the overall progress (0-1)
  const overallProgress = (currentSlide + progress) / totalSlides

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6 sm:pb-6">
      <div
        ref={barRef}
        className="group relative h-2 cursor-pointer rounded-full bg-white/20 backdrop-blur-sm transition-all hover:h-3"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="slider"
        aria-label="Slideshow progress"
        aria-valuemin={0}
        aria-valuemax={totalSlides}
        aria-valuenow={currentSlide + 1}
      >
        {/* Segment markers */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className="relative flex-1 border-r border-white/10 last:border-r-0"
            >
              {index === hoverPosition && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white"
                >
                  Slide {index + 1}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--gold)]"
          style={{ width: `${overallProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Playhead */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[var(--gold)] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${overallProgress * 100}% - 8px)` }}
        />
      </div>

      {/* Slide indicators below the bar */}
      <div className="mt-2 flex justify-center gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSeek(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide
                ? "w-4 bg-[var(--gold)]"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
