"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { FloatingHearts } from "@/components/floating-hearts"
import Image from "next/image"

interface DateMemory {
  id: number
  title: string
  year: string
  story: string
  placeholder: string
  image?: string
}

const memories: DateMemory[] = [
  {
    id: 1,
    title: "Our Go Karting Day",
    year: "2024",
    story: "This was so much fun, we both had our competitive spirits on that day. I remember you were so excited to beat me, and unfortunately I wiped the floor with your ass lol!",
    placeholder: "Trip Photo",
    image: "/go_karting.jpg"
  },
  {
    id: 2,
    title: "Strand Beach",
    year: "2025",
    story: "This is our outing to strand beach, it was actually my first time coming to Cape Town on a work trip. Everything was going great until we had to run the streets with cops, looking for my phone lol! It was a terrible experience but having you there made it so much more bearable.",
    placeholder: "Strand Beach Photo",
    image: "/strand.jpg"
  },
  
  {
    id: 3,
    title: "Wine Tasting",
    year: "2025",
    story: "This was our first wine tasting experience together, one the many firsts we've shared. We had fun but I don't miss the experience with that Uber guy who kept getting lost",
    placeholder: "Wine Tasting Photo",
    image: "/wine_tasting.JPG"
  },
  {
    id: 4,
    title: "Lewatles first concert",
    year: "2025",
    story: "I'm so glad you were around to share the experience of seeing our sons first concert. It was such a special moment for both of us and, yes, we were the biggest family as always.",
    placeholder: "Lewatle Concert Photo",
    image: "/lewatle_concert.JPG"
  },
  {
    id: 5,
    title: "Year end function",
    year: "2025",
    story: "You came to my year end function and I was so happy to have you there to support me. ",
    placeholder: "Year End Function Photo",
    image: "/year_end.JPG"
  },
  {
    id: 6,
    title: "Camping",
    year: "2026",
    story: "This is how started off the year together with our son. It was such a special moment for us, and I remember how much fun we had camping together. We made some unforgettable memories that day, I don't want to spill the beans but you didn't have to pull Oshi's foot lol",
    placeholder: "Camping Photo",
    image: "/camping.JPG"
  }
]

interface DatesSectionProps {
  onContinue: () => void
}

export function DatesSection({ onContinue }: DatesSectionProps) {
  const [selectedMemory, setSelectedMemory] = useState<DateMemory | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  
  const itemsPerPage = 5
  const totalPages = Math.ceil(memories.length / itemsPerPage)
  
  const getCurrentMemories = () => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return memories.slice(startIndex, endIndex)
  }
  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

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
          Our <span className="text-primary">Some of Our Recent Memories</span>
        </h2>
        <p 
          className={`text-center text-muted-foreground mb-12 font-sans transition-all duration-1000 delay-200 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          In no particular order, just some of the moments that made our journey special. Each one holds a story that I cherish deeply.
          <br/>
          
        </p>
        
        <p 
          className={`text-center text-muted-foreground mb-12 font-sans transition-all duration-1000 delay-200 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Click on a memory to relive the moment
        </p>

        {/* Memory Gallery */}
        <div 
          className={`mb-12 transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Mobile Carousel View */}
          <div className="block sm:hidden">
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 snap-x snap-mandatory scroll-smooth">
              {memories.map((memory, index) => (
                <button
                  key={memory.id}
                  onClick={() => setSelectedMemory(memory)}
                  className="group relative flex-none w-48 aspect-square bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 snap-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {memory.image ? (
                    <Image 
                      src={memory.image} 
                      alt={memory.title}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-xs">
                      {memory.placeholder}
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-background/80 to-transparent">
                    <Heart className="w-6 h-6 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-2" />
                    <span className="font-serif text-sm text-foreground text-center">{memory.title}</span>
                    <span className="text-xs text-primary mt-1">{memory.year}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Mobile scroll hint */}
            <p className="text-center text-muted-foreground/70 text-sm mt-2">
              Swipe to see more memories →
            </p>
          </div>

          {/* Desktop Paginated View */}
          <div className="hidden sm:block">
            {/* Gallery Layout with Side Navigation */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Left Arrow */}
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`flex-shrink-0 p-3 rounded-lg border transition-all duration-300 ${
                  currentPage === 0 
                    ? 'border-border/30 text-muted-foreground/30 cursor-not-allowed' 
                    : 'border-primary/40 text-white hover:bg-primary/10 hover:border-primary'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Memory Grid */}
              <div className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[200px]">
                {getCurrentMemories().map((memory, index) => (
                  <button
                    key={memory.id}
                    onClick={() => setSelectedMemory(memory)}
                    className="group relative aspect-square bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {memory.image ? (
                      <Image 
                        src={memory.image} 
                        alt={memory.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-xs">
                        {memory.placeholder}
                      </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-background/80 to-transparent">
                      <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-2" />
                      <span className="font-serif text-sm text-foreground text-center">{memory.title}</span>
                      <span className="text-xs text-primary mt-1">{memory.year}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`flex-shrink-0 p-3 rounded-lg border transition-all duration-300 ${
                  currentPage === totalPages - 1
                    ? 'border-border/30 text-muted-foreground/30 cursor-not-allowed' 
                    : 'border-primary/40 text-white hover:bg-primary/10 hover:border-primary'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Page Indicator */}
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
            </div>
          </div>
        </div>

        <div 
          className={`flex justify-center transition-all duration-700 ${
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

      {/* Memory Modal */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/90 backdrop-blur-sm"
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-lg w-full relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="aspect-video bg-secondary/50 rounded-lg mb-4 sm:mb-6 flex items-center justify-center relative overflow-hidden">
              {selectedMemory.image ? (
                <Image 
                  src={selectedMemory.image} 
                  alt={selectedMemory.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 90vw, 640px"
                />
              ) : (
                <span className="text-muted-foreground text-sm">{selectedMemory.placeholder}</span>
              )}
            </div>
            
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-primary mb-2">{selectedMemory.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{selectedMemory.year}</p>
            <p className="font-sans text-sm sm:text-base text-foreground/90 leading-relaxed">{selectedMemory.story}</p>
          </div>
        </div>
      )}
    </section>
  )
}
