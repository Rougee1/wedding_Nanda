# Configuration Guide

## 📝 Centralized Configuration File

All customizable information for the website is centralized in the **`app/config.ts`** file.

## 🎯 How to personalize your site

### 1. Couple Information

Modify in `app/config.ts`:

```typescript
couple: {
  name1: 'Nanda',           # First partner's name
  name2: 'Partner',         # Second partner's name
  fullName: 'Nanda & Partner', # Full name for display
}
```

### 2. Event Date and Time

```typescript
event: {
  date: {
    day: 'Saturday',
    dayNumber: 15,
    month: 'June',
    year: 2024,
    fullDate: 'Saturday, June 15, 2024', # Display format
    dateISO: '2024-06-15',               # ISO format (YYYY-MM-DD)
  },
  time: {
    ceremony: '3:00 PM',
    reception: '6:00 PM',
  },
}
```

### 3. Venue

```typescript
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
  googleMapsUrl: 'https://maps.google.com', # Link to Google Maps
  googleMapsIframe: '', # Paste your Google Maps iframe here
}
```

### 4. Program

Modify the `program` array to add/remove events:

```typescript
program: [
  {
    time: '2:30 PM',
    title: 'Guest Arrival',
    description: 'Welcome drinks and music',
  },
  // Add other events here...
]
```

### 5. Contact Information

```typescript
contact: {
  email: 'nanda.wedding@gmail.com',
  phone: '+1 (555) 123-4567',
}
```

### 6. Formspree Configuration

```typescript
formspree: {
  endpoint: 'https://formspree.io/f/YOUR_FORMSPREE_ID',
}
```

**To get your Formspree ID:**
1. Create an account on [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the provided URL (format: `https://formspree.io/f/xxxxx`)
4. Paste it in `endpoint`

## ✅ Advantages of this approach

- ✅ **One file to modify** to personalize the entire site
- ✅ **No need to search** through multiple files
- ✅ **TypeScript** helps you avoid errors
- ✅ **Easy to maintain** and update
- ✅ **Reusable** for other weddings

## 🔄 After modification

After modifying `app/config.ts`, the site will automatically update on the next reload (in development mode) or after a new build (in production).

## 📌 Quick modification example

To change the couple's names everywhere on the site, just modify:

```typescript
couple: {
  name1: 'Mary',
  name2: 'John',
  fullName: 'Mary & John',
}
```

And all files will automatically use these new values!


