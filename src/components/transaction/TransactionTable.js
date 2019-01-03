import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { numberWithCommas } from '../../utils/number'
import Paging from './Paging'
import './dataTables.bootstrap4.css'

@inject('transactionStore')
@observer
export default class TransactionTable extends React.Component {
  @observable pageSize
  constructor(props) {
    super(props)
    this.pageSize = props.transactionStore.pageInfo.size
  }
  render() {
    const { data = [], pageInfo, totalSize, getTrxs } = this.props.transactionStore
    return (
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_length" id="basic-datatable_length">
              <label>Display
                <select value={this.pageSize} onChange={(e) => this.pageSize = e.target.value} name="basic-datatable_length" aria-controls="basic-datatable" className="custom-select custom-select-sm form-control form-control-sm">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select> products
              </label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div id="basic-datatable_filter" className="dataTables_filter">
              <button type="button" className="btn btn-success" style={{ marginRight: 5 }}>EXCEL</button>
              <button type="button" className="btn btn-danger" onClick={() => getTrxs({ size: this.pageSize })}>SEARCH</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table id="basic-datatable" className="table dt-responsive dataTable nowrap" style={{ width: '100%' }}>
              <thead>
              <tr>
                <th>번호</th>
                <th>서비스</th>
                <th>주문번호</th>
                <th>주문자</th>
                <th>리시버</th>
                <th>핸드폰</th>
                <th>주문내역</th>
                <th>은행</th>
                <th>입금상태</th>
                <th>VA</th>
                <th>금액</th>
                <th className="sorting">생성일시</th>
                <th className="sorting">입금일시</th>
              </tr>
              </thead>
              <tbody>
              {
                data.map(datum => (
                  <TR {...datum} key={datum.no} />
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-5">
            <div className="dataTables_info" id="basic-datatable_info" role="status" aria-live="polite">
              {`Showing products ${((pageInfo.page - 1) * pageInfo.size) + 1} to ${((pageInfo.page - 1) * pageInfo.size) + parseInt(pageInfo.size)} of ${numberWithCommas(totalSize)}`}
            </div>
          </div>
          <div className="col-sm-12 col-md-7">
            <div className="dataTables_paginate paging_simple_numbers" id="basic-datatable_paginate">
              <Paging pageInfo={pageInfo} onChangePage={(page) => {getTrxs({ page })}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const TR = (props) => {
  const { no, service_name, service_order_id, user_name_1, user_name_2, hp, desc, bank, status, va_no, amount, req_dt, trx_dt } = props
  return (
    <tr role="row" className="odd">
      <td>{no}</td>
      <td>{service_name}</td>
      <td>{service_order_id}</td>
      <td>{user_name_1}</td>
      <td>{user_name_2}</td>
      <td>{hp}</td>
      <td>{desc}</td>
      <td>{bank}</td>
      <td>{status}</td>
      <td>{va_no}</td>
      <td>{numberWithCommas(amount)}</td>
      <td>{req_dt}</td>
      <td>{trx_dt}</td>
    </tr>
  )
}
