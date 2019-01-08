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
  @observable dayGraphs
  @observable monthGraphs
  @observable yearGraphs

  constructor() {
    this.day = moment()
    this.month = moment().format('YYYY-MM')
    this.year = moment().format('YYYY')
  }

  @action.bound
  setDate(key, value) {
    this[key] = value
  }

  @action.bound
  getDayGraph() {
    return axiosQueryApi('/graph/date', 'get', {
      date: this.day.format('YYYYMMDD')
    }).then((res) => {
      const { box_item, graph } = res.data
      this.dailyStats = box_item
      this.dayGraphs = graph
    })
  }

  @action.bound
  getMonthGraph() {
    return axiosQueryApi('/graph/month', 'get', {
      month: this.month.replace('-', '')
    }).then((res) => {
      const { box_item, graph } = res.data
      this.monthStats = box_item
      this.monthGraphs = graph
    })
  }

  @action.bound
  getYearGraph() {
    return axiosQueryApi('/graph/year', 'get', {
      year: this.year
    }).then((res) => {
      const { box_item, graph } = res.data
      this.yearStats = box_item
      this.yearGraphs = graph
    })
  }
}
