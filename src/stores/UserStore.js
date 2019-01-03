import { action, observable } from 'mobx'
import { persist } from "mobx-persist"
import { axiosApi } from '../utils/axios'

export default class UserStore {
  @persist @observable isAuthenticated
  @persist @observable accessToken
  @persist('object') @observable currentUser

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

  @action.bound
  logout = () => {
    this.isAuthenticated = false
    this.accessToken = ''
    this.setUserInfo(null)
  }

  @action.bound
  async login(id, password) {
    const bodyFormData = new FormData()
    bodyFormData.set('id', id)
    bodyFormData.set('password', password)
    return axiosApi('/signin', 'post', bodyFormData, { headers: {'Content-Type': 'multipart/form-data' }})
      .then((res) => {
        console.log(res.headers)
        this.authenticate({ accessToken: res.headers['sipp-token'] })
      })
  }
}
