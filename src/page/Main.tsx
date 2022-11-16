import React from 'react'
import { CaretLeft, CaretRight, ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import logoSvg from '../assets/logo.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { SearchButton } from '../components/SearchButton'
import { CreateTransaction } from '../components/CreateTransaction'
import { Transaction, TransactionProps } from '../components/Transaction'
import { useTransaction } from '../hooks/transaction'
import repo from '../lib/cache'
import { Pagination } from '../components/Pagination'
import { TransactionEmpty } from '../components/TransactionEmpty'
import { EventEmitter } from '../lib/EventEmitter'

export const emitter = new EventEmitter()

export function Main () {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { transactions, setTransactions } = useTransaction()
  const [page, setPage] = React.useState(1)

  const cache = repo('expansive-transactions')

  function fetchTransactions () {
    setTransactions(cache.get(page))
  }

  function searchHandle (e: React.FormEvent) {
    e.preventDefault()
    const option = {
      cat: 'category',
      date: 'createdAt'
    } as any
    const form = e.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form)) as any
    const [opt, query] = data.search.split(':')
    if (!query || !option[opt]) {
      alert('Voce precisa digitar a opção de pesquisa Ex: cat: pix, ou date: 11')
      return
    }
    const result = cache.find({
      option: option[opt],
      query: query.trim().toLowerCase()
    })
    setTransactions(result)
    summary.countPages = result.length / 10
  }

  const summary = React.useMemo(() => {
    const transactions = cache.get() as TransactionProps[]
    const data = transactions.reduce((acc, cur) => {
      if (cur.transaction > 0) {
        acc.income += cur.transaction
      } else {
        acc.outCome += cur.transaction
      }
      acc.total += cur.transaction
      return acc
    }, {
      income: 0,
      outCome: 0,
      total: 0,
      countPages: 0
    })
    data.income = data.income/100
    data.outCome = data.outCome/100
    data.total = data.total/100
    const countPages = cache.countPages()
    return {
      ...data,
      countPages
    }
  }, [transactions])

  emitter.on('fetch-transactions', fetchTransactions)

  React.useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.addEventListener('wheel', e => {
        e.preventDefault()
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += e.deltaY
        }
      })
    }
  }, [])
  React.useEffect(() => {
    emitter.emit('fetch-transactions')
  }, [page])
  return (
    <div className='w-full h-screen'>
        <header className='bg-gray-800 pt-10 h-[212px] max-sm:pt-8'>
          <Dialog.Root>
            <div className='px-40 max-sm:px-6 flex items-start justify-between'>
              <img src={logoSvg} alt='Imagem da logo DT Money' />
              <Dialog.Trigger asChild>
                <Button>
                  Nova translação
                </Button>
              </Dialog.Trigger>
            </div>
            <CreateTransaction refetch={emitter} />
          </Dialog.Root>
          <div ref={scrollRef} className='w-full px-40 max-sm:px-6 flex gap-4 justify-between mt-10 max-sm:overflow-hidden-scroll'>
            <div className='rounded-md bg-gray-500 px-8 py-6 w-[352px] max-sm:w-[280px] flex flex-col gap-3 max-sm:flex-shrink-0'>
              <div className='w-full flex items-center justify-between'>
                <span className='text-gray-200'>Entradas</span>
                <ArrowCircleUp size={32} className='text-green-400' />
              </div>
              <span className='font-bold text-2xl text-gray-100'>
                {summary.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <div className='rounded-md bg-gray-500 px-8 py-6 w-[352px] max-sm:w-[280px] flex flex-col gap-3 max-sm:flex-shrink-0'>
              <div className='w-full flex items-center justify-between'>
                <span className='text-gray-200'>Saídas</span>
                <ArrowCircleDown size={32} className='text-red-400' />
              </div>
              <span className='font-bold text-2xl text-gray-100'>{summary.outCome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className='rounded-md bg-green-600 px-8 py-6 w-[352px] max-sm:w-[280px] flex flex-col gap-3 max-sm:flex-shrink-0'>
              <div className='w-full flex items-center justify-between'>
                <span className='text-gray-200'>Total</span>
                <CurrencyDollar size={32} className='text-white' />
              </div>
              <span className='font-bold text-2xl text-gray-100'>{summary.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>
        </header>
        <main className='mt-32 px-40 max-sm:px-6 pb-10'>
          <form onSubmit={searchHandle} className='flex gap-4 max-sm:gap-2'>
            <Input name='search' type='text' placeholder='Ex: cat: nome da categoria, ou date: dia ou mes' />
            <SearchButton />
          </form>
          <div className='flex flex-col gap-2 max-sm:gap-3 mt-6'>
            {transactions.length
              ? transactions.map(transaction => (
                <Transaction key={transaction.id} data={transaction} />
              ))
            : <TransactionEmpty />}
          </div>
          <Pagination
            page={page}
            pages={summary.countPages}
            setPage={setPage} />
        </main>
      </div>
  )
}