import { TransactionProvider } from './lib/transaction'
import { Main } from './page/Main'


export function App() {

  return (
    <TransactionProvider>
      <Main />
    </TransactionProvider>
  )
}
