"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2, VolumeX, ChevronUp, ChevronDown, ExternalLink } from "lucide-react"

interface MusicPlayerProps {
  isStarted: boolean
}

export function MusicPlayer({ isStarted }: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // YouTube video ID
  const videoId = "7maJOI3QMu0"

  useEffect(() => {
    if (isStarted) {
      setIsLoaded(true)
    }
  }, [isStarted])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Note: YouTube iframe API would be needed for actual mute control
    // This is a simplified version
  }

  return (
    <AnimatePresence>
      {isStarted && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed bottom-20 left-4 z-40 sm:bottom-24 sm:left-6"
        >
          <motion.div
            layout
            className="glass-dark overflow-hidden rounded-2xl shadow-xl"
            style={{ width: isExpanded ? "280px" : "auto" }}
          >
            {/* Collapsed state */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 p-3 text-white transition-colors hover:bg-white/10"
              layout
            >
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 360 }}
                transition={{ duration: 2, repeat: isExpanded ? 0 : Infinity, ease: "linear" }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/20"
              >
                <Music className="h-5 w-5 text-[var(--gold)]" />
              </motion.div>
              
              {!isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden pr-2 text-sm font-medium sm:block"
                >
                  Now Playing
                </motion.span>
              )}
              
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-white/60" />
              ) : (
                <ChevronUp className="h-4 w-4 text-white/60" />
              )}
            </motion.button>

            {/* Expanded state */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 p-4">
                    {/* Track info */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white">
                        River Flows In You
                      </h4>
                      <p className="text-xs text-white/60">Yiruma</p>
                    </div>

                    {/* YouTube embed (hidden for audio only) */}
                    {isLoaded && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <iframe
                          ref={iframeRef}
                          width="100%"
                          height="80"
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1${isMuted ? "&mute=1" : ""}`}
                          title="River Flows In You - Yiruma"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          className="border-0"
                        />
                      </div>
                    )}

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={toggleMute}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white/70"
                      >
                        Open on YouTube
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
