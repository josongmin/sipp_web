import UserStore from './UserStore'
import TransactionStore from './TransactionStore'
import DashboardStore from './DashboardStore'
import ModalStore from './ModalStore'

export const stores = {
  userStore: new UserStore(),
  transactionStore: new TransactionStore(),
  dashboardStore: new DashboardStore(),
  modalStore: new ModalStore()
}
