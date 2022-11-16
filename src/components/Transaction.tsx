import { CalendarBlank, TagSimple, Trash, TrashSimple } from "phosphor-react"
import repo from "../lib/cache"
import { emitter } from "../page/Main"

export interface TransactionProps {
  id: string
  description: string
  transaction: number
  category: string
  createdAt: Date
}

interface Props {
  data: TransactionProps
}

export function Transaction({ data }: Props) {
  const amount = data.transaction/100
  function deleteTransaction (id: string) {
    const cache = repo('expansive-transactions')
    cache.del(id)
    emitter.emit('fetch-transactions')
  }
  return (
    <>
      <div className='hidden max-sm:flex bg-gray-600 rounded-md p-5 text-gray-200 flex-col justify-between'>
      <span className='w-[500px]'>
        {data.description}
      </span>
      <span className={`w-52 ${amount > 0 ? 'text-green-400' : 'text-red-400'} text-lg font-bold`}>
        {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
      <div className='flex justify-between mt-3 text-gray-300'>
        <span className='w-60 flex items-center gap-1'>
          <TagSimple size={16} />
          {data.category}
        </span>
        <span className='flex items-center gap-[6px]'>
          <CalendarBlank size={16} />
          {new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
    <div className='max-sm:hidden bg-gray-600 rounded-md py-5 px-8 text-gray-200 flex justify-between'>
      <span className='w-[500px] block'>
        {data.description}
      </span>
      <span className={`w-52 ${amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
      <span className='w-60'>
        {data.category}
      </span>
      <span>
        {new Date(data.createdAt).toLocaleDateString()}
      </span>
      <button onClick={() => deleteTransaction(data.id)} className='hover:text-red-400 transition-colors'>
        <Trash />
      </button>
    </div>
    </>
    
  )
}