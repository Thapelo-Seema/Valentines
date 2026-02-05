"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"
import { Heart } from "lucide-react"

interface ProposalSectionProps {
  onYes: () => void
}

const noResponses = [
  "I believe you made a mistake. Try again!",
  "Unfortunately, that is not an option.",
  "Are you sure? Let me ask again...",
  "Hmm, that button seems broken. Try the other one!",
  "Nice try! But no is not in my vocabulary.",
  "The 'No' button is just for decoration.",
  "I think you meant to click 'Yes'!",
  "Error 404: 'No' not found.",
]

export function ProposalSection({ onYes }: ProposalSectionProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [noMessage, setNoMessage] = useState<string | null>(null)
  const [noCount, setNoCount] = useState(0)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    const buttonTimer = setTimeout(() => setShowButtons(true), 2000)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleNo = () => {
    setNoMessage(noResponses[noCount % noResponses.length])
    setNoCount(prev => prev + 1)
    setTimeout(() => setNoMessage(null), 2500)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <FloatingHearts count={12} />
      
      <div className="text-center max-w-2xl">
        <div 
          className={`transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Heart className="w-16 h-16 md:w-24 md:h-24 text-primary fill-primary mx-auto mb-8 animate-pulse" />
          
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-4">
            So, <span className="text-primary">Bhabha</span>...
          </h2>
          
          <p className="font-serif text-3xl md:text-5xl text-foreground leading-relaxed">
            Will you be my{" "}
            <span className="text-primary">Valentine</span>?
          </p>
        </div>

        {noMessage && (
          <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg animate-in fade-in zoom-in duration-300">
            <p className="font-sans text-primary">{noMessage}</p>
          </div>
        )}

        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-700 ${
            showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            onClick={onYes}
            className="px-12 py-6 text-lg font-serif bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 hover:scale-105"
          >
            Yes
          </Button>
          
          <Button
            onClick={handleNo}
            variant="outline"
            className="px-12 py-6 text-lg font-serif border-muted-foreground/30 text-muted-foreground hover:bg-muted/20 transition-all duration-500 bg-transparent"
          >
            No
          </Button>
        </div>
      </div>
    </section>
  )
}
