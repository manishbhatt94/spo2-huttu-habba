"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface HeroIntroProps {
  onStart: () => void
}

export function HeroIntro({ onStart }: HeroIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Blurred background */}
      <div className="absolute inset-0 bg-[var(--forest)]/90 backdrop-blur-xl" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-[var(--gold)]/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full bg-[var(--gold)]/20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-6 w-6 text-[var(--gold)]" />
          <span className="text-sm font-medium tracking-widest uppercase text-[var(--gold)]">
            A Special Tribute
          </span>
          <Sparkles className="h-6 w-6 text-[var(--gold)]" />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-[var(--font-playfair)] text-5xl sm:text-7xl font-semibold text-[var(--cream)] tracking-tight"
        >
          For SpO2...
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-md text-[var(--cream)]/70 text-lg leading-relaxed"
        >
          From the Mountains of Uttarakhand to the Plateau of Bengaluru
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative mt-4 overflow-hidden rounded-full bg-[var(--gold)] px-8 py-4 text-lg font-medium text-[var(--forest)] transition-all hover:bg-[var(--gold-light)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--forest)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Step Inside
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[var(--gold-light)]"
          />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-4 text-xs text-[var(--cream)]/50"
        >
          Click to begin • Music will play
        </motion.p>
      </div>
    </motion.div>
  )
}
