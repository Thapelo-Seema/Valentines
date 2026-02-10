"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

interface CelebrationSectionProps {
  onComplete: () => void
  wasDifficult?: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  speedX: number
  speedY: number
  rotation: number
  type: "confetti" | "heart"
}

export function CelebrationSection({ onComplete, wasDifficult = false }: CelebrationSectionProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Create confetti and hearts
    const colors = ["#ec4899", "#f472b6", "#fb7185", "#fda4af", "#fecdd3", "#ffffff"]
    const newParticles: Particle[] = []
    
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        speedX: (Math.random() - 0.5) * 2,
        speedY: 2 + Math.random() * 3,
        rotation: Math.random() * 360,
        type: Math.random() > 0.7 ? "heart" : "confetti",
      })
    }
    setParticles(newParticles)
    
    // Show message after a moment
    const messageTimer = setTimeout(() => setShowMessage(true), 1000)
    
    // Show date details
    const detailsTimer = setTimeout(() => setShowDetails(true), 4000)
    
    // Transition to final screen
    const completeTimer = setTimeout(() => onComplete(), 10000)
    
    return () => {
      clearTimeout(messageTimer)
      clearTimeout(detailsTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Confetti and Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-fall"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {particle.type === "heart" ? (
              <Heart
                className="fill-current"
                style={{
                  color: particle.color,
                  width: particle.size,
                  height: particle.size,
                }}
              />
            ) : (
              <div
                className="rounded-sm"
                style={{
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size * 0.6,
                  transform: `rotate(${particle.rotation}deg)`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center max-w-2xl z-10">
        <div 
          className={`transition-all duration-1000 ${
            showMessage ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <Heart className="w-20 h-20 md:w-32 md:h-32 text-primary fill-primary mx-auto mb-8 animate-pulse" />
          
          <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4">
            She said YES!
            {wasDifficult && (
              <div className="text-base md:text-lg text-muted-foreground/70 mt-2 font-sans">
                (Why did you have to be so difficult)
              </div>
            )}
          </h2>
          
          <p className="font-serif text-2xl md:text-3xl text-foreground">
            This is going to be the best Valentine&apos;s Day ever
          </p>
        </div>

        <div 
          className={`mt-12 p-8 bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg transition-all duration-1000 ${
            showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="font-serif text-2xl text-primary mb-4">Save the Date</h3>
          <p className="font-sans text-foreground text-lg mb-2">February 14th, 2026</p>
          <p className="font-sans text-muted-foreground">Our first Valentine&apos;s Day together</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall ease-out forwards;
        }
      `}</style>
    </section>
  )
}
