/**
 * Centralized configuration for the wedding website
 * Modify the values below to personalize your site
 */

export const config = {
  couple: {
    name1: 'Nanda',
    name2: 'Redoine',
    fullName: 'Nanda & Redoine',
    groom: {
      full: 'Redoine Ben Geloune',
      parents: 'Second son of Omar Ben-Geloune and Khadija Ben-Geloune',
    },
    bride: {
      full: 'Shabrina Nanda Vitrian',
      parents: 'First daughter of Irwan Supradarma and Fauzia Syiva Savitri',
    },
  },

  event: {
    date: {
      day: 'Saturday',
      dayNumber: 11,
      month: 'April',
      year: 2026,
      fullDate: 'Saturday, April 11, 2026',
      dateISO: '2026-04-11T16:00:00+07:00',
      display: '11.04.2026',
    },
    time: '16:00 - Done',
  },

  venue: {
    name: 'The Intimate Nikkah',
    fullAddress: 'Jl. Arteri Andara Raya No. 24, Tol Desari, Pangkalan Jatibaru, Kec. Cinere, Kota Depok, Jawa Barat 16514',
    googleMapsUrl: 'https://maps.app.goo.gl/NxYAaTc9CLkiRZPf7',
  },

  contact: {
    email: 'shabrinananda027@gmail.com',
    phone: '+62 815-8619-3720',
  },

  googleSheets: {
    endpoint: 'https://script.google.com/macros/s/AKfycbxXc4vcWoovwzKnWTZ41UD-CdBnij92iuAGHbzE7eoRTeY00mUsFDZyAxjo_fuhZ7TG/exec',
  },

  invitationVideo: {
    src: '/assets/wedding-video.mp4',
  },

  dressCode: {
    title: 'Dress Code',
    groups: [
      {
        label: 'Family',
        colors: [{ name: 'Light Brown', hex: '#C4A77D' }],
      },
      {
        label: 'Friends',
        colors: [
          { name: 'Pink', hex: '#E8A0BF' },
          { name: 'Yellow', hex: '#F0D58C' },
          { name: 'Blue', hex: '#A7C7E7' },
        ],
      },
    ],
  },
}

export const coupleName = config.couple.fullName
export const fullDate = config.event.date.fullDate
export const venueName = config.venue.name
export const venueAddress = config.venue.fullAddress

