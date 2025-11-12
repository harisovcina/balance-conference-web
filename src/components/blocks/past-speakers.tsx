'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Speaker = {
  name: string
  image: string
  slug: string
  description: string
}

export function PastSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/speakers')
      .then(res => res.json())
      .then(data => {
        if (data.speakers) {
          const formattedSpeakers: Speaker[] = data.speakers
            .filter((speaker: any) => speaker.published)
            .map((speaker: any) => ({
              name: speaker.name,
              slug: speaker.slug,
              description: speaker.shortDescription || speaker.location || '',
              // Use the image as-is from database (it's already a full URL or path)
              image: speaker.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1066&fit=crop',
            }))
          setSpeakers(formattedSpeakers)
          console.log('Loaded past speakers:', formattedSpeakers)
        }
      })
      .catch(err => console.error('Error fetching speakers:', err))
      .finally(() => setLoading(false))
  }, [])
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Past Speakers</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
              Our Sarajevo edition featured leading experts and global voices in wellbeing, leadership,
              and lifestyle innovation, offering perspectives that continue to shape our understanding
              of a balanced life.
            </p>
          </div>
          <Button asChild variant="link" className="hidden md:inline-flex">
            <Link href="/speakers" className="flex items-center gap-2">
              <span>See All Speakers</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="relative -mr-12 lg:-mr-96">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading speakers...</div>
          ) : speakers.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No speakers available yet</div>
          ) : (
            <div className="overflow-hidden rounded-4xl p-2 md:p-3">
              <InfiniteSlider gap={24} duration={60} durationOnHover={100000}>
                {speakers.map((speaker, idx) => (
                <Link
                  key={idx}
                  href={`/speakers/${speaker.slug}`}
                  aria-label={`Open profile for ${speaker.name}`}
                  className="group block"
                >
                  <figure className="relative aspect-3/4 w-[260px] overflow-hidden rounded-3xl md:w-[320px] lg:w-[360px]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/0" />
                    <figcaption className="absolute bottom-6 left-6 right-6">
                      <div className="transition-all duration-300 ease-out translate-y-2 md:group-hover:-translate-y-1">
                        <div className="text-white text-3xl font-extrabold leading-tight md:text-4xl">
                          {speaker.name}
                        </div>
                        <div className="sm-body-semibold text-white/90 mt-1 opacity-0 translate-y-2 max-h-0 overflow-hidden md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:max-h-12 transition-all duration-300 ease-out">
                          {speaker.description}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </Link>
                ))}
              </InfiniteSlider>
            </div>
          )}

          {!loading && speakers.length > 0 && (
            <>
              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-48 md:w-64 lg:w-80"
                direction="right"
                blurIntensity={1}
              />
            </>
          )}
        </div>
        <div className="mt-6 flex justify-center md:hidden">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/speakers">See All Speakers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PastSpeakers


