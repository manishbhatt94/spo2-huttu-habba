"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { slides } from "@/lib/slides-data"
import { HeroIntro } from "./hero-intro"
import { SlideImage } from "./slide-image"
import { SlideControls } from "./slide-controls"
import { ScrubBar } from "./scrub-bar"
import { Lightbox } from "./lightbox"
import { MusicPlayer } from "./music-player"
import { GreetingTitle } from "./greeting-title"

const SLIDE_DURATION = 6000 // 6 seconds per slide

export function BirthdaySlideshow() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [lightboxSlide, setLightboxSlide] = useState<number | null>(null)
  
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Start the slideshow
  const handleStart = useCallback(() => {
    setHasStarted(true)
    setIsPlaying(true)
    setShowControls(true)
  }, [])

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Go to next slide
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [])

  // Go to previous slide
  const handlePrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }, [])

  // Seek to specific slide
  const handleSeek = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex)
    setProgress(0)
    setIsPlaying(true)
  }, [])

  // Open lightbox
  const handleOpenLightbox = useCallback((slideIndex: number) => {
    setLightboxSlide(slideIndex)
    setIsPlaying(false)
  }, [])

  // Close lightbox
  const handleCloseLightbox = useCallback(() => {
    setLightboxSlide(null)
    setIsPlaying(true)
  }, [])

  // Show controls on mouse movement
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  // Progress and auto-advance logic
  useEffect(() => {
    if (!hasStarted || !isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current)
      }
      return
    }

    // Update progress every 50ms
    const progressStep = 50 / SLIDE_DURATION
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + progressStep, 1))
    }, 50)

    // Auto-advance to next slide
    slideTimeoutRef.current = setTimeout(() => {
      handleNext()
    }, SLIDE_DURATION)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current)
      }
    }
  }, [hasStarted, isPlaying, currentSlide, handleNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted || lightboxSlide !== null) return

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault()
          handleNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          handlePrevious()
          break
        case "p":
        case "P":
          handlePlayPause()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [hasStarted, lightboxSlide, handleNext, handlePrevious, handlePlayPause])

  // Touch handling for mobile swipe
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return

      const deltaX = e.changedTouches[0].clientX - touchStartX.current
      const threshold = 50

      if (deltaX > threshold) {
        handlePrevious()
      } else if (deltaX < -threshold) {
        handleNext()
      }

      touchStartX.current = null
    },
    [handleNext, handlePrevious]
  )

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[var(--forest)]"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hero Intro */}
      <AnimatePresence>
        {!hasStarted && <HeroIntro onStart={handleStart} />}
      </AnimatePresence>

      {/* Birthday Greeting */}
      <GreetingTitle isVisible={hasStarted && currentSlide === 0} />

      {/* Slideshow */}
      {hasStarted && (
        <>
          {/* Slides */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <SlideImage
                key={slide.id}
                slide={slide}
                isActive={index === currentSlide}
                onZoom={() => handleOpenLightbox(index)}
                priority={index === 0}
              />
            ))}
          </div>

          {/* Controls */}
          <SlideControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentSlide={currentSlide}
            totalSlides={slides.length}
            isVisible={showControls}
          />

          {/* Scrub Bar */}
          <ScrubBar
            currentSlide={currentSlide}
            totalSlides={slides.length}
            progress={progress}
            onSeek={handleSeek}
          />

          {/* Footer text */}
          <div className="pointer-events-none absolute bottom-16 left-0 right-0 z-20 text-center sm:bottom-20">
            <p className="text-xs text-white/40 sm:text-sm">
              (ಗೂಗಲ್ ಜೆಮಿನಿ &reg; captions - 👻)
            </p>
          </div>
        </>
      )}

      {/* Music Player */}
      <MusicPlayer isStarted={hasStarted} />

      {/* Lightbox */}
      <Lightbox
        slide={lightboxSlide !== null ? slides[lightboxSlide] : null}
        isOpen={lightboxSlide !== null}
        onClose={handleCloseLightbox}
      />
    </div>
  )
}
