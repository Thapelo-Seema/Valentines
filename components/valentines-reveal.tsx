"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"
import { Heart } from "lucide-react"

interface ValentinesRevealProps {
  onContinue: () => void
}

export function ValentinesReveal({ onContinue }: ValentinesRevealProps) {
  const [showContent, setShowContent] = useState(false)
  const [showSecond, setShowSecond] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    const secondTimer = setTimeout(() => setShowSecond(true), 2000)
    const buttonTimer = setTimeout(() => setShowButton(true), 3500)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(secondTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <FloatingHearts count={10} />
      
      <div className="text-center max-w-3xl">
        <p 
          className={`font-serif text-3xl md:text-5xl text-foreground leading-relaxed transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          In five years together...
        </p>
        
        <div 
          className={`mt-8 transition-all duration-1000 ${
            showSecond ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-serif text-3xl md:text-5xl text-primary leading-relaxed">
            I have never asked you to be my{" "}
            <span className="inline-flex items-center gap-2">
              Valentine
              <Heart className="w-8 h-8 md:w-12 md:h-12 fill-primary text-primary animate-pulse" />
            </span>
            
          </p>
        </div>

        <div 
          className={`mt-16 transition-all duration-700 ${
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
