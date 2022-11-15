import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input ({ ...rest }: InputProps) {
  return <input {...rest} className='flex-1 p-4 bg-gray-800 placeholder:text-gray-300 rounded-md text-gray-200 border border-transparent focus:border-green-400 outline-none' />
}