interface DecorativeDividerProps {
  variant?: 'islamic' | 'floral' | 'simple'
  className?: string
}

export default function DecorativeDivider({ variant = 'islamic', className = '' }: DecorativeDividerProps) {
  if (variant === 'islamic') {
    return (
      <div className={`flex items-center justify-center my-8 ${className}`}>
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 2.98-.41 4.23-1.13-.46-.71-.9-1.49-1.3-2.33-.38.05-.77.08-1.17.08-4.41 0-8-3.59-8-8s3.59-8 8-8c.4 0 .79.03 1.17.08.4-.84.84-1.62 1.3-2.33C14.98 2.41 13.54 2 12 2z"/>
          </svg>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"></div>
            <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>
          <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
    )
  }

  if (variant === 'floral') {
    return (
      <div className={`flex items-center justify-center my-8 ${className}`}>
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-300 to-gold-400"></div>
          <div className="w-2 h-2 bg-gold-500 rotate-45"></div>
          <div className="w-20 h-px bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400"></div>
          <div className="w-2 h-2 bg-gold-500 rotate-45"></div>
          <div className="w-12 h-px bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"></div>
          <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center my-6 ${className}`}>
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
    </div>
  )
}

