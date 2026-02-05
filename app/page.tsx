"use client"

import { useState } from "react"
import { LandingSection } from "@/components/landing-section"
import { LoveLetterSection } from "@/components/love-letter-section"
import { DatesSection } from "@/components/dates-section"
import { TransitionSection } from "@/components/transition-section"
import { ValentinesReveal } from "@/components/valentines-reveal"
import { ProposalSection } from "@/components/proposal-section"
import { CelebrationSection } from "@/components/celebration-section"
import { FinalSection } from "@/components/final-section"

type Screen = 
  | "landing" 
  | "love-letter" 
  | "dates" 
  | "transition" 
  | "valentines-reveal" 
  | "proposal" 
  | "celebration" 
  | "final"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {currentScreen === "landing" && (
        <LandingSection onContinue={() => goToScreen("love-letter")} />
      )}
      {currentScreen === "love-letter" && (
        <LoveLetterSection onContinue={() => goToScreen("dates")} />
      )}
      {currentScreen === "dates" && (
        <DatesSection onContinue={() => goToScreen("transition")} />
      )}
      {currentScreen === "transition" && (
        <TransitionSection onContinue={() => goToScreen("valentines-reveal")} />
      )}
      {currentScreen === "valentines-reveal" && (
        <ValentinesReveal onContinue={() => goToScreen("proposal")} />
      )}
      {currentScreen === "proposal" && (
        <ProposalSection onYes={() => goToScreen("celebration")} />
      )}
      {currentScreen === "celebration" && (
        <CelebrationSection onComplete={() => goToScreen("final")} />
      )}
      {currentScreen === "final" && (
        <FinalSection />
      )}
    </main>
  )
}
