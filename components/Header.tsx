'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { coupleName } from '@/app/config'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) return null

  const navItems = [
    { href: '/programme', label: 'Program' },
  ]

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-500"
      style={
        isHome
          ? { backgroundColor: 'rgba(5,5,8,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }
          : { backgroundColor: '#6b1a2a', borderBottom: '2px solid #5a1520' }
      }
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span
              className="text-xl md:text-2xl font-serif tracking-wider transition-colors"
              style={{ color: isHome ? 'rgba(201,168,76,0.85)' : '#f5e5b8' }}
            >
              {coupleName}
            </span>
          </Link>

          <ul className="flex items-center space-x-4 md:space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm md:text-base font-medium transition-colors"
                    style={
                      isHome
                        ? {
                            color: isActive ? 'rgba(201,168,76,0.9)' : 'rgba(255,255,255,0.55)',
                          }
                        : {
                            color: isActive ? '#fdf2e0' : '#e8d5b0',
                            borderBottom: isActive ? '2px solid #fdf2e0' : undefined,
                            paddingBottom: isActive ? '2px' : undefined,
                          }
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}
