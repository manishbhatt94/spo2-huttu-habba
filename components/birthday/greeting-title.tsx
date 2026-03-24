"use client"

import { motion } from "framer-motion"

interface GreetingTitleProps {
  isFirstSlide: boolean
  isVisible: boolean
}

export function GreetingTitle({ isFirstSlide, isVisible }: GreetingTitleProps) {
  if (!isVisible) return null

  // First slide: Full greeting with overlay, Kannada + English + Name
  if (isFirstSlide) {
    return (
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
    )
  }

  // Other slides: Just Kannada text centered with text shadow
  return (
    <motion.div
      key="kannada-greeting"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute inset-x-0 top-22 z-30 flex items-center justify-center px-4 sm:top-26"
    >
      <p
        className="font-[var(--font-noto-kannada)] text-xl font-medium text-[var(--gold)] sm:text-2xl md:text-3xl"
        style={{
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.7), 0 4px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು
      </p>
    </motion.div>
  )
}
