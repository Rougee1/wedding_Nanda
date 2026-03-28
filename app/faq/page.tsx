'use client'

import Section from '@/components/Section'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import DecorativeDivider from '@/components/DecorativeDivider'
import DressCodeSlide from '@/components/DressCodeSlide'
import { config } from '@/app/config'

export default function FAQ() {
  const faqs = [
    {
      question: 'What is the dress code?',
      answer:
        'We invite you to wear elegant and refined attire. For men: suit or jacket. For women: cocktail dress or elegant outfit. Use the colour palette above: each slide shows the name and hex code so you can match your outfit.',
    },
    {
      question: 'Are children welcome?',
      answer: 'We love children, but for this occasion, we prefer an adults-only celebration. This will allow us to fully enjoy this moment together. Thank you for your understanding.',
    },
    {
      question: 'Where can I stay?',
      answer: 'Several accommodation options are available near the reception venue. We have negotiated preferential rates at the Park Hotel (5 minutes by car) and the Forest Lodge (10 minutes). You will find reservation information in your invitation. Do not hesitate to contact us if you need help.',
    },
    {
      question: 'Is there parking?',
      answer: 'Yes, free parking is available on-site. The venue has a large parking lot that can accommodate all vehicles.',
    },
    {
      question: 'What if I have food allergies?',
      answer: 'A single menu will be served to all guests. If you have a serious allergy, please contact us directly by email or phone so we can discuss it with you.',
    },
    {
      question: 'Can I take photos?',
      answer: 'We have hired a professional photographer to capture all the important moments. You are of course free to take photos, but we ask that you do not use flash during the ceremony. We will share all official photos after the event!',
    },
    {
      question: 'Will there be music?',
      answer: 'Absolutely! A DJ will animate the dance floor starting at 9 PM. If you have special music requests, feel free to let us know in the RSVP form.',
    },
    {
      question: 'How can I contact you?',
      answer: `For any additional questions, you can contact us by email at ${config.contact.email} or by phone at ${config.contact.phone}. We will be happy to help you!`,
    },
  ]

  return (
    <div className="min-h-screen">
      <Section className="text-center pt-20">
        <AnimateOnScroll>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-600 font-sans mb-4">Questions</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-bordeaux-800 mb-4 tracking-wide font-light">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            You will find here answers to the most common questions.
          </p>
          <DecorativeDivider variant="simple" className="mt-4" />
        </AnimateOnScroll>
      </Section>

      <DressCodeSlide />

      <Section>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimateOnScroll key={index} delay={index * 0.08}>
              <div className="card">
                <h2 className="text-xl md:text-2xl font-serif text-bordeaux-800 mb-3 tracking-wide">
                  {faq.question}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      <Section>
        <AnimateOnScroll>
          <div className="card bg-cream-50/80 border border-gold-200/40 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif text-bordeaux-800 mb-4 tracking-wide">
              Another question?
            </h2>
            <p className="text-gray-600 mb-4">
              Do not hesitate to contact us directly, we will be happy to answer you.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="text-xs uppercase tracking-[0.15em] text-gold-600">Email:</span>{' '}
                <a href={`mailto:${config.contact.email}`} className="text-bordeaux-700 hover:underline">
                  {config.contact.email}
                </a>
              </p>
              <p>
                <span className="text-xs uppercase tracking-[0.15em] text-gold-600">Phone:</span>{' '}
                {config.contact.phone}
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>
    </div>
  )
}
