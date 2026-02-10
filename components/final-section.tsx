"use client"

import { useState, useEffect } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { Heart, Wine, UtensilsCrossed, Coffee, Cake } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Animated floating elements component
function FloatingDiningElements() {
  const [elements, setElements] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    icon: string
    size: number
  }>>([])

  useEffect(() => {
    const icons = ['wine', 'utensils', 'coffee', 'cake']
    const newElements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 20,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: 16 + Math.random() * 8
    }))
    setElements(newElements)
  }, [])

  const IconComponent = ({ iconType, size }: { iconType: string; size: number }) => {
    const iconProps = { size, className: "text-primary/20" }
    switch (iconType) {
      case 'wine': return <Wine {...iconProps} />
      case 'utensils': return <UtensilsCrossed {...iconProps} />
      case 'coffee': return <Coffee {...iconProps} />
      case 'cake': return <Cake {...iconProps} />
      default: return <Wine {...iconProps} />
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float opacity-30"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        >
          <IconComponent iconType={element.icon} size={element.size} />
        </div>
      ))}
    </div>
  )
}

export function FinalSection() {
  const [showContent, setShowContent] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(contentTimer)
  }, [])

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true)
  }

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
      <FloatingDiningElements />
      
      <div 
        className={`text-center max-w-3xl transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Animated Envelope */}
        <div className="relative max-w-2xl mx-auto mb-12 perspective-1000">
          {!isEnvelopeOpen ? (
            // Realistic Closed Envelope
            <button
              onClick={handleEnvelopeClick}
              className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto"
              style={{
                aspectRatio: '360/260'
              }}
            >
              {/* Main Envelope Container */}
              <div 
                className="relative overflow-hidden"
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#fcfcfc',
                  border: '1px solid #b8b8b8',
                  borderRadius: '4px',
                  boxShadow: '0 18px 48px rgba(0,0,0,0.20), inset 0 3px 10px rgba(0,0,0,0.12)'
                }}
              >
                {/* Envelope Body */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, #fefefe 0%, #f2f2f2 100%)',
                    boxShadow: 'inset 0 50px 100px -40px rgba(0,0,0,0.18), inset 0 -25px 60px -25px rgba(0,0,0,0.10)',
                    zIndex: 1
                  }}
                />

                {/* Side Left */}
                <div 
                  className="absolute top-0 left-0"
                  style={{
                    width: '50%',
                    height: '100%',
                    background: '#ffffff',
                    clipPath: 'polygon(0 0, 50% 38%, 0 100%)',
                    boxShadow: 'inset -10px 0 24px rgba(0,0,0,0.12)',
                    zIndex: 0
                  }}
                />

                {/* Side Right */}
                <div 
                  className="absolute top-0 right-0"
                  style={{
                    width: '50%',
                    height: '100%',
                    background: '#ffffff',
                    clipPath: 'polygon(100% 0, 50% 38%, 100% 100%)',
                    boxShadow: 'inset 10px 0 24px rgba(0,0,0,0.12)',
                    zIndex: 0
                  }}
                />

                {/* Flap */}
                <div 
                  className="absolute top-0 left-0 transition-transform duration-700 group-hover:-rotate-x-12"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, #ffffff 0%, #f6f6f6 30%, #e0e0e0 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 52%, 0 0)',
                    boxShadow: `
                      0 14px 32px rgba(0,0,0,0.16),
                      inset 0 -40px 80px -20px rgba(0,0,0,0.40),
                      inset 0 -15px 40px -10px rgba(0,0,0,0.28),
                      inset 0 -5px 15px rgba(0,0,0,0.15)
                    `,
                    borderBottom: '1px solid #a8a8a8',
                    zIndex: 2,
                    transformOrigin: 'top'
                  }}
                >
                  {/* Crease */}
                  <div 
                    className="absolute bottom-0 left-0"
                    style={{
                      width: '100%',
                      height: '8px',
                      background: 'linear-gradient(to right, transparent 5%, #909090 30%, #909090 70%, transparent 95%)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.30), inset 0 4px 12px rgba(0,0,0,0.25)',
                      opacity: 0.95,
                      zIndex: 3
                    }}
                  />
                </div>

                {/* Address Area */}
                <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center" style={{ zIndex: 4 }}>
                  <p className="text-gray-700 text-sm sm:text-lg font-serif">Tap to open</p>
                </div>

                {/* Hover glow */}
                <div 
                  className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ zIndex: 5 }}
                />
              </div>
            </button>
          ) : (
            // Opened Invitation
            <div className="w-full h-full min-h-[400px] sm:min-h-[500px] bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-primary/40 rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-primary/5"></div>
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-t-2 border-primary/60 rounded-tl-lg"></div>
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-t-2 border-primary/60 rounded-tr-lg"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-b-2 border-primary/60 rounded-bl-lg"></div>
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-b-2 border-primary/60 rounded-br-lg"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary fill-primary mx-auto mb-3 sm:mb-4 animate-pulse" />
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-100 mb-2 sm:mb-3">You're Invited</h3>
                  <p className="text-primary/80 text-sm sm:text-lg font-light">to our romantic Valentine's dinner</p>
                </div>
                
                {/* Main Details */}
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-primary/30 min-w-[250px] sm:min-w-[300px]">
                    <div className="space-y-2 sm:space-y-3 text-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-white text-sm sm:text-base font-medium">Venue:</span>
                        <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-primary">Karvouno</h4>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-white text-sm sm:text-base font-medium">Date:</span>
                        <p className="text-base sm:text-xl font-medium">February 14th, 2026</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-white text-sm sm:text-base font-medium">Time:</span>
                        <p className="text-sm sm:text-lg">18h00</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Theme Details */}
                <div className="text-gray-300 text-sm sm:text-base">
                  <p className="mb-2 sm:mb-3">Dress Code:</p>
                  <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-800 border border-gray-400"></div>
                      <span className="text-sm sm:text-lg">Brown</span>
                    </div>
                    <span className="text-primary text-lg sm:text-xl">&</span>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border border-primary/50"></div>
                      <span className="text-sm sm:text-lg">White</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-6 sm:top-8 left-6 sm:left-8">
                  <Wine className="w-4 h-4 sm:w-6 sm:h-6 text-primary/40" />
                </div>
                <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
                  <UtensilsCrossed className="w-4 h-4 sm:w-6 sm:h-6 text-primary/40" />
                </div>
                
                {/* Bottom flourish */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
                </div>
              </div>
              
              {/* Subtle animated hearts pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 animate-ping">
                  <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-primary fill-primary" />
                </div>
                <div className="absolute top-3/4 right-1/4 animate-ping animation-delay-1000">
                  <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-primary fill-primary" />
                </div>
              </div>
            </div>
          )}
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
          Counting Down to{" "}
          <span className="text-primary">Our Day</span>
        </h2>
        
        <p className="font-sans text-muted-foreground mb-12">
          February 14th, 2026
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-16">
          <div className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 md:p-6">
            <span className="font-serif text-2xl sm:text-3xl md:text-5xl text-primary">{timeLeft.days}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2">Days</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 md:p-6">
            <span className="font-serif text-2xl sm:text-3xl md:text-5xl text-primary">{timeLeft.hours}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2">Hours</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 md:p-6">
            <span className="font-serif text-2xl sm:text-3xl md:text-5xl text-primary">{timeLeft.minutes}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2">Minutes</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-3 sm:p-4 md:p-6">
            <span className="font-serif text-2xl sm:text-3xl md:text-5xl text-primary">{timeLeft.seconds}</span>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2">Seconds</p>
          </div>
        </div>

        <div className="space-y-4">
          <Heart className="w-8 h-8 text-primary fill-primary mx-auto animate-pulse" />
          <p className="font-serif text-xl md:text-2xl text-foreground">
            I love you, <span className="text-primary">Bhabha</span>
          </p>
          <p className="font-sans text-muted-foreground">
            To the end of the earth and afar, and beyond afar.
          </p>
        </div>
      </div>
    </section>
  )
}
