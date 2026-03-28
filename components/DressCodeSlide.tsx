'use client'

import AnimateOnScroll from '@/components/AnimateOnScroll'
import DecorativeDivider from '@/components/DecorativeDivider'
import { config } from '@/app/config'

export default function DressCodeSlide() {
  const { dressCode } = config

  return (
    <section className="section-padding bg-gradient-to-b from-cream-50/90 to-blossom-50/40 border-y border-gold-200/30">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-600 font-sans mb-3">
              {dressCode.title}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-bordeaux-800 tracking-wide font-light mb-4">
              {dressCode.slideTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {dressCode.description}
            </p>
            <DecorativeDivider variant="floral" className="my-6" />
          </div>
        </AnimateOnScroll>

        {/* Slides : défilement horizontal avec snap */}
        <div
          className="flex gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-4 md:scroll-px-6 [-webkit-overflow-scrolling:touch]"
          style={{ scrollbarGutter: 'stable' }}
        >
          {dressCode.colors.map((item) => (
            <article
              key={item.hex}
              className="snap-center shrink-0 w-[min(78vw,260px)] md:w-[min(28vw,220px)] rounded-2xl overflow-hidden bg-white/95 border border-gold-200/40 shadow-premium flex flex-col"
            >
              <div
                className="h-36 md:h-40 w-full shrink-0"
                style={{ backgroundColor: item.hex }}
                aria-hidden
              />
              <div className="p-4 text-center flex flex-col flex-1 justify-center">
                <h3 className="font-serif text-bordeaux-800 text-lg tracking-wide mb-1">
                  {item.name}
                </h3>
                <p className="font-mono text-sm text-gray-600 tracking-wide uppercase">
                  {item.hex}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
