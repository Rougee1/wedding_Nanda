import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base'
  
  const variants = {
    primary: 'bg-bordeaux-700 text-white hover:bg-bordeaux-800 shadow-premium hover:shadow-premium-lg',
    secondary: 'bg-blossom-300 text-gray-900 hover:bg-blossom-400',
    outline: 'border-2 border-bordeaux-700 text-bordeaux-700 hover:bg-bordeaux-50',
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={combinedClassName}
    >
      {children}
    </button>
  )
}


