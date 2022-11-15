import React, { FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'


import { maskCurrencyInput } from '../utils/format-output-value-to-currency'
import { Button } from './Button'
import { Input } from './Input'
import { SelectButton } from './SelectButton'
import repo from '../utils/cache'
import { EventEmitter } from '../lib/EventEmitter'

interface Props {
  refetch: EventEmitter
}

export function CreateTransaction(props: Props) {
  const [selectedOption, setSelectedOption] = React.useState('')
  const cache = repo('expansive-transactions')

  async function createTransaction (e: FormEvent) {
    e.preventDefault()
    const formElm = e.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(formElm)) as any
    data.transaction = selectedOption === 'entry' 
      ? Number(data.transaction.replace(/[^0-9,-]/, '').replace(/[^0-9.-]/, '.')) * 100
      : -Number(data.transaction.replace(/[^0-9,-]/, '').replace(/[^0-9.-]/, '.')) * 100
    data.createdAt = new Date().toISOString()
    cache.create(data)
    props.refetch.emit('fetch-transactions')
    props.refetch.emit('update-screen')
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/75 w-full h-screen absolute inset-0 flex items-center justify-center'>
        <Dialog.Content className='max-w-lg w-full rounded-md bg-gray-700 py-10 px-12 flex flex-col gap-8 relative'>
          <Dialog.Trigger className='absolute right-6 top-6'>
            <X size={24} className='text-gray-300' />
          </Dialog.Trigger>
          <Dialog.Title className='font-bold text-gray-100 text-xl'>Nova transação</Dialog.Title>
          <form onSubmit={createTransaction} className='flex flex-col gap-4'>
            <Input name='description' type='text' placeholder='Descrição' />
            <Input name='transaction' type='text' placeholder='Preço' onInput={e => maskCurrencyInput(e)} />
            <Input name='category' type='text' placeholder='Categoria' />
            <div className='flex gap-4 mt-2'>
              <SelectButton
                setSelectedOption={setSelectedOption}
                isActivated={selectedOption === 'entry'}
                type='entry' />
              <SelectButton
                setSelectedOption={setSelectedOption}
                isActivated={selectedOption === 'out'}
                type='out' />
            </div>
            <span className='mt-2' />
            <Button type='submit'>
              Cadastrar
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}