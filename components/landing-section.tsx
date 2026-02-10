"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"

interface LandingSectionProps {
  onContinue: () => void
}

export function LandingSection({ onContinue }: LandingSectionProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    const buttonTimer = setTimeout(() => setShowButton(true), 1500)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <FloatingHearts count={8} />
      
      <div className="text-center max-w-lg">
        <h1 
          className={`font-serif text-5xl md:text-7xl text-foreground mb-8 transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Hey <span className="text-primary">Bhabha</span>
        </h1>
        
        <p 
          className={`font-serif text-xl md:text-2xl text-muted-foreground mb-12 transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          I made something for you
        </p>

        <div 
          className={`transition-all duration-700 ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            onClick={onContinue}
            variant="outline"
            className="px-10 py-6 text-lg font-serif border-primary/40 text-white hover:bg-primary/10 hover:border-primary transition-all duration-500 bg-transparent"
          >
            Continue
          </Button>
        </div>
      </div>
    </section>
  )
}
