'use client'

import { useState, useEffect, useRef, useCallback, FormEvent, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { config } from '@/app/config'

const GOLD = '#c9a84c'
const GOLD_DIM = 'rgba(201,168,76,0.45)'
const GOLD_BORDER = 'rgba(201,168,76,0.3)'

const SLIDE_IMAGES = [
  '/assets/images/slide_1.png',
  '/assets/images/slide_2.png',
  '/assets/images/slide_3.png',
  '/assets/images/slide_4.png',
  '/assets/images/slide_5.png',
  '/assets/images/slide_6.png',
  null,
]

const BG = 'linear-gradient(-45deg, #060508, #100a12, #140c10, #0a080e)'
const TOTAL_SLIDES = 8
const COOLDOWN_MS = 700

// ─── Reusable slide wrapper ──────────────────────────────────────────────────
function SlidePanel({ children, className = '', idx, active }: { children: ReactNode; className?: string; idx: number; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (active && !seen) setSeen(true)
  }, [active, seen])

  const img = SLIDE_IMAGES[idx] ?? null

  return (
    <div
      ref={ref}
      className={`absolute inset-0 w-full h-full flex flex-col justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0" style={{ background: BG }} />
      {img && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url('${img}')`, opacity: 0.72 }}
          />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom,
              rgba(10, 5, 8, 0.15) 0%,
              rgba(10, 5, 8, 0.05) 30%,
              rgba(10, 5, 8, 0.25) 60%,
              rgba(10, 5, 8, 0.85) 100%)`,
          }} />
        </>
      )}

      <motion.div
        className="relative z-10 h-full flex flex-col justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-3 justify-center my-5">
      <div className="h-px flex-1 max-w-[60px]" style={{ background: GOLD_BORDER }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: GOLD_DIM }} />
      <div className="h-px flex-1 max-w-[60px]" style={{ background: GOLD_BORDER }} />
    </div>
  )
}

// ─── Countdown hook ──────────────────────────────────────────────────────────
function useCountdown(targetISO: string) {
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetISO).getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetISO])

  return left
}

// ─── Progress dots ───────────────────────────────────────────────────────────
function ProgressDots({ current, total, onDotClick }: { current: number; total: number; onDotClick: (i: number) => void }) {
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2.5">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotClick(i)}
          className="p-1 outline-none"
          aria-label={`Go to slide ${i + 1}`}
        >
          <motion.div
            className="rounded-full"
            animate={{
              width: i === current ? 8 : 5,
              height: i === current ? 8 : 5,
              backgroundColor: i === current ? GOLD : 'rgba(255,255,255,0.3)',
            }}
            transition={{ duration: 0.25 }}
          />
        </button>
      ))}
    </div>
  )
}

// ─── Slide 0 — Greeting ─────────────────────────────────────────────────────
function Slide0Content({ guest, onOpen }: { guest: string; onOpen: () => void }) {
  return (
    <div className="text-center px-6 max-w-lg mx-auto">
      <motion.p
        className="font-arabic text-2xl md:text-3xl leading-relaxed mb-6"
        style={{ color: GOLD }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}
      >
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </motion.p>

      <motion.p
        className="text-white/80 font-serif text-lg md:text-xl leading-relaxed mb-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {guest ? (
          <>Dear <em className="not-italic" style={{ color: GOLD }}>{guest}</em>,</>
        ) : (
          <>Dear Guest,</>
        )}
      </motion.p>

      <motion.p
        className="text-white/70 font-serif text-base md:text-lg leading-relaxed"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        We invite you to the nikkah of{' '}
        <em className="not-italic" style={{ color: GOLD }}>Redoine</em> and{' '}
        <em className="not-italic" style={{ color: GOLD }}>Nanda</em>
      </motion.p>

      <motion.button
        type="button"
        onClick={onOpen}
        className="mt-10 px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.3em] font-sans font-semibold transition-all hover:scale-105"
        style={{ backgroundColor: GOLD, color: '#0a0005' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
      >
        Open Invitation
      </motion.button>
    </div>
  )
}

// ─── Slide 1 — Names + Date + Countdown ─────────────────────────────────────
function Slide1Content() {
  const cd = useCountdown(config.event.date.dateISO)

  const unit = (val: number, label: string) => (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl md:text-4xl text-white font-light tabular-nums">{String(val).padStart(2, '0')}</span>
      <span className="text-[8px] uppercase tracking-[0.3em] mt-1" style={{ color: GOLD_DIM }}>{label}</span>
    </div>
  )

  return (
    <div className="text-center px-6 py-16 max-w-lg mx-auto">
      <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-8" style={{ color: GOLD_DIM }}>
        Save the Date
      </p>

      <h1 className="font-serif text-white font-light tracking-wide leading-none" style={{ fontSize: 'clamp(3rem, 11vw, 6rem)' }}>
        Redoine
      </h1>
      <p className="font-serif my-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: GOLD }}>&amp;</p>
      <h1 className="font-serif text-white font-light tracking-wide leading-none" style={{ fontSize: 'clamp(3rem, 11vw, 6rem)' }}>
        Nanda
      </h1>

      <Divider />

      <p className="font-serif text-xl md:text-2xl text-white/80 mt-4">{config.event.date.display}</p>

      <div className="flex justify-center gap-6 mt-8">
        {unit(cd.days, 'Days')}
        <span className="text-white/20 font-serif text-2xl self-start mt-1">:</span>
        {unit(cd.hours, 'Hours')}
        <span className="text-white/20 font-serif text-2xl self-start mt-1">:</span>
        {unit(cd.minutes, 'Min')}
        <span className="text-white/20 font-serif text-2xl self-start mt-1">:</span>
        {unit(cd.seconds, 'Sec')}
      </div>
    </div>
  )
}

// ─── Slide 2 — Surah Ar-Rum ─────────────────────────────────────────────────
function Slide2Content() {
  return (
    <div className="text-center px-6 py-16 max-w-2xl mx-auto">
      <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-6" style={{ color: GOLD_DIM }}>
        Blessing
      </p>

      <p className="font-arabic text-white/90 text-xl md:text-2xl leading-loose mb-5">
        وَمِنۡ ءَايَٰتِهِۦٓ أَنۡ خَلَقَ لَكُم مِّنۡ أَنفُسِكُمۡ أَزۡوَٰجٗا لِّتَسۡكُنُوٓاْ إِلَيۡهَا وَجَعَلَ بَيۡنَكُم مَّوَدَّةٗ وَرَحۡمَةً
      </p>

      <Divider />

      <p className="text-white/50 italic leading-relaxed text-sm md:text-base">
        &ldquo;And among His Signs is this, that He created for you wives from among yourselves, that you may find repose in them, and He has put between you affection and mercy.&rdquo;
      </p>

      <p className="font-serif text-sm mt-4" style={{ color: GOLD }}>
        — Surah Ar-Rum (30:21)
      </p>
    </div>
  )
}

// ─── Slide 3 — Full invitation with parents ──────────────────────────────────
function Slide3Content() {
  return (
    <div className="text-center px-6 py-16 max-w-lg mx-auto">
      <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-8" style={{ color: GOLD_DIM }}>
        The Nikkah Ceremony
      </p>

      <p className="text-white/75 font-serif text-base md:text-lg leading-relaxed mb-8">
        With the grace of Allah ﷻ, we are pleased to invite you to the Nikkah Ceremony of Redoine and Nanda
      </p>

      <Divider />

      <div className="mt-6">
        <h2 className="font-serif text-2xl md:text-3xl text-white font-light">{config.couple.groom.full}</h2>
        <p className="text-white/40 text-xs md:text-sm mt-1 font-sans">{config.couple.groom.parents}</p>
      </div>

      <p className="font-serif text-lg my-5" style={{ color: GOLD }}>and</p>

      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-white font-light">{config.couple.bride.full}</h2>
        <p className="text-white/40 text-xs md:text-sm mt-1 font-sans">{config.couple.bride.parents}</p>
      </div>
    </div>
  )
}

// ─── Slide 4 — Venue ─────────────────────────────────────────────────────────
function Slide4Content() {
  return (
    <div className="text-center px-6 py-16 max-w-lg mx-auto">
      <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-6" style={{ color: GOLD_DIM }}>
        Venue
      </p>

      <h2 className="font-serif text-2xl md:text-3xl text-white font-light mb-4">{config.venue.name}</h2>

      <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
        {config.venue.fullAddress}
      </p>

      <a
        href={config.venue.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-sans transition-all hover:scale-105"
        style={{ border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Open in Google Maps
      </a>

      <Divider />

      <p className="text-white/80 font-serif text-lg mt-2">
        {config.event.date.fullDate}
      </p>
      <p className="font-serif text-xl mt-2" style={{ color: GOLD }}>
        {config.event.time}
      </p>
    </div>
  )
}

// ─── Slide 5 — Dress Code ────────────────────────────────────────────────────
function Slide5Content() {
  return (
    <div className="text-center px-6 py-16 max-w-lg mx-auto">
      <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-8" style={{ color: GOLD_DIM }}>
        {config.dressCode.title}
      </p>

      {config.dressCode.groups.map((group) => (
        <div key={group.label} className="mb-8 last:mb-0">
          <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-sans mb-4">{group.label}</p>
          <div className="flex items-center justify-center gap-6">
            {group.colors.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg ring-1 ring-white/10"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-white/40">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Slide 6 — RSVP form ────────────────────────────────────────────────────
function Slide6Content({ guest }: { guest: string }) {
  const [name, setName] = useState(guest)
  const [email, setEmail] = useState('')
  const [presence, setPresence] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

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
      /* continue anyway */
    } finally {
      setSubmitting(false)
      setSent(true)
    }
  }

  const inputClass = 'w-full px-3 py-2.5 bg-white/[0.07] border border-white/[0.12] rounded-lg text-white/90 text-sm font-sans placeholder:text-white/25 outline-none focus:border-[#c9a84c]/50 transition-colors'

  return (
    <div className="px-6 py-16 max-w-md mx-auto w-full">
      <p className="text-[9px] uppercase tracking-[0.55em] font-sans mb-8 text-center" style={{ color: GOLD_DIM }}>
        RSVP
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text" required value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full name" className={inputClass}
        />
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email" className={inputClass}
        />

        <div className="grid grid-cols-2 gap-2">
          {(['yes', 'no'] as const).map(v => (
            <button
              key={v} type="button" onClick={() => setPresence(v)}
              className={`py-2.5 rounded-lg border text-xs font-sans uppercase tracking-wider transition-all ${
                presence === v
                  ? v === 'yes' ? 'border-[#c9a84c]/60 bg-[#c9a84c]/15 text-[#c9a84c]' : 'border-white/40 bg-white/10 text-white/80'
                  : 'border-white/10 bg-white/[0.04] text-white/40 hover:border-white/20'
              }`}
            >
              {v === 'yes' ? 'Joyfully Accept' : 'Respectfully Decline'}
            </button>
          ))}
        </div>

        <textarea
          value={message} onChange={e => setMessage(e.target.value)}
          placeholder="A message for the couple (optional)"
          rows={2} className={`${inputClass} resize-none`}
        />

        {sent ? (
          <div className="text-center py-3">
            <p className="text-sm font-sans" style={{ color: GOLD }}>Thank you! Your response has been recorded.</p>
          </div>
        ) : (
          <button
            type="submit" disabled={submitting || !presence}
            className="w-full py-3 rounded-lg text-[11px] uppercase tracking-[0.25em] font-sans font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: GOLD, color: '#0a0005' }}
          >
            {submitting ? 'Sending...' : 'Send my response'}
          </button>
        )}
      </form>
    </div>
  )
}

// ─── Slide 7 — Video ─────────────────────────────────────────────────────────
function Slide7Content({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [showUnmute, setShowUnmute] = useState(false)
  const [error, setError] = useState(false)

  const videoSrc = encodeURI(config.invitationVideo.src)

  useEffect(() => {
    if (!active) return
    const v = videoRef.current
    if (!v || playing) return
    v.muted = true
    v.load()
    v.play()
      .then(() => {
        setPlaying(true)
        setError(false)
        setTimeout(() => setShowUnmute(true), 1000)
      })
      .catch(() => {})
  }, [active, playing])

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = false
    setMuted(false)
    setShowUnmute(false)
  }

  const handleTap = () => {
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
    <>
      <div className="absolute inset-0 bg-black" />
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline muted preload="auto"
        src={videoSrc}
        onError={() => setError(true)}
      />

      {!playing && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <button
            type="button"
            className="flex flex-col items-center gap-4"
            onClick={handleTap}
          >
            <motion.span
              className="rounded-full p-5"
              style={{ backgroundColor: 'rgba(201,168,76,0.25)', border: `2px solid ${GOLD_BORDER}` }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24" style={{ color: GOLD }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.span>
            <span className="text-xs uppercase tracking-[0.35em] font-sans" style={{ color: 'rgba(201,168,76,0.9)' }}>
              {error ? 'Video not available — Tap to retry' : 'Tap to play'}
            </span>
          </button>
        </div>
      )}

      {showUnmute && muted && (
        <motion.button
          type="button" onClick={handleUnmute}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: GOLD }}>
            <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18L19.73 20 21 18.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-white/80">Tap to unmute</span>
        </motion.button>
      )}
    </>
  )
}

// ─── Main: transform-based full-screen slide controller ─────────────────────
export default function StoryInvitation() {
  const params = useSearchParams()
  const guest = params.get('n') ?? params.get('invite') ?? ''
  const [opened, setOpened] = useState(false)
  const [current, setCurrent] = useState(0)
  const lockRef = useRef(false)
  const touchYRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const maxSlide = opened ? TOTAL_SLIDES - 1 : 0

  const goTo = useCallback((index: number) => {
    if (lockRef.current) return
    const clamped = Math.max(0, Math.min(index, maxSlide))
    if (clamped === current) return
    lockRef.current = true
    setCurrent(clamped)
    setTimeout(() => { lockRef.current = false }, COOLDOWN_MS)
  }, [current, maxSlide])

  const goNext = useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

  // Prevent all native scroll + pull-to-refresh
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const preventScroll = (e: TouchEvent) => {
      // Allow interaction with form inputs
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      e.preventDefault()
    }

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (lockRef.current) return
      if (e.deltaY > 15) goNext()
      else if (e.deltaY < -15) goPrev()
    }

    el.addEventListener('touchmove', preventScroll, { passive: false })
    el.addEventListener('wheel', preventWheel, { passive: false })
    return () => {
      el.removeEventListener('touchmove', preventScroll)
      el.removeEventListener('wheel', preventWheel)
    }
  }, [goNext, goPrev])

  // Touch swipe detection
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchYRef.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchYRef.current === null) return
    const dy = touchYRef.current - e.changedTouches[0].clientY
    touchYRef.current = null
    if (lockRef.current) return
    if (dy > 40) goNext()
    else if (dy < -40) goPrev()
  }, [goNext, goPrev])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowUp') { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const handleOpen = useCallback(() => {
    setOpened(true)
    lockRef.current = true
    setCurrent(1)
    setTimeout(() => { lockRef.current = false }, COOLDOWN_MS)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden touch-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {opened && <ProgressDots current={current} total={TOTAL_SLIDES} onDotClick={goTo} />}

      {/* All slides stacked, only the current one is visible via translateY */}
      <div
        className="w-full transition-transform duration-700 ease-in-out"
        style={{
          height: `${TOTAL_SLIDES * 100}vh`,
          transform: `translateY(-${current * 100}vh)`,
        }}
      >
        {/* Slide 0 */}
        <div className="relative w-full h-screen">
          <SlidePanel idx={0} active={current === 0}>
            <Slide0Content guest={guest} onOpen={handleOpen} />
          </SlidePanel>
        </div>

        {/* Slides 1-6 — only rendered after open */}
        {opened ? (
          <>
            <div className="relative w-full h-screen">
              <SlidePanel idx={1} active={current === 1}><Slide1Content /></SlidePanel>
            </div>
            <div className="relative w-full h-screen">
              <SlidePanel idx={2} active={current === 2}><Slide2Content /></SlidePanel>
            </div>
            <div className="relative w-full h-screen">
              <SlidePanel idx={3} active={current === 3}><Slide3Content /></SlidePanel>
            </div>
            <div className="relative w-full h-screen">
              <SlidePanel idx={4} active={current === 4}><Slide4Content /></SlidePanel>
            </div>
            <div className="relative w-full h-screen">
              <SlidePanel idx={5} active={current === 5}><Slide5Content /></SlidePanel>
            </div>
            <div className="relative w-full h-screen">
              <SlidePanel idx={6} active={current === 6}><Slide6Content guest={guest} /></SlidePanel>
            </div>
            <div className="relative w-full h-screen">
              <div className="absolute inset-0">
                <Slide7Content active={current === 7} />
              </div>
            </div>
          </>
        ) : (
          <>
            {Array.from({ length: TOTAL_SLIDES - 1 }, (_, i) => (
              <div key={i} className="w-full h-screen" />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
