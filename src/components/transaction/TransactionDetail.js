import React from 'react'
import { inject, observer } from 'mobx-react'
import TransactionDetailTable from './TransactionDetailTable'

@inject('transactionStore')
@observer
export default class TransactionDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.transactionStore.getTrx(this.props.sipp_order_id)
  }

  render() {
    const { transaction } = this.props.transactionStore
    if(!transaction) return null
    const { title, va_numbers, desc, sipp_order_id, amount, status, request_datetime, expiry_datetime, last_transfer_datetime, user_name, receiver_name, phone, transacions } = transaction

    return (
      <div>
        <div className="modal-header">
          <h4 className="modal-title" id="myLargeModalLabel">{title}</h4>
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onToggleModal}>×</button>
        </div>
        <div className="modal-body">
          <div className="pl-lg-4">
            <div className="mt-4">
              <h6 className="font-14">VA NUMBERS(S)</h6>
              <p>{va_numbers.split('\n').map((msg, idx) => msg ? <span style={{ display: 'block' }} key={idx}>{msg}</span> : <br key={idx}/>)}</p>
            </div>
            <div className="mt-4">
              <h6 className="font-14">DESCRIPTION</h6>
              <p>{desc}</p>
            </div>
            <div className="mt-4">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="font-14">SIPP ORDER NO</h6>
                  <p className="text-sm lh-150">{sipp_order_id}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="font-14">AMOUNT</h6>
                  <p className="text-sm lh-150">{amount}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="font-14">STATUS</h6>
                  <p className="text-sm lh-150">{status}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="font-14">REQUEST DATE/TIME</h6>
                  <p className="text-sm lh-150">{request_datetime}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="font-14">EXPIRY DATE/TIME</h6>
                  <p className="text-sm lh-150">{expiry_datetime}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="font-14">LAST TRANSFER DATE/TIME</h6>
                  <p className="text-sm lh-150">{last_transfer_datetime}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="font-14">NAME</h6>
                  <p className="text-sm lh-150">{user_name}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="font-14">RECEIVER NAME</h6>
                  <p className="text-sm lh-150">{receiver_name}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="font-14">PHONE NUMBER</h6>
                  <p className="text-sm lh-150">{phone}</p>
                </div>
              </div>
            </div>
          </div>
          <TransactionDetailTable data={transacions} />
        </div>
      </div>
    )
  }
}
