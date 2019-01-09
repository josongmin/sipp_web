import React from 'react'
import { action, observable, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import TransactionDetail from '../transaction/TransactionDetail'
import LoginAlert from './LoginAlert'

@inject("modalStore")
@observer
export default class Modal extends React.Component {
  @observable isEnter
  constructor(props) {
    super(props)

    this.modalStore = this.props.modalStore
    this.isEnter = false

    this.handleClickModal = this.handleClickModal.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  render() {
    const { type, visible, data = {}, closeModal } = this.modalStore
    const { style, ...restData } = data || {}
    const ModalContentComponent = this.getModalComponent(type)
    return (
      <span>
        <div className={`modal fade ${visible ? 'show' : ''}`} id="bs-example-modal-lg" tabIndex="-1" role="dialog" onClick={this.handleClickModal}
             aria-labelledby="myLargeModalLabel" style={{ zIndex: visible ? 1050 : -1, display: 'block', overflowX: 'hidden', overflowY: 'auto' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <div className="modal-content" style={toJS(style)}>
              {ModalContentComponent && <ModalContentComponent onToggleModal={this.handleClickToggle} {...restData} />}
            </div>
          </div>
        </div>
        <div className={`modal-backdrop fade ${visible ? 'show' : ''}`} style={{ zIndex: visible ? 1040 : -1 }} />
      </span>
    )
  }
  handleClickModal() {
    if(!this.isEnter) this.handleClickToggle()
  }
  handleMouseLeave() {
    this.isEnter = false
  }
  handleMouseEnter() {
    this.isEnter = true
  }
  @action.bound
  handleClickToggle() {
    this.modalStore.closeModal()
  }

  getModalComponent(type) {
    switch (type) {
      case "TransactionDetail":
        return TransactionDetail
      case "LoginAlert":
        return LoginAlert
      default:
        return null
    }
  }
}
