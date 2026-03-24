"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GreetingTitleProps {
  isVisible: boolean
}

export function GreetingTitle({ isVisible }: GreetingTitleProps) {
  const [showGreeting, setShowGreeting] = useState(true)

  useEffect(() => {
    if (isVisible) {
      setShowGreeting(true)
      const timer = setTimeout(() => {
        setShowGreeting(false)
      }, 5000) // Show for 5 seconds
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && showGreeting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
        >
          {/* Overlay for readability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[var(--forest)]"
          />
          
          {/* Greeting content */}
          <div className="relative z-10 px-6 text-center">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4 font-[var(--font-noto-kannada)] text-2xl font-medium text-[var(--gold)] sm:text-4xl"
            >
              ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು
            </motion.p>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-6 text-sm text-[var(--cream)]/70 sm:text-base"
            >
              (Huttu habbada shubhashayagalu)
            </motion.p>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-[var(--font-playfair)] text-4xl font-semibold text-[var(--cream)] sm:text-6xl md:text-7xl"
            >
              Happy Birthday,{" "}
              <span className="text-[var(--gold)]">SpO2!</span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 2 }}
              className="mx-auto mt-8 h-0.5 max-w-xs bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
