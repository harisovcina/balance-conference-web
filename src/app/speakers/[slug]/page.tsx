'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TopNavigation } from '@/components/blocks/top-navigation'
import BlurText from '@/components/ui/BlurText'
import DarkVeil from '@/components/ui/dark-veil'
import { HoverFooter } from '@/components/ui/hover-footer'
import GradualBlur from '@/components/ui/gradual-blur'
import { getSpeakerBySlug, type Speaker } from '@/lib/speakers'
import { Mail, Linkedin, Instagram } from 'lucide-react'
import Image from 'next/image'

interface SpeakerPageProps {
  params: Promise<{
    slug: string
  }> | {
    slug: string
  }
}

export default function SpeakerPage({ params }: SpeakerPageProps) {
  const router = useRouter()
  const [slug, setSlug] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<Speaker | null>(null)

  useEffect(() => {
    async function loadSpeaker() {
      let resolvedSlug: string
      
      if (params && typeof params === 'object' && 'then' in params) {
        // params is a Promise (Next.js 15+)
        const resolvedParams = await params
        resolvedSlug = resolvedParams.slug
      } else if (params && typeof params === 'object' && 'slug' in params) {
        // params is already resolved
        resolvedSlug = params.slug
      } else {
        return
      }

      setSlug(resolvedSlug)
      const foundSpeaker = getSpeakerBySlug(resolvedSlug)
      setSpeaker(foundSpeaker || null)

      if (!foundSpeaker) {
        router.push('/speakers')
      }
    }
    
    loadSpeaker()
  }, [params, router])

  if (!slug || !speaker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <>
      {/* GradualBlur effect for entire page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="12rem"
        strength={.5}
        divCount={4}
        opacity={1}
        zIndex={1000}
      />
      
      <TopNavigation scrollThreshold={9999999999} />
      
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

      {/* Div1: Hero Section */}
      <section 
        className="relative z-10 flex items-center pt-64"
        style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}
      >
        <div className="mx-auto max-w-6xl px-8 lg:px-12 w-full pt-4 -mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left: Speaker Image (30%) */}
            <div className="lg:col-span-3">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-balance-300/20">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right: Speaker Info (70%) */}
            <div className="lg:col-span-7 flex flex-col justify-end space-y-3">
              <h6 className="text-sm font-medium uppercase tracking-wider text-balance-200">
                Sarajevo Conference 2025 Speaker
              </h6>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                {speaker.name}
              </h1>
              <p className="text-xl md:text-2xl text-white">
                {speaker.location}
              </p>
              <p className="text-lg md:text-xl text-balance-100 max-w-2xl">
                {speaker.shortDescription}
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 pt-4">
                {speaker.social.email && (
                  <a
                    href={speaker.social.email}
                    className="w-10 h-10 rounded-full border border-balance-300/30 flex items-center justify-center text-white hover:bg-balance-300/20 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {speaker.social.linkedin && (
                  <a
                    href={speaker.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-balance-300/30 flex items-center justify-center text-white hover:bg-balance-300/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {speaker.social.instagram && (
                  <a
                    href={speaker.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-balance-300/30 flex items-center justify-center text-white hover:bg-balance-300/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Div2: Content Section */}
      <section 
        className="relative z-10 flex items-center"
        style={{ backgroundColor: 'rgba(10, 3, 27, 0.5)', backdropFilter: 'blur(12px)' }}
      >
        <div className="mx-auto max-w-6xl px-8 md:px-12 w-full py-8 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left: Quote (30%) */}
            <div className="lg:col-span-3 flex items-start">
              {speaker.quote ? (
                <BlurText
                  text={speaker.quote}
                  delay={40}
                  animateBy="words"
                  direction="top"
                  className="text-4xl md:text-5xl italic font-serif-display text-white leading-tight"
                />
              ) : (
                <div className="w-full" />
              )}
            </div>

            {/* Right: Description + Optional Quote (70%) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Biography */}
              <div className="space-y-4">
                {speaker.bio.map((paragraph, index) => (
                  <p key={index} className="text-lg text-balance-100 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Motto Section */}
              {speaker.motto && (
                <div className="pt-8 space-y-4">
                  <p className="text-lg md:text-2xl text-balance-100">
                    {speaker.motto.label}
                  </p>
                  <BlurText
                    text={speaker.motto.highlight}
                    delay={40}
                    animateBy="letters"
                    direction="top"
                    className="text-5xl italic font-serif-display md:text-5xl font-bold text-accent-gold "
                  />
                  <p className="text-lg md:text-xl text-balance-100 ">
                    {speaker.motto.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <HoverFooter />
    </>
  )
}

