import { ReactNode } from 'react'

interface FloralDecorationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'around'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function FloralDecoration({ 
  position = 'around', 
  size = 'medium',
  className = '' 
}: FloralDecorationProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  }

  const FlowerIcon = ({ className: iconClass }: { className?: string }) => (
    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" opacity="0.6"/>
    </svg>
  )

  const StarIcon = ({ className: iconClass }: { className?: string }) => (
    <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.4"/>
    </svg>
  )

  if (position === 'around') {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div className="absolute top-0 left-0 text-gold-400">
          <FlowerIcon className={sizeClasses[size]} />
        </div>
        <div className="absolute top-0 right-0 text-gold-500">
          <StarIcon className={sizeClasses[size]} />
        </div>
        <div className="absolute bottom-0 left-0 text-gold-500">
          <StarIcon className={sizeClasses[size]} />
        </div>
        <div className="absolute bottom-0 right-0 text-gold-400">
          <FlowerIcon className={sizeClasses[size]} />
        </div>
      </div>
    )
  }

  const positionClasses = {
    'top-left': 'absolute top-0 left-0',
    'top-right': 'absolute top-0 right-0',
    'bottom-left': 'absolute bottom-0 left-0',
    'bottom-right': 'absolute bottom-0 right-0',
  }

  return (
    <div className={`${positionClasses[position]} pointer-events-none ${className}`}>
      {position.includes('left') ? (
        <FlowerIcon className={`${sizeClasses[size]} text-gold-400`} />
      ) : (
        <StarIcon className={`${sizeClasses[size]} text-gold-500`} />
      )}
    </div>
  )
}


