import { useContext } from 'react'

import { TransactionContext } from '../lib/transaction'

export function useTransaction () {
  return useContext(TransactionContext)
}
