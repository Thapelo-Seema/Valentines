"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Heart } from "lucide-react"
import { FloatingHearts } from "@/components/floating-hearts"

interface DateMemory {
  id: number
  title: string
  year: string
  story: string
  placeholder: string
}

const memories: DateMemory[] = [
  {
    id: 1,
    title: "Our First Date",
    year: "2021",
    story: "I was so nervous I could barely speak. But the moment I saw your smile, everything felt right. We talked for hours, and I knew then that you were someone special. That night, I went home with butterflies I had never felt before.",
    placeholder: "First Date Photo"
  },
  {
    id: 2,
    title: "That Spontaneous Trip",
    year: "2022",
    story: "Remember when we just decided to drive somewhere without a plan? We ended up getting lost, finding that tiny restaurant, and having the best meal of our lives. It was chaotic and perfect - just like us.",
    placeholder: "Trip Photo"
  },
  {
    id: 3,
    title: "Your Birthday Surprise",
    year: "2023",
    story: "Planning that surprise for you was the hardest secret I ever had to keep. Seeing your face light up made every bit of stress worth it. Your happiness is everything to me.",
    placeholder: "Birthday Photo"
  },
  {
    id: 4,
    title: "Our Anniversary Dinner",
    year: "2024",
    story: "Four years together, and every moment with you still feels like magic. That dinner was special, but it is the quiet moments afterwards, just being together, that I treasure most.",
    placeholder: "Anniversary Photo"
  },
  {
    id: 5,
    title: "This Year Together",
    year: "2025",
    story: "Another year of growing together, laughing together, and loving each other more deeply. Every day with you is a gift I never take for granted. Here is to many more years of us.",
    placeholder: "Recent Photo"
  },
]

interface DatesSectionProps {
  onContinue: () => void
}

export function DatesSection({ onContinue }: DatesSectionProps) {
  const [selectedMemory, setSelectedMemory] = useState<DateMemory | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 300)
    const buttonTimer = setTimeout(() => setShowButton(true), 1000)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <FloatingHearts count={4} />
      
      <div className="max-w-5xl mx-auto w-full">
        <h2 
          className={`font-serif text-3xl md:text-5xl text-center text-foreground mb-4 transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Our <span className="text-primary">Best Dates</span>
        </h2>
        
        <p 
          className={`text-center text-muted-foreground mb-12 font-sans transition-all duration-1000 delay-200 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Click on a memory to relive the moment
        </p>

        <div 
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {memories.map((memory, index) => (
            <button
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              className="group relative aspect-square bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-background/80 to-transparent">
                <Heart className="w-8 h-8 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-2" />
                <span className="font-serif text-sm text-foreground text-center">{memory.title}</span>
                <span className="text-xs text-primary mt-1">{memory.year}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-xs">
                {memory.placeholder}
              </div>
            </button>
          ))}
        </div>

        <div 
          className={`flex justify-center transition-all duration-700 ${
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

      {/* Memory Modal */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-sm"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className="bg-card border border-border/50 rounded-lg p-8 max-w-lg w-full relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="aspect-video bg-secondary/50 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-muted-foreground">{selectedMemory.placeholder}</span>
            </div>
            
            <h3 className="font-serif text-2xl text-primary mb-2">{selectedMemory.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{selectedMemory.year}</p>
            <p className="font-sans text-foreground/90 leading-relaxed">{selectedMemory.story}</p>
          </div>
        </div>
      )}
    </section>
  )
}
