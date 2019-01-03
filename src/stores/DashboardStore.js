import { action, observable } from 'mobx'
import { axiosQueryApi } from '../utils/axios'
import moment from 'moment'

export default class DashboardStore {
  @observable dailyStats
  @observable monthStats
  @observable yearStats
  @observable day
  @observable month
  @observable year

  constructor() {
    this.stats = []
    this.day = moment().format('YYYY-MM-DD')
    this.month = moment().format('YYYY-MM')
    this.year = moment().format('YYYY')
  }

  @action.bound
  getDayGraph() {
    return axiosQueryApi('/graph/date', 'post', {
      date: this.day
    }).then((res) => {
      this.dailyStats = res.data.box_item
    })
  }

  getMonthGraph() {
    return axiosQueryApi('/graph/month', 'post', {
      month: this.month
    }).then((res) => {
      this.monthStats = res.data.box_item
    })
  }

  getYearGraph() {
    return axiosQueryApi('/graph/year', 'post', {
      year: this.year
    }).then((res) => {
      this.yearStats = res.data.box_item
    })
  }
}
