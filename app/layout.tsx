import type { Metadata } from 'next'
import { Inter, Playfair_Display, Amiri } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import FooterWrapper from '@/components/FooterWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const amiri = Amiri({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nanda & Redoine - Wedding Invitation',
  description: 'You are cordially invited to celebrate the union of Nanda & Redoine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex w-full flex-1 flex-col">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}


