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
                <p className="text-lg">Ceremony at {config.event.time.ceremony}</p>
                <p className="text-base text-gray-600">Reception at {config.event.time.reception}</p>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-sans mb-1">Venue</p>
                <p className="text-lg font-serif text-blossom-700">{venueName}</p>
                <p className="text-gray-600">{config.venue.address.street}</p>
                <p className="text-gray-600">{config.venue.address.city}, {config.venue.address.state} {config.venue.address.zipCode}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-bordeaux-800 mb-6 tracking-wide">
              Program of the Day
            </h2>
            
            <div className="space-y-6">
              {config.program.map((event, index) => (
                <AnimateOnScroll key={index} delay={index * 0.1} direction="left">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-20 text-right">
                      <p className="text-gold-600 font-semibold font-serif">{event.time}</p>
                    </div>
                    <div className={`flex-1 border-l-2 border-gold-200 pl-4 ${index < config.program.length - 1 ? 'pb-6' : ''}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 tracking-wide">{event.title}</h3>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card">
            <h2 className="text-2xl md:text-3xl font-serif text-bordeaux-800 mb-6 tracking-wide">
              How to Reach Us
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 tracking-wide">By Car</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Free parking is available on-site. The venue is easily accessible from the main highway.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 tracking-wide">Public Transportation</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Nearest station: Central Station (15 minutes by taxi)
                </p>
              </div>
              
              <div className="mt-6">
                {config.venue.googleMapsIframe ? (
                  <div 
                    className="w-full h-64 rounded-lg overflow-hidden border border-gold-200/50"
                    dangerouslySetInnerHTML={{ __html: config.venue.googleMapsIframe }}
                  />
                ) : (
                  <div className="w-full h-64 bg-cream-50 rounded-lg flex items-center justify-center border border-gold-200/50">
                    <p className="text-gray-500 text-sm">
                      Google Maps - Replace with your iframe in config.ts
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  <a 
                    href={config.venue.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:text-gold-700 hover:underline transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>
    </div>
  )
}
