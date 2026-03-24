"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import type { Slide } from "@/lib/slides-data"
import { useIsMobile } from "@/hooks/use-media-query"

interface LightboxProps {
  slide: Slide | null
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ slide, isOpen, onClose }: LightboxProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1)
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newScale
    })
  }, [])

  const handleReset = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  // Handle pinch-to-zoom for touch devices
  const lastTouchDistance = useRef<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      lastTouchDistance.current = distance
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const delta = distance - lastTouchDistance.current
      setScale((prev) => Math.max(1, Math.min(4, prev + delta * 0.01)))
      lastTouchDistance.current = distance
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    lastTouchDistance.current = null
  }, [])

  // Handle swipe to close
  const startY = useRef<number | null>(null)

  const handleSwipeStart = useCallback((e: React.TouchEvent) => {
    if (scale === 1 && e.touches.length === 1) {
      startY.current = e.touches[0].clientY
    }
  }, [scale])

  const handleSwipeMove = useCallback(
    (e: React.TouchEvent) => {
      if (startY.current !== null && scale === 1) {
        const deltaY = e.touches[0].clientY - startY.current
        if (deltaY > 100) {
          onClose()
          startY.current = null
        }
      }
    },
    [scale, onClose]
  )

  const handleSwipeEnd = useCallback(() => {
    startY.current = null
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "+":
        case "=":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        case "0":
          handleReset()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handleReset])

  if (!slide) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-black/90"
          />

          {/* Controls */}
          <div className="absolute right-4 top-4 z-10 flex gap-2 sm:right-6 sm:top-6">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomIn()
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomOut()
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleReset()
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Reset zoom"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Zoom level indicator */}
          {scale > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-md sm:left-6 sm:top-6"
            >
              {Math.round(scale * 100)}%
            </motion.div>
          )}

          {/* Image container */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              handleTouchStart(e)
              handleSwipeStart(e)
            }}
            onTouchMove={(e) => {
              handleTouchMove(e)
              handleSwipeMove(e)
            }}
            onTouchEnd={() => {
              handleTouchEnd()
              handleSwipeEnd()
            }}
          >
            <motion.div
              drag={scale > 1}
              dragConstraints={containerRef}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              style={{
                scale,
                x: position.x,
                y: position.y,
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
              className="select-none"
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={slide.mobile} />
                <source media="(min-width: 769px)" srcSet={slide.desktop} />
                <img
                  src={slide.desktop}
                  alt={`${slide.name} - Full view`}
                  className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                  draggable={false}
                />
              </picture>
            </motion.div>
          </motion.div>

          {/* Swipe hint for mobile */}
          {isMobile && scale === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 text-sm text-white/50"
            >
              Swipe down to close • Pinch to zoom
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
