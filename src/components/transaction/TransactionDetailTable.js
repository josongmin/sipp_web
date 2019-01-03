import React from 'react'
import { observer } from 'mobx-react'
import './dataTables.bootstrap4.css'

@observer
export default class TransactionDetailTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { data = [] } = this.props
    return (
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        <div className="row" style={{ overflowX: 'auto' }}>
          <div className="col-sm-12">
            <table id="basic-datatable" className="table dt-responsive dataTable nowrap" style={{ width: '100%' }}>
              <thead>
              <tr>
                <th>#</th>
                <th>trx id</th>
                <th>상태</th>
                <th>은행</th>
                <th>채널</th>
                <th>금액</th>
                <th>입금일시</th>
              </tr>
              </thead>
              <tbody>
              {
                data.map((datum, idx) => (
                  <TR {...datum} key={datum.no} idx={idx} />
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const TR = (props) => {
  const { no, trx_id, status, bank, channel, amount, trx_datetime, idx } = props
  return (
    <tr role="row" className={idx % 2 ? 'odd' : 'even'}>
      <td>{no}</td>
      <td>{trx_id}</td>
      <td>{status}</td>
      <td>{bank}</td>
      <td>{channel}</td>
      <td>{amount}</td>
      <td>{trx_datetime}</td>
    </tr>
  )
}
