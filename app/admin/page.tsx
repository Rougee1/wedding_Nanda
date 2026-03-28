'use client'

import { useState, useEffect } from 'react'

const PASSWORD = 'NandaRedoine'
const BASE_URL = 'https://nandaredoine.com'

const DEFAULT_MESSAGE = `Bismillahirrahmanirrahim
Assalamualaikum Warahmatullahi Wabarakatuh

Kepada Yth. Bapak/Ibu/Saudara/i,
{NAME}

Tanpa mengurangi rasa hormat, dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami yang akan diselenggarakan pada:

📅 Hari, Tanggal: Sabtu, 11 April 2026
📍 Tempat: Jati by Janan Resto: Jl. Arteri Andara Raya No. 24, Tol Desari, Kec. Cinere, Kota Depok, Jawa Barat

Terukir kesan yang dalam di hati kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada hari bahagia kami.

Detail acara dapat diakses melalui link dibawah ini:

{LINK}

Terima kasih kami sampaikan atas perhatian dan doa restu Bapak/Ibu/Saudara/i.

Kami yang berbahagia,
Redoine & Nanda
Beserta Keluarga

Wassalamualaikum Warahmatullahi Wabaarakaatuh`

type Guest = { name: string }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const [guestName, setGuestName] = useState('')
  const [guests, setGuests] = useState<Guest[]>([])
  const [justCopied, setJustCopied] = useState<string | null>(null)
  const [messageTemplate, setMessageTemplate] = useState(DEFAULT_MESSAGE)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') {
      setAuthenticated(true)
    }
    const saved = localStorage.getItem('wedding_msg_template')
    if (saved) setMessageTemplate(saved)
  }, [])

  const saveTemplate = (val: string) => {
    setMessageTemplate(val)
    localStorage.setItem('wedding_msg_template', val)
  }

  const resetTemplate = () => {
    setMessageTemplate(DEFAULT_MESSAGE)
    localStorage.removeItem('wedding_msg_template')
  }

  const login = () => {
    if (passwordInput === PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      setAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthenticated(false)
    setPasswordInput('')
  }

  const buildLink = (name: string) =>
    `${BASE_URL}/?n=${encodeURIComponent(name)}`

  const buildMessage = (name: string) => {
    const link = buildLink(name)
    return messageTemplate
      .replace(/\{NAME\}/g, name)
      .replace(/\{LINK\}/g, link)
  }

  const addGuest = () => {
    const trimmed = guestName.trim()
    if (!trimmed) return
    if (guests.some(g => g.name === trimmed)) {
      setGuestName('')
      return
    }
    setGuests(prev => [{ name: trimmed }, ...prev])
    setGuestName('')
  }

  const copyMessage = async (name: string) => {
    await navigator.clipboard.writeText(buildMessage(name))
    setJustCopied(name)
    setTimeout(() => setJustCopied(null), 2000)
  }

  const copyLink = async (name: string) => {
    await navigator.clipboard.writeText(buildLink(name))
    setJustCopied(`link-${name}`)
    setTimeout(() => setJustCopied(null), 2000)
  }

  const removeGuest = (name: string) => {
    setGuests(prev => prev.filter(g => g.name !== name))
  }

  const whatsappUrl = (name: string) => {
    const msg = encodeURIComponent(buildMessage(name))
    return `https://wa.me/?text=${msg}`
  }

  const smsUrl = (name: string) => {
    const msg = encodeURIComponent(buildMessage(name))
    return `sms:?body=${msg}`
  }

  const currentLink = guestName.trim() ? buildLink(guestName.trim()) : ''

  // ─── Login screen ──────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(-45deg, #060508, #100a12, #140c10, #0a080e)' }}>
        <div className="w-full max-w-sm">
          <p className="text-center font-arabic text-2xl mb-6" style={{ color: '#c9a84c' }}>
            ٱلسَّلَامُ عَلَيْكُمْ
          </p>
          <h1 className="text-center font-serif text-2xl text-white font-light mb-8 tracking-wide">
            Admin — Nanda & Redoine
          </h1>

          <div className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
            <label className="block text-xs uppercase tracking-[0.2em] mb-2"
              style={{ color: 'rgba(201,168,76,0.7)' }}>
              Password
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false) }}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-lg text-white text-sm font-sans outline-none transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: passwordError ? '1px solid #e05260' : '1px solid rgba(255,255,255,0.12)',
              }}
            />
            {passwordError && (
              <p className="text-xs mt-2" style={{ color: '#e05260' }}>Incorrect password.</p>
            )}
            <button
              onClick={login}
              className="w-full mt-4 py-3 rounded-lg text-sm font-sans font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#c9a84c', color: '#0a0005' }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Main admin panel ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen px-4 py-10"
      style={{ background: 'linear-gradient(-45deg, #060508, #100a12, #140c10, #0a080e)' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-arabic text-xl" style={{ color: '#c9a84c' }}>ٱلسَّلَامُ عَلَيْكُمْ</p>
            <h1 className="font-serif text-2xl text-white font-light tracking-wide mt-1">
              Invitation Generator
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-xs uppercase tracking-wider font-sans px-4 py-2 rounded-lg border transition-colors hover:border-white/30"
            style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Sign out
          </button>
        </div>

        {/* Message template editor */}
        <div className="rounded-2xl p-6 mb-6 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em]"
              style={{ color: 'rgba(201,168,76,0.7)' }}>
              Message template
            </p>
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="text-xs font-sans px-3 py-1 rounded-lg transition-colors"
              style={{ color: 'rgba(201,168,76,0.8)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              {showEditor ? 'Hide' : 'Edit'}
            </button>
          </div>

          <p className="text-white/30 text-[10px] mb-3">
            Use <span className="font-mono text-white/50">{'{NAME}'}</span> for guest name and <span className="font-mono text-white/50">{'{LINK}'}</span> for the invitation link.
          </p>

          {showEditor ? (
            <>
              <textarea
                value={messageTemplate}
                onChange={e => saveTemplate(e.target.value)}
                rows={18}
                className="w-full px-4 py-3 rounded-lg text-white/90 text-sm font-sans outline-none resize-y leading-relaxed"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
              <button
                onClick={resetTemplate}
                className="mt-2 text-xs font-sans px-3 py-1 rounded-lg transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Reset to default
              </button>
            </>
          ) : (
            <div className="px-4 py-3 rounded-lg text-white/50 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {messageTemplate.slice(0, 200)}...
            </div>
          )}
        </div>

        {/* Generator */}
        <div className="rounded-2xl p-6 mb-6 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
          <label className="block text-xs uppercase tracking-[0.2em] mb-2"
            style={{ color: 'rgba(201,168,76,0.7)' }}>
            Guest name
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addGuest()}
              placeholder="ex: Fatima, Ahmed & Sarah"
              className="flex-1 px-4 py-3 rounded-lg text-white text-sm font-sans outline-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
            <button
              onClick={addGuest}
              disabled={!guestName.trim()}
              className="px-5 py-3 rounded-lg text-sm font-sans font-semibold uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-30"
              style={{ backgroundColor: '#c9a84c', color: '#0a0005' }}
            >
              Add
            </button>
          </div>

          {/* Live preview */}
          {currentLink && (
            <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(201,168,76,0.6)' }}>
                Preview
              </p>

              <div className="px-3 py-2 rounded-lg mb-3 text-white/60 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {buildMessage(guestName.trim())}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => copyMessage(guestName.trim())}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-all"
                  style={{ backgroundColor: '#c9a84c', color: '#0a0005', fontWeight: 600 }}
                >
                  {justCopied === guestName.trim() ? '✓ Copied!' : 'Copy message'}
                </button>

                <button
                  onClick={() => copyLink(guestName.trim())}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-all"
                  style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontWeight: 600, border: '1px solid rgba(201,168,76,0.25)' }}
                >
                  {justCopied === `link-${guestName.trim()}` ? '✓ Copied!' : 'Copy link only'}
                </button>

                <a
                  href={whatsappUrl(guestName.trim())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#25D366', color: '#fff', fontWeight: 600 }}
                >
                  WhatsApp
                </a>

                <a
                  href={smsUrl(guestName.trim())}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}
                >
                  SMS
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Guest list */}
        {guests.length > 0 && (
          <div className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.2em]"
                style={{ color: 'rgba(201,168,76,0.7)' }}>
                Guest list ({guests.length})
              </p>
              <button
                onClick={() => setGuests([])}
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Clear all
              </button>
            </div>

            <div className="space-y-3">
              {guests.map(g => (
                <div key={g.name}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>

                  <div className="flex-1 min-w-0">
                    <p className="text-white font-serif text-base truncate">{g.name}</p>
                    <p className="text-white/30 text-[10px] font-mono truncate">{buildLink(g.name)}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyMessage(g.name)}
                      title="Copy full message"
                      className="px-3 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-all"
                      style={{
                        backgroundColor: justCopied === g.name ? '#4caf50' : 'rgba(201,168,76,0.15)',
                        color: justCopied === g.name ? '#fff' : '#c9a84c',
                        border: '1px solid rgba(201,168,76,0.25)',
                      }}
                    >
                      {justCopied === g.name ? '✓' : 'Copy'}
                    </button>

                    <a
                      href={whatsappUrl(g.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-opacity hover:opacity-80"
                      style={{ backgroundColor: '#25D366', color: '#fff' }}
                    >
                      WA
                    </a>

                    <button
                      onClick={() => removeGuest(g.name)}
                      className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
