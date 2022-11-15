import { MagnifyingGlass } from 'phosphor-react'

export function SearchButton () {
  return (
    <button className='text-green-400 font-bold border border-green-400 py-[0.875rem] px-8 max-sm:px-4 max-sm:py-4 flex gap-3 items-center justify-center rounded-md hover:text-white hover:bg-green-400 transition-colors max-sm:w-14 max-sm:h-14'>
      <MagnifyingGlass weight='bold' size={20} />
      <span className='max-sm:hidden'>Buscar</span>
    </button>
  )
}