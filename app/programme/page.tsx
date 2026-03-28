'use client'

import Section from '@/components/Section'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import DecorativeDivider from '@/components/DecorativeDivider'
import { config, coupleName, fullDate, venueName } from '@/app/config'

export default function Programme() {
  return (
    <div className="min-h-screen">
      <Section className="text-center pt-20">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-600 font-sans mb-4">Schedule</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-bordeaux-800 mb-4 tracking-wide font-light">
            Program of the Day
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            {coupleName} — {fullDate}
          </p>
          <DecorativeDivider variant="simple" className="mt-4" />
        </AnimateOnScroll>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card max-w-2xl mx-auto border border-gold-200/30">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-sans mb-6">{venueName}</p>
            <div className="space-y-0">
              {config.program.map((event, index) => {
                const isLast = index === config.program.length - 1
                return (
                  <AnimateOnScroll key={index} delay={index * 0.1} direction="left">
                    <div className="flex gap-6">
                      {/* Heure */}
                      <div className="flex-shrink-0 w-20 text-right pt-0.5">
                        <p className="text-sm font-serif font-semibold text-gold-600">
                          {event.time}
                        </p>
                      </div>

                      {/* Timeline line + dot */}
                      <div className={`relative flex-1 border-l-2 border-gold-200/60 pl-6 ${isLast ? 'pb-0' : 'pb-8'}`}>
                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-gold-400 ring-2 ring-white" />
                        <h3 className="font-serif text-bordeaux-800 text-lg leading-tight mb-1">
                          {event.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                )
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card bg-cream-50/80 border border-gold-200/40 text-center max-w-xl mx-auto">
            <h2 className="text-xl font-serif text-bordeaux-800 mb-3 tracking-wide">
              Any questions?
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Do not hesitate to reach out to us directly.
            </p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-gold-600">Email: </span>
                <a href={`mailto:${config.contact.email}`} className="text-bordeaux-700 hover:underline">
                  {config.contact.email}
                </a>
              </p>
              <p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-gold-600">Phone: </span>
                {config.contact.phone}
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>
    </div>
  )
}
