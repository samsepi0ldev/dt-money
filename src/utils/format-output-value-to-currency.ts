import { FormEvent } from "react"

export function maskCurrencyInput (e: FormEvent<HTMLInputElement>) {
  const input = e.target as HTMLInputElement
  let value: string | number = input.value

  value = parseInt(value.replace(/[\D]+/g, ''))
  value = (value / 100).toFixed(2) + ''
  value = value.replace('.', ',')
  value = value.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,')
  value = value.replace(/(\d)(\d{3}),/g, '$1.$2,')
  
  input.value = value
  if (value === 'NaN') input.value = ''
}
