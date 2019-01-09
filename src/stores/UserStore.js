import { action, observable } from 'mobx'
import { persist } from "mobx-persist"
import { axiosApi } from '../utils/axios'

export default class UserStore {
  @persist @observable isAuthenticated
  @persist @observable accessToken
  @persist('object') @observable currentUser
  @observable loading

  constructor() {
    this.isAuthenticated = null
  }
  @action
  authenticate = ({ user, accessToken }) => {
    this.isAuthenticated = true
    this.accessToken = accessToken
    this.setUserInfo(user)
  }

  @action setUserInfo = (user = {}) => {
    this.currentUser = user
  }

  @action setToken = (token) => {
    this.accessToken = token
  }

  @action.bound
  logout = () => {
    this.isAuthenticated = false
    this.accessToken = ''
    this.setUserInfo(null)
  }

  @action.bound
  async login(id, password) {
    if(this.loading) return null
    this.loading = true
    const bodyFormData = new FormData()
    bodyFormData.set('id', id)
    bodyFormData.set('password', password)
    return axiosApi('/signin', 'post', bodyFormData, { headers: {'Content-Type': 'multipart/form-data' }})
      .then((res) => {
        this.authenticate({ user: res.data.user, accessToken: res.headers['sipp-token'] })
      })
      .finally(() => this.loading = false)
  }
}
