"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"

interface LoveLetterSectionProps {
  onContinue: () => void
}

export function LoveLetterSection({ onContinue }: LoveLetterSectionProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 300)
    const buttonTimer = setTimeout(() => setShowButton(true), 2000)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <FloatingHearts count={5} />
      
      <div className="max-w-2xl mx-auto">
        <div 
          className={`bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8 md:p-12 transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8 text-center">
            Sthandwa Sam',
          </h2>
          
          <div className="space-y-6 font-sans text-foreground/90 leading-relaxed text-base md:text-lg">
            <p>
              Five years ago, I had no idea that my life could be what it is today, 
              then you walked into it, and suddenly it became brighter and beyond my wildest dreams.
            </p>
            
            <p>
              You have been my best friend, my confidante, my partner in every predicament, and my greatest love. You are the person I want to share all of life’s moments with.
              You are part of the reasons I wake up excited for each new day. Your laugh is my favorite sound, 
              your gorgeous face is my favorite sight.
            </p>
            
            <p>
              Through every high and low, you have stood by me. You have seen me at my worst 
              and loved me anyway.
              You have made me want to be better, not because you asked, but because you inspire me.
            </p>
            
            <p>
              These five years have been the best of my life, and I cannot imagine a future 
              without you in it. Every memory we have created together is a treasure I hold close to my heart.
            </p>
            
            <p className="text-primary font-serif text-xl text-center pt-4">
              Let me take you on a journey through some of our best moments...
            </p>
          </div>

          <div 
            className={`flex justify-center mt-10 transition-all duration-700 ${
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
      </div>
    </section>
  )
}
