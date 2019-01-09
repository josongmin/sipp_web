import React from 'react'
import { inject, observer } from 'mobx-react'
import Select from '../forms/Select'
import Input from '../forms/Input'
import DateRangePicker from '../forms/DateRangePicker'
import TimePicker from '../forms/TimePicker'
import './FileterPanel.css'

@inject('transactionStore')
@observer
export default class FilterPanel extends React.Component {
  render() {
    const { filters, setFilters, setDate, setRef } = this.props.transactionStore

    return (
      <div className="row filterPanel">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 >Search transaction history based on,</h5>
              <div className="row">
                <div className="col-md-4">
                  <Select options={[
                    {label: 'Date of request', value: 'request_dt_range'},
                    {label: 'Date of deposit', value: 'transfer_dt_range'}
                    ]}
                          value={filters.dt_range_type}
                          onChange={(value) => setFilters('dt_range_type', value)}
                          style={{ maxWidth: 200 }}
                  />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-xl-9">
                  <div className="row">
                    <div className="col-sm-3">
                      <DateRangePicker value={filters.start_date.format('DD/MM/YYYY')} onChange={(value) => setFilters('start_date', value)}/>
                    </div>
                    <div className="col-sm-3">
                      <TimePicker value={filters.start_date.format('h:mm A')} onChange={(time) => setFilters('start_date', filters.start_date.set({ hour: time.hour + (time.meridian === 'PM' ? 12 : 0), minute: time.minute }))} setRef={setRef.bind(this, 'start_time_ref')} /><span className="row-dash">-</span>
                    </div>
                    <div className="col-sm-3">
                      <DateRangePicker value={filters.end_date.format('DD/MM/YYYY')} onChange={(value) => setFilters('end_date', value)}/>
                    </div>
                    <div className="col-sm-3">
                      <TimePicker value={filters.end_date.format('h:mm A')} onChange={(time) => setFilters('end_date', filters.end_date.set({ hour: time.hour + (time.meridian === 'PM' ? 12 : 0), minute: time.minute }))} setRef={setRef.bind(this, 'end_time_ref')}/>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 buttons">
                  <button type="button" className="btn btn-info" style={{ marginRight: 2 }} onClick={() => setDate('1D')}>1D</button>
                  <button type="button" className="btn btn-info" style={{ marginRight: 2 }} onClick={() => setDate('3D')}>3D</button>
                  <button type="button" className="btn btn-info" style={{ marginRight: 2 }} onClick={() => setDate('1W')}>1W</button>
                  <button type="button" className="btn btn-info" style={{ marginRight: 2 }} onClick={() => setDate('1M')}>1M</button>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-3">
                      <Input label={'User name'} value={filters.user_name} onChange={(value) => setFilters('user_name', value)} />
                    </div>
                    <div className="col-sm-3">
                      <Input label={'Receiver name'} value={filters.receiver_name} onChange={(value) => setFilters('receiver_name', value)} />
                    </div>
                    <div className="col-sm-3">
                      <Input label={'Cellphone'} value={filters.phone} onChange={(value) => setFilters('phone', value, 'phone')} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="row">
                    <div className="col-6">
                      <Input label={'Amount (From)'} value={filters.transfer_amount_range_min} onChange={(value) => setFilters('transfer_amount_range_min', value, 'number')} /><span className="row-dash" style={{ top: 36 }}>-</span>
                    </div>
                    <div className="col-6">
                      <Input label={'Amount (To)'} value={filters.transfer_amount_range_max} onChange={(value) => setFilters('transfer_amount_range_max', value, 'number')} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-3">
                      <Select label={'Bank'}
                              options={[
                                {label: 'All banks', value: ''},
                                {label: 'Mandiri', value: 'Mandiri'},
                                {label: 'BCA', value: 'BCA'},
                                {label: 'BRI', value: 'BRI'}
                                ]}
                              value={filters.bank}
                              onChange={(value) => setFilters('bank', value)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Select label={'Status'}
                              options={[
                                {label: 'All status', value: ''},
                                {label: 'Confirmed', value: 'CONFIRMED'},
                                {label: 'Cancelled', value: 'CANCELLED'},
                                {label: 'Ready', value: 'READY'}
                                ]}
                              value={filters.status}
                              onChange={(value) => setFilters('status', value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="row">
                    <div className="col-6">
                      <Input label={'VA number'} value={filters.va_no} onChange={(value) => setFilters('va_no', value, 'number')} />
                    </div>
                    <div className="col-6">
                      <Input label={'Order number'} value={filters.service_order_id} onChange={(value) => setFilters('service_order_id', value, 'number')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
