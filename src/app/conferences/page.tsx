'use client'

import React from 'react'
import { TopNavigation } from '@/components/blocks/top-navigation'
import BlurText from '@/components/ui/BlurText'
import DarkVeil from '@/components/ui/dark-veil'
import { HoverFooter } from '@/components/ui/hover-footer'

export default function ConferencesPage() {
  return (
    <>
      <TopNavigation />
      
      {/* DarkVeil background effect for entire page */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.0}
          scanlineIntensity={.5}
          speed={1.75}
          scanlineFrequency={1.25}
          warpAmount={0.5}
          resolutionScale={1}
        />
      </div>

      {/* Hero Section */}
      <section style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(32px)' }} className="w-full h-[50vh] relative overflow-hidden z-10">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Sarajevo Conference 2025
          </h1>
          <p className="text-2xl text-muted text-center">
            May 22, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full relative z-10">
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          {/* First paragraph - full width */}
          <div className="flex items-center py-64 px-6">
            <BlurText
              text="Around 1.75 million people in BiH show symptoms of post-traumatic stress disorder. 400,000 suffer from full PTSD. Mental health issues are rising and not just in frequency, but also in severity."
              delay={80}
              animateBy="words"
              direction="top"
              className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto"
            />
          </div>
        </div>

        {/* First paragraph section - left aligned */}
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center px-6">
            <div className="w-full max-w-2xl">
              <BlurText
                text="Fast-paced lifestyles, constant change, unstable work environments, and social media pressure are taking their toll. Balance, the kind that harmonizes physical, emotional, mental, and spiritual needs, has become essential. Without it, people feel exhausted, directionless, and insecure."
                delay={80}
                animateBy="words"
                direction="top"
                className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto"
              />
            </div>
          </div>
        </div>

        {/* Second paragraph section - right aligned */}
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center px-6">
            <div className="w-full max-w-2xl ml-auto">
              <BlurText
                text="Yet despite its importance, balance still doesn't get the attention it deserves. There's no public dialogue. No space dedicated to it."
                delay={80}
                animateBy="words"
                direction="top"
                className="text-3xl font-semibold text-balance-100 md:text-3xl leading-[1.25] break-words hyphens-auto text-right"
              />
            </div>
          </div>
        </div>

        {/* Highlighted text */}
        <div className="mx-auto" style={{ maxWidth: '1120px' }}>
          <div className="min-h-screen flex items-center px-6">
            <div className="w-full flex flex-wrap justify-center items-center gap-2">
              <BlurText
                text="That's why we created the first BiH conference dedicated to "
                delay={40}
                animateBy="letters"
                direction="top"
                className="text-6xl md:text-6xl font-light text-accent-second text-center leading-none font-serif-display"
              />
              <BlurText
                text="living in balance."
                delay={180}
                animateBy="letters"
                direction="top"
                className="text-6xl md:text-6xl font-thin text-white text-center leading-none font-serif-display"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <HoverFooter />
    </>
  )
}
