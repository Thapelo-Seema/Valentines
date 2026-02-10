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
    title: "Our First Date",
    year: "2020",
    story: "One of the best days of my life! I was a bit nervous, also we had a fight earlier that day and I was worried it would affect our date. But as soon as I saw you walk towards me lapha e BP garage esbhedlela, all my worries melted away. We had such a great time talking, laughing, and just being together. It was the perfect start to our journey.",
    placeholder: "First Date Photo",
    image: "/IMG_9218.jpg"
  },
  {
    id: 2,
    title: "Our First Movie Date",
    year: "2024",
    story: "We went to watch Fly Me To The Moon, and I remember how excited we were. The movie was great, but what made it special was sharing that experience with you. We laughed, we got emo during the sad scene (at least I did lol), and we held hands throughout the whole thing. It was a simple date, but it meant so much to me.",
    placeholder: "Trip Photo",
    image: "/IMG_7314.jpg"
  },
  {
    id: 3,
    title: "Nokukhanya's Birthday Dinner",
    year: "2023",
    story: "One of the most awkward nights of my life, but also one of the most memorable. I remember receiving a call from you asking if I wanted to come to your sister's birthday dinner, and boy I was so nervous. Excited under the hood, but on the outside I was shitting my pants. I remember calling Gugu and asking her what to do and stuff, and she said, 'This girl is sure about you. If she wasn't she wouldn't have even bothered to invite you. Dont overthink it. Just be yourself and have fun'. She wired me money after coz I was broke lol. When I got in Tshepiso's car, I realized there was no going back and I started sweating. But after a while, I started to relax and enjoy myself. Your family was very nice and welcoming. It was a wonderful night full of laughter, good food, and great company, and shots, lol. I'm so glad I got to be a part of it.",
    placeholder: "Birthday Photo",
    image: "/IMG_2318.jpg"
  },
  {
    id: 4,
    title: "Our First Vacation Dinner Date",
    year: "2025",
    story: "That dinner was one of the highlights of our vacation. The atmosphere was so romantic. We had such a great time talking and laughing with Thabiso and Khathu. I hate that they rushed us though. But it was a great evening.",
    placeholder: "Anniversary Photo",
    image: "/IMG_6662.jpg"
  },
  {
    id: 5,
    title: "Your Graduation Day",
    year: "2025",
    story: "I was so proud of you on this day (I always am proud of you btw). Seeing you walk across that stage to receive your DEGREE was such a special moment. It was a testament to your hard work and resilience throughout the tribulations you encountered, and being away from the love of your life for so many years. I felt honored to be there to witness it. We celebrated with a nice dinner at Spur afterwards. Thank you for letting me be a part of such an important milestone in your life.",
    placeholder: "Recent Photo",
    image: "/IMG_0704.jpg"
  },
  {
    id: 6,
    title: "Our Four Year Anniversary",
    year: "2024",
    story: "Our 4th anniversary was such a special day. We had a romantic picnic, and it was the perfect way to celebrate our love. We reminisced about all the amazing memories we've shared over the years, we talked about our hopes and dreams for the future, and did some painting. Going through the scrapbook was my highlight. I remember crying a bit while I was reading it. Thats the best gift I've ever received in my life. It was a very beautiful day that reminded me of how blessed I am to have you in my life.",
    placeholder: "Meeting Photo",
    image: "/IMG_1686.jpg"
  },
  {
    id: 7,
    title: "Our First Gold Reef City Date",
    year: "2025",
    story: "One of the least enjoyable dates we've had, but also a very memorable one. I remember how excited we were, and I ruined it by being sick lol. We had a fight at the restaurant and I felt so bad for ruining your birthday. But the day was saved by the surprise celebration I planned with your sister. That was really a special moment, and I'm glad I got to share it with you. Despite the hurdles, we had a great ending to the day and had such an amazing time together with your family and made some unforgettable memories.",
    placeholder: "Trip Photo",
    image: "/IMG_6036.jpg"
  },
  {
    id: 8,
    title: "Our Fifth Year Anniversary",
    year: "2025",
    story: "How we made it to this milestone in our relationship is a testament of God's grace and mercy, and the power of our love. A very challenging year in our relationship, days were so dark that it felt like the moon wasnt shining behind the clouds, but miraculously we made it through. I thank God for restoring our love and bringing us closer than ever. Another year of growing together, laughing together, and loving each other more deeply. Every day with you is a gift I never take for granted. Here is to many more years of us.",
    placeholder: "Anniversary Photo",
    image: "/IMG_5547.jpg"
  },
  {
    id: 9,
    title: "Our Cozy Nights In",
    year: "2025",
    story: "Some of my favourite memories are the nights we've spent together. Going to sleep next to you has been an experience I cant put in words. Each time feels like the first. Oh how I miss those days zomkipito (crying). I still have flashbacks of the banging sex we had before taking this picture. I miss those nights so much. I miss you so much.",
    placeholder: "Cozy Night Photo",
    image: "/IMG_3867 (1).jpg"
  },
  {
    id: 10,
    title: "Us This Year",
    year: "2026",
    story: "Another year of growing together, laughing together, and loving each other more deeply. Every day with you is a gift I never take for granted. Here is to many more years of us.",
    placeholder: "Recent Photo",
    image: "/IMG_8859 (1).jpg"
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
          Our <span className="text-primary">Some of Our Best Dates</span>
        </h2>
        <p 
          className={`text-center text-muted-foreground mb-12 font-sans transition-all duration-1000 delay-200 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          In no particular order, just some of the moments that made our journey special. Each one holds a story that I cherish deeply.
          <br/>
          And yes, I know there are some dates missing.
        </p>
        
        <p 
          className={`text-center text-muted-foreground mb-12 font-sans transition-all duration-1000 delay-200 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Click on a memory to relive the moment
        </p>

        {/* Paginated Memory Gallery */}
        <div 
          className={`mb-12 transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Gallery Layout with Side Navigation */}
          <div className="flex items-center gap-6">
            {/* Left Arrow */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex-shrink-0 p-3 rounded-lg border transition-all duration-300 ${
                currentPage === 0 
                  ? 'border-border/30 text-muted-foreground/30 cursor-not-allowed' 
                  : 'border-primary/40 text-primary hover:bg-primary/10 hover:border-primary'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Memory Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-[200px]">
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
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-xs">
                      {memory.placeholder}
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-background/80 to-transparent">
                    <Heart className="w-8 h-8 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-2" />
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
                  : 'border-primary/40 text-primary hover:bg-primary/10 hover:border-primary'
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
            
            <div className="aspect-video bg-secondary/50 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              {selectedMemory.image ? (
                <Image 
                  src={selectedMemory.image} 
                  alt={selectedMemory.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              ) : (
                <span className="text-muted-foreground">{selectedMemory.placeholder}</span>
              )}
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
