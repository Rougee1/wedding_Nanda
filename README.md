# Wedding Invitation Website - Nanda & Partner

A warm, romantic, and religious wedding invitation website built with Next.js 14 (App Router), React, and Tailwind CSS.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Main layout with Header/Footer
│   ├── page.tsx            # Home page with Islamic greetings and Quran verse
│   ├── config.ts           # Centralized configuration
│   ├── globals.css         # Global styles + Tailwind
│   ├── info/
│   │   └── page.tsx        # Information page
│   ├── rsvp/
│   │   └── page.tsx        # RSVP form page
│   └── faq/
│       └── page.tsx        # FAQ page
├── components/
│   ├── Header.tsx          # Main navigation
│   ├── Footer.tsx          # Footer
│   ├── Section.tsx         # Reusable section component
│   └── Button.tsx          # Reusable button component
└── public/
    └── assets/
        └── images/         # Website images
```

## ⚙️ Configuration

All customizable information is in `app/config.ts`. See `CONFIGURATION.md` for more details.

## 🎨 Features

- ✅ Warm, romantic, and religious design
- ✅ Bordeaux and blossom color scheme
- ✅ Islamic greetings (Bismillah, Assalamu alaikum)
- ✅ Quran verse display (Surah Ar-Rum 30:21)
- ✅ Future-oriented phrases
- ✅ Single illustration placeholder on homepage
- ✅ Responsive (mobile-first)
- ✅ RSVP form with menu selection
- ✅ Ready for Vercel deployment

## 📝 Notes

- Configure your Formspree ID in `app/config.ts`
- Customize all content via `app/config.ts`
- Add your illustration image to the homepage


