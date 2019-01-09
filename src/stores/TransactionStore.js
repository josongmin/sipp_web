import { action, observable, reaction } from 'mobx'
import { axiosApi, axiosQueryApi } from '../utils/axios'
import { getPageInfo } from '../utils/page'
import moment from 'moment'

export default class TransactionStore {
  @observable data
  @observable pageInfo
  @observable totalSize
  @observable filters
  @observable transaction
  @observable loading
  @observable excelLoading
  filtersCache

  constructor() {
    this.pageInfo = {
      page: 1,
      size: 25
    }

    this.filters = {
      dt_range_type: 'request_dt_range',
      start_date: moment(),
      end_date: moment(),
      service_type: '',
      transfer_amount_range_min: '',
      transfer_amount_range_max: '',
      bank: '',
      status: '',
      user_name: '',
      receiver_name: '',
      phone: '',
      va_no: '',
      service_order_id: '',
      order_by: '',
      order_by_type: '',
    }

    this.start_time_ref = null
    this.end_time_ref = null

    this.loading = false
    this.excelLoading = false
    reaction(
      () => [this.filters.dt_range_type, `${this.filters.start_date.format('YYYYMMDDHHMM')}00-${this.filters.end_date.format('YYYYMMDDHHMM')}00`],
      ([dt_range_type, range_date]) => {
        if(dt_range_type) {
          this.filters['request_dt_range'] = ''
          this.filters['transfer_dt_range'] = ''
          this.filters[dt_range_type] = range_date
        }
      }
    )

    reaction(
      () => [this.filters.transfer_amount_range_min, this.filters.transfer_amount_range_max],
      (min, max) => {
        if(min && max) {
          this.filters['transfer_amount_range'] = `${min}-${max}`
        }
      }
    )
  }

  getFilters() {
    const obj = {
      filter_request_dt_range: this.filters.request_dt_range,
      filter_transfer_dt_range: this.filters.transfer_dt_range,
      filter_service_type: this.filters.service_type,
      filter_bank: this.filters.bank,
      filter_status: this.filters.status,
      filter_user_name: this.filters.user_name,
      filter_receiver_name: this.filters.receiver_name,
      filter_phone: this.filters.phone,
      filter_va_no: this.filters.va_no,
      filter_service_order_id: this.filters.service_order_id,
      filter_transfer_amount_range: this.filters.transfer_amount_range,
      filter_order_by: this.filters.order_by,
      filter_order_by_type: this.filters.order_by_type
    }
    cleanObj(obj)
    return obj
  }

  @action.bound
  setRef(key, ref) {
    this[key] = ref
  }

  @action.bound
  async getTrxs(data = {}, isFiltersCache = false) {
    this.loading = true
    const { page, size, ...restData } = data
    const filters = isFiltersCache ? this.filtersCache : this.getFilters()
    const params = {
      page_no: page || 1,
      page_size: size || this.pageInfo.size,
      ...restData,
      ...filters
    }
    return axiosQueryApi('/trxs', 'get', params)
      .then(res => {
        const { items, size: totalSize } = res.data.trxs
        this.data = items
        this.totalSize = totalSize
        this.pageInfo = getPageInfo(totalSize, params.page_no, params.page_size)
        this.filtersCache = filters
      })
      .finally(() => this.loading = false)
  }

  @action.bound
  async getTrx(sipp_order_id) {
    return axiosQueryApi('/trxs/' + sipp_order_id, 'get')
      .then(res => {
        this.transaction = res.data.order
      })
  }

  @action.bound
  async getTrxWithOrder(key) {
    let order = this.filters.order_by

    if(this.filters.order_by_type !== key || !order) {
      order = 'DESC'
    } else if(order === 'DESC') {
      order = 'ASC'
    } else {
      order = ''
      key = ''
    }

    this.filters.order_by = order
    this.filters.order_by_type = key
    this.filtersCache.order_by = order
    this.filtersCache.order_by_type = key

    this.getTrxs({ page: 1 }, true)
  }

  @action.bound
  setFilters(key, value, inputType) {
    if(inputType === 'number') {
      value = value.replace(/[^0-9\.]+/g, '')
      console.log(key, value, inputType)
    } else if(inputType === 'phone') {
      value = value.replace(/[^0-9\+\.]+/g, '')
    }
    this.filters[key] = value
  }

  @action.bound
  setDate(type) {
    this.setFilters('end_date', moment().endOf('date'))
    this.end_time_ref.timepicker('setTime', moment().endOf('date').format('h:mm A'))
    this.start_time_ref.timepicker('setTime', moment().startOf('date').format('h:mm A'))
    if(type === '1D') {
      this.setFilters('start_date', moment().startOf('date'))
    }
    if(type === '3D') {
      this.setFilters('start_date', moment().subtract(2, 'days').startOf('date'))
    }
    if(type === '1W') {
      this.setFilters('start_date', moment().subtract(6, 'days').startOf('date'))
    }
    if(type === '1M') {
      this.setFilters('start_date', moment().subtract(1, 'months').startOf('date'))
    }
  }

  @action.bound
  excelDownload() {
    if(this.excelLoading) return null
    this.excelLoading = true
    const params = {
      ...this.getFilters()
    }

    return axiosQueryApi('/trxs/excel/build', 'post', params)
      .then(({ data }) => {
        window.location = data.url
        const URL = window.URL || window.webkitURL
        setTimeout(() => { URL.revokeObjectURL(data.url) }, 100)
      })
      .finally(() => this.excelLoading = false)
  }
}

function cleanObj(obj) {
  let propNames = Object.getOwnPropertyNames(obj)
  for (let i = 0; i < propNames.length; i++) {
    let propName = propNames[i]
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
}
