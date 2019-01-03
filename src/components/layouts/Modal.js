import React from 'react'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import TransactionDetail from '../transaction/TransactionDetail'

@inject("modalStore")
@observer
export default class Modal extends React.Component {
  @observable isEnter
  constructor(props) {
    super(props)

    this.modalStore = this.props.modalStore
    this.isEnter = false
  }

  render() {
    const { type, visible, data, closeModal } = this.modalStore
    const ModalContentComponent = this.getModalComponent(type)
    return (
      <span>
        <div className={`modal fade ${visible ? 'show' : ''}`} id="bs-example-modal-lg" tabIndex="-1" role="dialog" onClick={this.handleClickModal.bind(this)}
             aria-labelledby="myLargeModalLabel" style={{ zIndex: visible ? 1050 : -1, display: 'block', paddingRight: 15, overflowX: 'hidden', overflowY: 'auto' }}>
          <div className="modal-dialog modal-lg" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
            <div className="modal-content">
              {ModalContentComponent && <ModalContentComponent onToggleModal={this.handleClickToggle} {...data} />}
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
      default:
        return null
    }
  }
}
