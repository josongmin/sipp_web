import { action, observable, transaction } from 'mobx'
import { persist } from "mobx-persist"
import { axiosApi } from '../utils/axios'
import { axiosApiDirect } from '../utils/axios'
import { axiosQueryApi } from '../utils/axios'
import moment from 'moment'


export default class DeveloperStore {

  @observable loading

  constructor() {

    this.loading = false
  }

  @action.bound
  async onPayment(vaNo, amount, trxDateTime) {
    if(this.loading) return null
    this.loading = true



    const bodyFormData = new FormData()
    bodyFormData.set('va_no', vaNo)
    bodyFormData.set('amount', amount)
    bodyFormData.set('trx_datetime', trxDateTime)
    return axiosApiDirect('http://124.158.132.3:10007/v1/trxs/transfer', 'post', bodyFormData, { headers: {'Content-Type': 'multipart/form-data' }})
      .then((res) => {
        ;
      })
      .finally(() => this.loading = false)

  }
}
