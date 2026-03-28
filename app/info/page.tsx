'use client'

import Section from '@/components/Section'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import DecorativeDivider from '@/components/DecorativeDivider'
import { config, fullDate, venueName } from '@/app/config'

export default function Info() {
  return (
    <div className="min-h-screen">
      <Section className="text-center pt-20">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-600 font-sans mb-4">Details</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-bordeaux-800 mb-4 tracking-wide font-light">
            Wedding Information
          </h1>
          <DecorativeDivider variant="simple" />
        </AnimateOnScroll>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-bordeaux-800 mb-6 tracking-wide">
              Date & Venue
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-sans mb-1">Date</p>
                <p className="text-lg font-serif">{fullDate}</p>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-sans mb-1">Time</p>
                <p className="text-lg">{config.event.time}</p>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-sans mb-1">Venue</p>
                <p className="text-lg font-serif text-blossom-700">{venueName}</p>
                <p className="text-gray-600">{config.venue.fullAddress}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card">
            <h2 className="text-2xl md:text-3xl font-serif text-bordeaux-800 mb-6 tracking-wide">
              Location
            </h2>
            
            <div className="space-y-6">
              <div className="mt-6">
                <a
                  href={config.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 hover:underline transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>
    </div>
  )
}
