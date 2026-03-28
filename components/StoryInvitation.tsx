'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { config, venueName } from '@/app/config'

const TOTAL = 6

const SLIDE_IMAGES = [
  '/assets/images/slide_1.png',
  '/assets/images/slide_2.png',
  '/assets/images/slide_3.png',
  '/assets/images/slide_4.png',
  '/assets/images/slide_5.png',
  null, // vidéo couvre tout l'écran
]

const SLIDE_GRADIENTS = [
  'linear-gradient(-45deg, #060508, #100a12, #140c10, #0a080e)',
  'linear-gradient(-45deg, #0c0608, #120a14, #0e0810, #100a0c)',
  'linear-gradient(-45deg, #07060a, #0e0a12, #100c0e, #08060c)',
  'linear-gradient(-45deg, #060508, #0e0a10, #120c0e, #08060a)',
  'linear-gradient(-45deg, #07050a, #110a10, #130c0e, #09070b)',
  'linear-gradient(-45deg, #040408, #0a080c, #0c0a0e, #060608)',
]

const t = { duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] as const }

function SlideBackground({ index }: { index: number }) {
  const img = SLIDE_IMAGES[index]
  return (
    <>
      <div
        className="absolute inset-0 slide-bg"
        style={{ background: SLIDE_GRADIENTS[index] }}
      />
      {img && (
        <>
          {/* Image décalée sous la banderole (top-16 = header mobile, md:top-20 = header desktop) */}
          <div
            className="absolute top-16 md:top-20 left-0 right-0 bottom-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url('${img}')`, opacity: 0.82 }}
          />
          {/* Dégradé : transparent jusqu'à 40%, puis assombrissement progressif */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom,
              rgba(15, 8, 12, 0.02) 0%,
              rgba(20, 10, 14, 0.05) 38%,
              rgba(25, 12, 16, 0.22) 55%,
              rgba(45, 18, 28, 0.50) 70%,
              rgba(55, 22, 32, 0.76) 85%,
              rgba(30, 12, 20, 0.93) 100%)`,
          }} />
          {/* Vignette latérale très légère */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(30, 12, 18, 0.06) 0%, transparent 20%, transparent 80%, rgba(30, 12, 18, 0.06) 100%)',
          }} />
        </>
      )}
    </>
  )
}

// ─── Slide 0 — Welcome ────────────────────────────────────────────────────────
function Slide0({ guest }: { guest: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <SlideBackground index={0} />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative text-center px-6 pb-12 md:pb-14 max-w-xl mx-auto">
        <motion.p
          className="font-arabic text-3xl md:text-4xl leading-relaxed mb-4"
          style={{ color: '#c9a84c' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
        </motion.p>

        {guest && (
          <motion.p
            className="text-white/80 font-serif text-xl md:text-2xl mb-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Dear <em className="not-italic" style={{ color: '#c9a84c' }}>{guest}</em>,
          </motion.p>
        )}

        <motion.h2
          className="text-white font-serif text-xl md:text-2xl leading-relaxed font-light mt-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: guest ? 0.9 : 0.6, duration: 0.9 }}
        >
          We are truly honored to share this blessed day with you.
          {' '}Your presence would fill our hearts with{' '}
          <em className="not-italic" style={{ color: '#c9a84c' }}>joy and gratitude</em>.
        </motion.h2>

        <motion.div
          className="mt-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" style={{ color: 'rgba(201,168,76,0.45)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <p className="text-[9px] uppercase tracking-[0.45em] font-sans" style={{ color: 'rgba(201,168,76,0.35)' }}>
            Tap to discover
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Slide 1 — The couple ─────────────────────────────────────────────────────
function Slide1() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <SlideBackground index={1} />

      <div className="relative text-center px-6 pb-10 md:pb-12">
        <motion.p
          className="text-[9px] uppercase tracking-[0.55em] font-sans mb-8"
          style={{ color: 'rgba(201,168,76,0.5)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          An invitation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="font-serif text-white font-light tracking-wide leading-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 6rem)' }}
          >
            {config.couple.name1}
          </h1>
          <p className="font-serif my-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: '#c9a84c' }}>&</p>
          <h1 className="font-serif text-white font-light tracking-wide leading-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 6rem)' }}
          >
            {config.couple.name2}
          </h1>
        </motion.div>

        <motion.p
          className="mt-8 text-white/60 font-serif text-lg md:text-xl italic"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.9 }}
        >
          joyfully invite you to celebrate their union
        </motion.p>
      </div>
    </div>
  )
}

// ─── Slide 2 — Blessing ───────────────────────────────────────────────────────
function Slide2() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <SlideBackground index={2} />

      <div className="relative text-center px-6 pb-10 md:pb-12 max-w-2xl mx-auto">
        <motion.p
          className="text-[9px] uppercase tracking-[0.55em] font-sans mb-6"
          style={{ color: 'rgba(201,168,76,0.5)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Blessing
        </motion.p>

        <motion.p
          className="font-arabic text-white/90 text-xl md:text-2xl leading-loose mb-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          وَمِنۡ ءَايَٰتِهِۦٓ أَنۡ خَلَقَ لَكُم مِّنۡ أَنفُسِكُمۡ أَزۡوَٰجٗا لِّتَسۡكُنُوٓاْ إِلَيۡهَا وَجَعَلَ بَيۡنَكُم مَّوَدَّةٗ وَرَحۡمَةً
        </motion.p>

        <motion.div
          className="flex items-center gap-3 justify-center my-5"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(201,168,76,0.35)' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: 'rgba(201,168,76,0.6)' }} />
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(201,168,76,0.35)' }} />
        </motion.div>

        <motion.p
          className="text-white/50 italic leading-relaxed text-sm md:text-base"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        >
          &ldquo;And among His Signs is this, that He created for you wives from among yourselves, that you may find repose in them, and He has put between you affection and mercy.&rdquo;
        </motion.p>

        <motion.p
          className="font-serif text-sm mt-4" style={{ color: '#c9a84c' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          — Surah Ar-Rum (30:21)
        </motion.p>
      </div>
    </div>
  )
}

// ─── Slide 3 — Dress Code ─────────────────────────────────────────────────────
function Slide3() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <SlideBackground index={3} />

      <div className="relative text-center px-6 pb-10 md:pb-12 max-w-xl mx-auto w-full">
        <motion.p
          className="text-[9px] uppercase tracking-[0.55em] font-sans mb-6"
          style={{ color: 'rgba(201,168,76,0.5)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {config.dressCode.title}
        </motion.p>

        <motion.p
          className="text-white/60 font-serif text-base md:text-lg italic mb-8"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {config.dressCode.description}
        </motion.p>

        {/* Color swatches */}
        <motion.div
          className="flex items-center justify-center gap-5 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {config.dressCode.colors.map((c, i) => (
            <motion.div
              key={c.name}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.1, duration: 0.6 }}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg ring-1 ring-white/10"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-white/40">
                {c.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Slide 4 — Night: Save the date + RSVP form ──────────────────────────────
function Slide4({ guest, onConfirmed }: { guest: string, onConfirmed: () => void }) {
  const [name, setName] = useState(guest)
  const [email, setEmail] = useState('')
  const [presence, setPresence] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await fetch(config.googleSheets.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, presence, message }),
      })
    } catch {
      // Always advance to video even if network fails
    } finally {
      setSubmitting(false)
      onConfirmed()
    }
  }

  const inputClass = 'w-full px-3 py-2.5 bg-white/[0.07] border border-white/[0.12] rounded-lg text-white/90 text-sm font-sans placeholder:text-white/25 outline-none focus:border-[#c9a84c]/50 transition-colors'

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <SlideBackground index={4} />

      <div className="relative flex-1 flex flex-col justify-end max-w-md w-full mx-auto px-6 pb-5 md:pb-7 pt-20">
        {/* Date & venue — compact */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-4" style={{ color: 'rgba(201,168,76,0.5)' }}>
            Save the date
          </p>
          <p className="font-serif text-white font-light leading-none" style={{ fontSize: 'clamp(3rem, 14vw, 5.5rem)' }}>
            {config.event.date.dayNumber}
          </p>
          <p className="font-serif text-lg mt-1" style={{ color: '#c9a84c' }}>
            {config.event.date.month} {config.event.date.year}
          </p>
          <div className="flex items-center gap-2 justify-center mt-3 mb-2">
            <div className="h-px w-8" style={{ background: 'rgba(201,168,76,0.3)' }} />
            <div className="w-1 h-1 rotate-45" style={{ backgroundColor: 'rgba(201,168,76,0.5)' }} />
            <div className="h-px w-8" style={{ background: 'rgba(201,168,76,0.3)' }} />
          </div>
          <p className="text-white/70 font-serif text-base">{venueName}</p>
          <p className="text-white/30 text-xs mt-0.5">{config.venue.fullAddress}</p>
        </motion.div>

        {/* RSVP Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <p className="text-[9px] uppercase tracking-[0.4em] font-sans text-center mb-2" style={{ color: 'rgba(201,168,76,0.45)' }}>
            Confirm your presence
          </p>

          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />

          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
          />

          {/* Presence buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPresence('yes')}
              className={`py-2.5 rounded-lg border text-xs font-sans uppercase tracking-wider transition-all ${
                presence === 'yes'
                  ? 'border-[#c9a84c]/60 bg-[#c9a84c]/15 text-[#c9a84c]'
                  : 'border-white/10 bg-white/[0.04] text-white/40 hover:border-white/20'
              }`}
            >
              Yes, with pleasure
            </button>
            <button
              type="button"
              onClick={() => setPresence('no')}
              className={`py-2.5 rounded-lg border text-xs font-sans uppercase tracking-wider transition-all ${
                presence === 'no'
                  ? 'border-white/40 bg-white/10 text-white/80'
                  : 'border-white/10 bg-white/[0.04] text-white/40 hover:border-white/20'
              }`}
            >
              No, sorry
            </button>
          </div>

          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="A message for the couple (optional)"
            rows={2}
            className={`${inputClass} resize-none`}
          />

          <button
            type="submit"
            disabled={submitting || !presence}
            className="w-full py-3 rounded-lg text-[11px] uppercase tracking-[0.25em] font-sans font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: '#c9a84c', color: '#0a0005' }}
          >
            {submitting ? 'Sending...' : 'Send my response'}
          </button>
        </motion.form>

        {/* Program link */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <Link
            href="/programme"
            className="text-[9px] uppercase tracking-[0.35em] font-sans transition-colors"
            style={{ color: 'rgba(201,168,76,0.4)' }}
            onClick={e => e.stopPropagation()}
          >
            View program
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Slide 5 — Video (unlocked after RSVP) ───────────────────────────────────
function Slide5() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [showUnmute, setShowUnmute] = useState(false)
  const [error, setError] = useState(false)

  const videoSrc = encodeURI(config.invitationVideo.src)

  const attemptPlay = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.load()
    const playPromise = v.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true)
          setError(false)
          setTimeout(() => setShowUnmute(true), 1000)
        })
        .catch(() => {
          setPlaying(false)
        })
    }
  }

  useEffect(() => {
    const timer = setTimeout(attemptPlay, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = false
    setMuted(false)
    setShowUnmute(false)
  }

  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.load()
    v.play()
      .then(() => {
        setPlaying(true)
        setError(false)
        setTimeout(() => setShowUnmute(true), 800)
      })
      .catch(() => setError(true))
  }

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-black" />

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        preload="auto"
        src={videoSrc}
        onError={() => setError(true)}
      />

      {!playing && (
        <button
          type="button"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={handleTap}
        >
          <motion.span
            className="rounded-full p-5"
            style={{ backgroundColor: 'rgba(201,168,76,0.25)', border: '2px solid rgba(201,168,76,0.4)' }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#c9a84c' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
          <span className="text-xs uppercase tracking-[0.35em] font-sans" style={{ color: 'rgba(201,168,76,0.9)' }}>
            {error ? 'Video not available — Tap to retry' : 'Tap to play'}
          </span>
        </button>
      )}

      {showUnmute && muted && (
        <motion.button
          type="button"
          onClick={handleUnmute}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(201,168,76,0.4)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#c9a84c' }}>
            <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18L19.73 20 21 18.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-white/80">Tap to unmute</span>
        </motion.button>
      )}
    </div>
  )
}

// ─── Direction-aware slide wrapper ────────────────────────────────────────────
function DirectionalSlide({ direction, children }: { direction: number, children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, x: direction > 0 ? '40%' : '-40%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? '-40%' : '40%' }}
      transition={t}
    >
      {children}
    </motion.div>
  )
}

// ─── Main container ───────────────────────────────────────────────────────────
export default function StoryInvitation() {
  const params = useSearchParams()
  const guest = params.get('n') ?? params.get('invite') ?? ''
  const slideParam = params.get('slide')
  const startSlide = slideParam === '5' ? 5 : slideParam === '4' ? 4 : slideParam === '3' ? 3 : 0

  const [slide, setSlide] = useState(startSlide)
  const [direction, setDirection] = useState(1)
  const [leftHovered, setLeftHovered] = useState(false)
  const [rightHovered, setRightHovered] = useState(false)
  const touchX = useRef<number | null>(null)

  // Slides 4 (RSVP form) and 5 (video) block click-to-advance
  const isInteractiveSlide = slide === 4 || slide === 5

  const go = (target: number) => {
    setDirection(target > slide ? 1 : -1)
    setSlide(target)
  }
  const next = () => { if (slide < 4) go(slide + 1) }
  const prev = () => { if (slide > 0) go(slide - 1) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (slide < 4) go(slide + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (slide > 0) go(slide - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) < 15) next()
    else if (dx < -50) next()
    else if (dx > 50) prev()
    touchX.current = null
  }

  const navSlides = slide >= 1 && slide <= 4

  return (
    <div
      className="story-container relative w-full overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Left nav zone — précédent */}
      {slide > 0 && !isInteractiveSlide && (
        <div
          className="absolute left-0 top-0 bottom-0 z-20 w-[30%] cursor-pointer transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.38) 0%, transparent 100%)',
            opacity: leftHovered ? 1 : 0,
          }}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
          onClick={e => { e.stopPropagation(); prev() }}
        />
      )}

      {/* Right nav zone — suivant */}
      {slide < 4 && !isInteractiveSlide && (
        <div
          className="absolute right-0 top-0 bottom-0 z-20 w-[70%] cursor-pointer transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.22) 0%, transparent 100%)',
            opacity: rightHovered ? 1 : 0,
          }}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
          onClick={e => { e.stopPropagation(); next() }}
        />
      )}

      {/* Slide 0 — clic anywhere avance */}
      {slide === 0 && (
        <div
          className="absolute inset-0 z-[19] cursor-pointer"
          onClick={next}
        />
      )}

      {/* Progress pills — slides 1–4 */}
      {navSlides && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {Array.from({ length: 4 }, (_, i) => {
            const pillIndex = i + 1
            return (
              <motion.div
                key={i}
                className="h-1.5 rounded-full"
                animate={{
                  width: pillIndex <= slide ? '1.5rem' : '0.375rem',
                  opacity: pillIndex <= slide ? 0.85 : 0.25,
                }}
                transition={{ duration: 0.4 }}
                style={{ backgroundColor: '#ffffff' }}
              />
            )
          })}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <DirectionalSlide key={slide} direction={direction}>
          {slide === 0 && <Slide0 guest={guest} />}
          {slide === 1 && <Slide1 />}
          {slide === 2 && <Slide2 />}
          {slide === 3 && <Slide3 />}
          {slide === 4 && <Slide4 guest={guest} onConfirmed={() => go(5)} />}
          {slide === 5 && <Slide5 />}
        </DirectionalSlide>
      </AnimatePresence>

      {/* Hint flèche gauche visible au survol de la zone gauche */}
      {slide > 0 && !isInteractiveSlide && (
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 z-25 pointer-events-none transition-opacity duration-300"
          style={{ opacity: leftHovered ? 0.7 : 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 6L9 14L17 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Hint flèche droite visible au survol de la zone droite */}
      {slide < 4 && !isInteractiveSlide && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 z-25 pointer-events-none transition-opacity duration-300"
          style={{ opacity: rightHovered ? 0.7 : 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M11 6L19 14L11 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}
