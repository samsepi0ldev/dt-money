import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Button ({ children , size = 'md', ...rest }: ButtonProps) {
  const css = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3',
    lg: 'px-8 py-4'
  }
  return (
    <button {...rest} className={`${css[size]} rounded-md bg-green-500 text- font-bold text-white hover:bg-green-400 transition-colors`}>
      {children}
    </button>
  )
}