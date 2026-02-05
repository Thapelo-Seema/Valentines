"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"

interface TransitionSectionProps {
  onContinue: () => void
}

export function TransitionSection({ onContinue }: TransitionSectionProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    const buttonTimer = setTimeout(() => setShowButton(true), 2500)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <FloatingHearts count={6} />
      
      <div className="text-center max-w-2xl">
        <p 
          className={`font-serif text-3xl md:text-5xl text-foreground leading-relaxed transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          We have had so many{" "}
          <span className="text-primary">amazing dates</span>
          {" "}over these five years...
        </p>
        
        <p 
          className={`font-serif text-2xl md:text-4xl text-muted-foreground mt-8 transition-all duration-1000 delay-500 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          but...
        </p>

        <div 
          className={`mt-12 transition-all duration-700 ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            onClick={onContinue}
            variant="outline"
            className="px-10 py-6 text-lg font-serif border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-500 bg-transparent"
          >
            Continue
          </Button>
        </div>
      </div>
    </section>
  )
}
