"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"
import { Heart } from "lucide-react"

interface ProposalSectionProps {
  onYes: (wasDifficult: boolean) => void
}

const noResponses = [
  "I believe you made a mistake. Try again!",
  "Unfortunately, that is not an option.",
  "Are you sure? Let me ask again...",
  "Hmm, that button seems broken. Try the other one!",
  "Nice try! I said no is not an option.",
  "The 'No' button is just for decoration.",
  "I think you meant to click 'Yes'!",
  "Error 404: 'No' not found.",
]

export function ProposalSection({ onYes }: ProposalSectionProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [noMessage, setNoMessage] = useState<string | null>(null)
  const [noCount, setNoCount] = useState(0)
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const [showNoButton, setShowNoButton] = useState(true)

  const maxNoResponses = noResponses.length

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500)
    const buttonTimer = setTimeout(() => setShowButtons(true), 2000)
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleNo = () => {
    const currentIndex = noCount % noResponses.length
    setNoMessage(noResponses[currentIndex])
    const newCount = noCount + 1
    setNoCount(newCount)
    setButtonsDisabled(true)
    
    setTimeout(() => {
      setNoMessage(null)
      setButtonsDisabled(false)
      
      // Hide No button after all responses are exhausted
      if (newCount >= maxNoResponses) {
        setShowNoButton(false)
      }
    }, 2500)
  }

  const handleYes = () => {
    onYes(noCount >= maxNoResponses)
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
            So, <span className="text-primary">Puki</span>...
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
            onClick={handleYes}
            disabled={buttonsDisabled}
            className={`px-12 py-6 text-lg font-serif ${
              buttonsDisabled 
                ? 'bg-primary/50 text-white/50 cursor-not-allowed hover:bg-primary/50 hover:scale-100' 
                : 'bg-primary text-white hover:bg-primary/90 hover:scale-105'
            } transition-all duration-500`}
          >
            Yes
          </Button>
          
          {showNoButton ? (
            <Button
              onClick={handleNo}
              disabled={buttonsDisabled}
              variant="outline"
              className={`px-12 py-6 text-lg font-serif bg-transparent ${
                buttonsDisabled
                  ? 'border-muted-foreground/20 text-white/70 cursor-not-allowed hover:bg-transparent hover:text-white/70 hover:border-muted-foreground/20'
                  : 'border-muted-foreground/30 text-white hover:bg-muted/20'
              } transition-all duration-500`}
            >
              No
            </Button>
          ) : (
            <div className="px-12 py-6 text-lg font-serif text-muted-foreground/70 italic">
              Only one option left
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
