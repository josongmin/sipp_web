import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import ClipLoader from 'react-spinners/ClipLoader'
import { numberWithCommas } from '../../utils/number'
import Paging from './Paging'
import './dataTables.bootstrap4.css'

@inject('transactionStore', 'modalStore')
@observer
export default class TransactionTable extends React.Component {
  @observable pageSize
  constructor(props) {
    super(props)
    this.pageSize = props.transactionStore.pageInfo.size
  }
  render() {
    const { data = [], pageInfo, totalSize, getTrxs, filters: { order_by, order_by_type }, excelDownload, excelLoading } = this.props.transactionStore

    const rqCls = classNames({
      sorting: order_by_type !== 'request_dt' || order_by,
      sorting_asc: order_by_type === 'request_dt' && order_by === 'ASC',
      sorting_desc: order_by_type === 'request_dt' && order_by === 'DESC'
    })

    const tfCls = classNames({
      sorting: order_by_type !== 'transfer_dt' || order_by,
      sorting_asc: order_by_type === 'transfer_dt' && order_by === 'ASC',
      sorting_desc: order_by_type === 'transfer_dt' && order_by === 'DESC'
    })

    return (
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="row">
          <div className="col-sm-12 col-md-6" style={{marginTop:3}}>
            <div className="dataTables_length">
              <label>Display
                <select value={this.pageSize} onChange={(e) => this.pageSize = e.target.value} name="basic-datatable_length" aria-controls="basic-datatable" className="custom-select custom-select-sm form-control form-control-sm ml-1">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                </select> &nbsp;Products
              </label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6" style={{marginBottom:5}}>
            <div id="basic-datatable_filter" className="dataTables_filter">
              { excelLoading ?
                <span style={{ display: 'inline-block', verticalAlign: 'text-top', marginRight: 20 }}>
                  <ClipLoader size={22}
                              color={'#39afd1'}
                              sizeUnit={"px"}
                              loading={true} />
                </span> :
                <button type="button" className="mdi mdi-poll btn btn-success btn-rounded" onClick={excelDownload} style={{marginRight:3}}>
                  &nbsp;Excel
                </button>
              }
              <button type="button" className="mdi mdi-magnify btn btn-primary btn-rounded " onClick={() => getTrxs({ size: this.pageSize })} style={{ marginLeft: 5 }}>&nbsp;Search</button>
            </div>
          </div>
        </div>
        <div className="row" style={{ overflowX: 'auto' }}>
          <div className="col-sm-12">
            <table id="basic-datatable" className="table dt-responsive dataTable nowrap " style={{ width: '100%' }}>
              <thead>
              <tr>
                <th>#</th>
                <th>Trx ID</th>
                <th>Service</th>
                <th>VA No</th>
                <th>Amount</th>
                <th>User</th>
                <th>Receiver</th>
                <th>Phone</th>
                {/* <th>Description</th> */}
                <th>Bank</th>
                <th>Status</th>
                <th className={tfCls} onClick={this.handleClickSort.bind(this, 'transfer_dt')}>Order date</th>
                <th className={rqCls} onClick={this.handleClickSort.bind(this, 'request_dt')}>Payment date</th>
                
              </tr>
              </thead>
              <tbody>
              {
                data.map(datum => (
                  <TR {...datum} key={datum.no} onClick={() => this.props.modalStore.showModal('TransactionDetail', { title: datum.title, ...datum })} />
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12 col-md-5">
            <div className="dataTables_info" id="basic-datatable_info" role="status" aria-live="polite">
              {`Showing products ${((pageInfo.page - 1) * pageInfo.size) + 1} to ${((pageInfo.page - 1) * pageInfo.size) + parseInt(pageInfo.size)} of ${numberWithCommas(totalSize)}`}
            </div>
          </div>
          <div className="col-sm-12 col-md-7">
            <div className="dataTables_paginate paging_simple_numbers" id="basic-datatable_paginate">
              <Paging pageInfo={pageInfo} onChangePage={(page) => {getTrxs({ page }, true)}} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClickSort(key) {
    this.props.transactionStore.getTrxWithOrder(key)
  }
}

const TR = (props) => {
  
  const { no, service_name, service_order_id, user_name_1, user_name_2, hp, desc, bank, status, va_no, amount, req_dt, trx_dt } = props
  
  let statusBadge = '', serviceBadge = '';
  if(status === 'CANCELLED'){
    statusBadge = 'badge-danger-lighten';
  }
  else if(status === 'PAID'){
    statusBadge = 'badge-info-lighten';
  }
  else if(status === 'SETTELED'){
    statusBadge = 'badge-primary-lighten';
  }
  else if(status === 'READY'){
    statusBadge = 'badge-success-lighten';
  }
  else if(status == 'REFUNDED'){
    statusBadge = 'badge-secondary-lighten';
  }
  
  
  if(service_name === 'PAY'){
    serviceBadge = 'text-success';
  }else if(service_name === 'KREDIT'){
    serviceBadge = 'text-dark';
  }else if(service_name === 'SHOPEE'){
    serviceBadge = 'text-danger';
  }

  return (
    <tr role="row" className="odd">
      <td>{no}</td>
      
      <td onClick={props.onClick} style={{ cursor: 'pointer', color: '#727cf5' }}><span className="">{service_order_id}</span></td>
      <td><span className={`badge `+ serviceBadge}>{service_name}</span></td>
      <td>{va_no}</td>
      <td>{numberWithCommas(amount)}</td>
      <td>{user_name_1}</td>
      <td>{user_name_2}</td>
      <td>{hp}</td>
      {/* <td>{desc}</td> */}
      <td><span className="badge">{bank}</span></td>
      <td><span className={`badge ` + statusBadge }>{status}</span></td>
      <td>{trx_dt}</td>
      <td>{req_dt}</td>
      
    </tr>
  )
}
