import { action, observable, transaction } from 'mobx'
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
  @observable loading

  constructor() {
    this.day = moment()
    this.month = moment().format('YYYY-MM')
    this.year = moment().format('YYYY')
    this.loading = false
  }

  @action.bound
  setDate(key, value) {
    this[key] = value
  }

  async getAllGraph() {
    const [day, month, year] = await Promise.all([
      this.getDayGraph(true),
      this.getMonthGraph(true),
      this.getYearGraph(true)
    ])

    transaction(() => {
      this.dailyStats = day.box_item
      this.dayGraphs = day.graph
      this.monthStats = month.box_item
      this.monthGraphs = month.graph
      this.yearStats = year.box_item
      this.yearGraphs = year.graph
      this.loading = false
    })
  }

  @action.bound
  getDayGraph(isForce = false) {
    if(!isForce && this.loading) return null
    this.loading = true
    return axiosQueryApi('/graph/date', 'get', {
      date: this.day.format('YYYYMMDD')
    }).then((res) => {
      if(isForce) {
        return res.data
      }
      const { box_item, graph } = res.data
      this.dailyStats = box_item
      this.dayGraphs = graph
    }).finally(() => {
      if(!isForce) this.loading = false
    })
  }

  @action.bound
  getMonthGraph(isForce = false) {
    if(!isForce && this.loading) return null
    this.loading = true
    return axiosQueryApi('/graph/month', 'get', {
      month: this.month.replace('-', '')
    }).then((res) => {
      if(isForce) {
        return res.data
      }
      const { box_item, graph } = res.data
      this.monthStats = box_item
      this.monthGraphs = graph
    }).finally(() => {
      if(!isForce) this.loading = false
    })
  }

  @action.bound
  getYearGraph(isForce = false) {
    if(!isForce && this.loading) return null
    this.loading = true
    return axiosQueryApi('/graph/year', 'get', {
      year: this.year
    }).then((res) => {
      if(isForce) {
        return res.data
      }
      const { box_item, graph } = res.data
      this.yearStats = box_item
      this.yearGraphs = graph
    }).finally(() => {
      if(!isForce) this.loading = false
    })
  }
}
