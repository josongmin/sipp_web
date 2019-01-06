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
              <h4 className="header-title">기간조회</h4>
              <div className="row">
                <div className="col-md-4">
                  <Select options={[
                    {label: '요청일시 조회', value: 'request_dt_range'},
                    {label: '입금일시 조회', value: 'transfer_dt_range'}
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
                      <DateRangePicker value={filters.start_date.format('DD/MM/YYYY')} onChange={(value) => setFilters('start_date', value)} />
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
                      <Input label={'고객명'} value={filters.user_name} onChange={(value) => setFilters('user_name', value)} />
                    </div>
                    <div className="col-sm-3">
                      <Input label={'수위인명'} value={filters.receiver_name} onChange={(value) => setFilters('receiver_name', value)} />
                    </div>
                    <div className="col-sm-3">
                      <Input label={'핸드폰'} value={filters.phone} onChange={(value) => setFilters('phone', value, 'phone')} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="row">
                    <div className="col-6">
                      <Input label={'최소 금액'} value={filters.transfer_amount_range_min} onChange={(value) => setFilters('transfer_amount_range_min', value, 'number')} /><span className="row-dash" style={{ top: 36 }}>-</span>
                    </div>
                    <div className="col-6">
                      <Input label={'최대 금액'} value={filters.transfer_amount_range_max} onChange={(value) => setFilters('transfer_amount_range_max', value, 'number')} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-3">
                      <Select label={'거래은행'}
                              options={[
                                {label: '전체은행', value: ''},
                                {label: 'Mandiri', value: 'Mandiri'},
                                {label: 'BCA', value: 'BCA'},
                                {label: 'BRI', value: 'BRI'}
                                ]}
                              value={filters.bank}
                              onChange={(value) => setFilters('bank', value)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <Select label={'상태'}
                              options={[
                                {label: '전체', value: ''},
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
                      <Input label={'VA번호'} value={filters.va_no} onChange={(value) => setFilters('va_no', value, 'number')} />
                    </div>
                    <div className="col-6">
                      <Input label={'주문번호'} value={filters.service_order_id} onChange={(value) => setFilters('service_order_id', value, 'number')} />
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
