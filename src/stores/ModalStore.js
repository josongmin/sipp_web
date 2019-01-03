import { action, observable } from 'mobx'

export default class ModalStore {
  @observable visible
  @observable type
  @observable data

  constructor() {
    this.visible = false
    this.type = ''
    this.data = null
  }

  @action.bound
  showModal(type, data) {
    this.visible = true
    this.type = type
    this.data = data
  }

  @action.bound
  closeModal(type) {
    this.visible = false
    this.type = type
  }
}