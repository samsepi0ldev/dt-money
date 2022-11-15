import React from 'react';
import { createContext, ReactNode } from 'react'

import { TransactionProps } from '../components/Transaction'
import repo from '../utils/cache'

interface TransactionContextProps {
  transactions: TransactionProps[]
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>
}

export const TransactionContext = createContext<TransactionContextProps>({} as TransactionContextProps)

interface Props {
  children?: ReactNode
}

export function TransactionProvider (props: Props) {
  const [transactions, setTransactions] = React.useState<TransactionProps[]>([])

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {props.children}
    </TransactionContext.Provider>
  )
}