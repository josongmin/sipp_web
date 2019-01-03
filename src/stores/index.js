import UserStore from './UserStore'
import TransactionStore from './TransactionStore'

export const stores = {
  userStore: new UserStore(),
  transactionStore: new TransactionStore()
}
