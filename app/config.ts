/**
 * Centralized configuration for the wedding website
 * Modify the values below to personalize your site
 */

export const config = {
  // Couple information
  couple: {
    name1: 'Nanda',
    name2: 'Redoine',
    fullName: 'Nanda & Redoine',
  },

  // Event information
  event: {
    date: {
      day: 'Saturday',
      dayNumber: 11,
      month: 'April',
      year: 2026,
      fullDate: 'Saturday, April 11, 2026',
      dateISO: '2026-04-11',
    },
    time: {
      ceremony: '3:00 PM',
      reception: '6:00 PM',
    },
  },

  // Venue information
  venue: {
    name: 'Elegant Venue',
    address: {
      street: '123 Beautiful Street',
      city: 'City',
      state: 'State',
      zipCode: '12345',
      country: 'Country',
    },
    fullAddress: '123 Beautiful Street, City, State 12345',
    googleMapsUrl: 'https://maps.google.com',
    googleMapsIframe: '',
  },

  // Program
  program: [
    {
      time: '2:30 PM',
      title: 'Guest Arrival',
      description: 'Welcome drinks and music',
    },
    {
      time: '3:00 PM',
      title: 'Ceremony',
      description: 'Religious ceremony',
    },
    {
      time: '4:00 PM',
      title: 'Photography & Cocktail',
      description: 'Moment for photos and refreshments',
    },
    {
      time: '6:00 PM',
      title: 'Reception Dinner',
      description: 'Celebration dinner',
    },
    {
      time: '9:00 PM',
      title: 'Dancing',
      description: 'Music and celebration until late',
    },
  ],

  // Contact information
  contact: {
    email: 'shabrinananda027@gmail.com',
    phone: '+62 815-8619-3720',
  },

  // Google Sheets via Apps Script (see DEPLOY.md for setup instructions)
  googleSheets: {
    endpoint: 'https://script.google.com/macros/s/AKfycbxXc4vcWoovwzKnWTZ41UD-CdBnij92iuAGHbzE7eoRTeY00mUsFDZyAxjo_fuhZ7TG/exec',
  },

  /** Video file: copy to public/Assets/ for Next.js static serving */
  invitationVideo: {
    src: '/Assets/wedding-video.mp4',
  },

  dressCode: {
    title: 'Dress Code',
    slideTitle: 'Color palette',
    description:
      'We invite you to wear elegant attire in the tones below. Each shade is shown with its hexadecimal code to help you choose your outfit.',
    colors: [
      { name: 'Espresso', hex: '#3D2F28' },
      { name: 'Cabernet', hex: '#5C1F33' },
      { name: 'Mulberry', hex: '#6D3A52' },
      { name: 'Dusty Rose', hex: '#C9A9A6' },
      { name: 'Chartreuse', hex: '#B0C44A' },
      { name: 'Juniper', hex: '#5A6E64' },
      { name: 'Pistachio', hex: '#A8C090' },
      { name: 'Champagne Rose', hex: '#D4B2A3' },
    ],
  },
}

// Exported values for easy use
export const coupleName = config.couple.fullName
export const fullDate = config.event.date.fullDate
export const venueName = config.venue.name
export const venueAddress = config.venue.fullAddress

