"use client"

import { useState, useEffect } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { Heart } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function FinalSection() {
  const [showContent, setShowContent] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(contentTimer)
  }, [])

  useEffect(() => {
    const valentinesDay = new Date("2026-02-14T00:00:00")
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = valentinesDay.getTime() - now.getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <FloatingHearts count={8} />
      
      <div 
        className={`text-center max-w-3xl transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Image Placeholder */}
        <div className="relative aspect-video max-w-2xl mx-auto mb-12 bg-card border border-border/50 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Heart className="w-12 h-12 text-primary/30 mb-4" />
            <span className="font-serif text-xl text-muted-foreground">Valentine&apos;s Day 2026</span>
            <span className="text-sm text-muted-foreground/50 mt-2">Add your photo here</span>
          </div>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
          Counting Down to{" "}
          <span className="text-primary">Our Day</span>
        </h2>
        
        <p className="font-sans text-muted-foreground mb-12">
          February 14th, 2026
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-16">
          <div className="bg-card border border-border/50 rounded-lg p-4 md:p-6">
            <span className="font-serif text-3xl md:text-5xl text-primary">{timeLeft.days}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Days</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 md:p-6">
            <span className="font-serif text-3xl md:text-5xl text-primary">{timeLeft.hours}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Hours</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 md:p-6">
            <span className="font-serif text-3xl md:text-5xl text-primary">{timeLeft.minutes}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Minutes</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 md:p-6">
            <span className="font-serif text-3xl md:text-5xl text-primary">{timeLeft.seconds}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Seconds</p>
          </div>
        </div>

        <div className="space-y-4">
          <Heart className="w-8 h-8 text-primary fill-primary mx-auto animate-pulse" />
          <p className="font-serif text-xl md:text-2xl text-foreground">
            I love you, <span className="text-primary">Bhabha</span>
          </p>
          <p className="font-sans text-muted-foreground">
            Forever and always
          </p>
        </div>
      </div>
    </section>
  )
}
