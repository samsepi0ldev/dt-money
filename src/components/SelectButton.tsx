import { ArrowCircleUp, ArrowCircleDown } from'phosphor-react'

interface SelectButtonProps {
  type: 'entry' | 'out'
  isActivated?: boolean
  setSelectedOption: (value: string) => void
}

export function SelectButton ({ type, isActivated = false, setSelectedOption }: SelectButtonProps) {
  const style = isActivated ? type === 'entry' ? 'text-white bg-green-600' : 'text-white bg-red-500' : 'bg-gray-600 text-gray-200'
  const iconStyle = isActivated ? 'text-white' : type === 'entry' ? 'text-green-400' : 'text-red-400'
  return (
    <button onClick={() => setSelectedOption(type)} type='button' className={`${style} py-4 px-6 w-52 rounded-md flex items-center justify-center gap-2`}>
      {type === 'entry' 
        ? <ArrowCircleDown size={24} className={iconStyle} /> 
        : <ArrowCircleUp size={24} className={iconStyle} />
      }
      {type === 'entry' ? 'Entrada' : 'Saída'}
    </button>
  )
}