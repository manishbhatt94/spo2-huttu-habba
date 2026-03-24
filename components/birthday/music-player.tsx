"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2, VolumeX, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

interface MusicPlayerProps {
  isStarted: boolean
}

export function MusicPlayer({ isStarted }: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // YouTube video ID
  const videoId = "7maJOI3QMu0"

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <AnimatePresence>
      {isStarted && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed left-4 top-4 z-40 sm:left-6 sm:top-6"
        >
          <motion.div
            initial={false}
            animate={{ width: isExpanded ? 280 : "auto" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="glass-dark overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Always render iframe, but hide it - keeps audio playing */}
            <div className="sr-only" aria-hidden="true">
              <iframe
                ref={iframeRef}
                width="1"
                height="1"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1${isMuted ? "&mute=1" : ""}`}
                title="River Flows In You - Yiruma"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="pointer-events-none border-0"
              />
            </div>

            {/* Collapsed toggle button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex w-full items-center gap-3 p-3 text-white transition-colors hover:bg-white/10"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 360 }}
                transition={{ duration: 2, repeat: isExpanded ? 0 : Infinity, ease: "linear" }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20"
              >
                <Music className="h-5 w-5 text-[var(--gold)]" />
              </motion.div>
              
              <span className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${isExpanded ? "w-0 opacity-0" : "w-auto opacity-100 pr-2 hidden sm:block"}`}>
                Now Playing
              </span>
              
              <motion.div
                initial={false}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4 text-white/60" />
              </motion.div>
            </button>

            {/* Expanded content */}
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
                  <div className="border-t border-white/10 p-4 pt-3">
                    {/* Track info */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white">
                        River Flows In You
                      </h4>
                      <p className="text-xs text-white/60">Yiruma</p>
                    </div>

                    {/* Visible YouTube embed when expanded */}
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <iframe
                        width="100%"
                        height="80"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&loop=1&playlist=${videoId}&controls=1&showinfo=0&rel=0&modestbranding=1${isMuted ? "&mute=1" : ""}`}
                        title="River Flows In You - Yiruma (controls)"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="border-0"
                      />
                    </div>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
