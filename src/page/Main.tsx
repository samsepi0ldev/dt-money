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
import repo from '../utils/cache'
import { Pagination } from '../components/Pagination'
import { TransactionEmpty } from '../components/TransactionEmpty'
import { EventEmitter } from '../lib/EventEmitter'

export function Main () {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { transactions, setTransactions } = useTransaction()
  const [amountEntry, setAmountEntry] = React.useState(0)
  const [amountOut, setAmountOut] = React.useState(0)
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [countPage, setCountPage] = React.useState(0)

  const cache = repo('expansive-transactions')
  const emitter = new EventEmitter()

  function fetchTransactions () {
    setTransactions(cache.get(page))
  }
  function updateScreenWithData () {
    const transactions = cache.get() as TransactionProps[]
    const entry = transactions
    .filter(transaction => transaction.transaction > 0)
    .reduce((acc, cur) => acc += cur.transaction, 0)
    const out = transactions
    .filter(transaction => transaction.transaction < 0)
    .reduce((acc, cur) => acc += cur.transaction, 0)
    setAmountEntry(entry/100)
    setAmountOut(Math.abs(out/100))
    setTotalAmount((entry + out)/100)
    setCountPage(cache.countPages())
  }

  emitter.on('fetch-transactions', fetchTransactions)
  emitter.on('update-screen', updateScreenWithData)
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
    emitter.emit('update-screen')
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
                {amountEntry.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            <div className='rounded-md bg-gray-500 px-8 py-6 w-[352px] max-sm:w-[280px] flex flex-col gap-3 max-sm:flex-shrink-0'>
              <div className='w-full flex items-center justify-between'>
                <span className='text-gray-200'>Saídas</span>
                <ArrowCircleDown size={32} className='text-red-400' />
              </div>
              <span className='font-bold text-2xl text-gray-100'>{amountOut.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className='rounded-md bg-green-600 px-8 py-6 w-[352px] max-sm:w-[280px] flex flex-col gap-3 max-sm:flex-shrink-0'>
              <div className='w-full flex items-center justify-between'>
                <span className='text-gray-200'>Total</span>
                <CurrencyDollar size={32} className='text-white' />
              </div>
              <span className='font-bold text-2xl text-gray-100'>{totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>
        </header>
        <main className='mt-32 px-40 max-sm:px-6 pb-10'>
          <div className='flex gap-4 max-sm:gap-2'>
            <Input type='text' placeholder='Busque uma transação' />
            <SearchButton />
          </div>
          <div className='flex flex-col gap-2 max-sm:gap-3 mt-6'>
            {transactions.length
              ? transactions.map(transaction => (
                <Transaction data={transaction} />
              ))
            : <TransactionEmpty />}
          </div>
          <Pagination
            page={page}
            pages={countPage}
            setPage={setPage} />
        </main>
      </div>
  )
}