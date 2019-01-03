import UserStore from './UserStore'
import TransactionStore from './TransactionStore'
import DashboardStore from './DashboardStore'

export const stores = {
  userStore: new UserStore(),
  transactionStore: new TransactionStore(),
  dashboardStore: new DashboardStore()
}
