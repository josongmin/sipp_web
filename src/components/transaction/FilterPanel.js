import React from 'react'
import { observer } from 'mobx-react'
import Select from '../forms/Select'
import Input from '../forms/Input'
import DateRangePicker from '../forms/DateRangePicker'
import TimePicker from '../forms/TimePicker'

@observer
export default class FilterPanel extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="header-title">기간조회</h4>
              <div className="row">
                <div className="col-xl-2">
                  <Select options={[]} />
                </div>
                <div className="col-xl-8">
                  <div className="row" style={{ marginLeft: -5, marginRight: -5 }}>
                    <div className="col-3"><DateRangePicker /></div>
                    <div className="col-3"><TimePicker /></div>
                    <div className="col-3"><DateRangePicker /></div>
                    <div className="col-3"><TimePicker /></div>
                  </div>
                </div>
                <div className="col-xl-2">
                  <button type="button" className="btn btn-info">1D</button>
                  <button type="button" className="btn btn-info">3D</button>
                  <button type="button" className="btn btn-info">1W</button>
                  <button type="button" className="btn btn-info">1M</button>
                </div>
              </div>
              <h4 className="header-title"></h4>
              <div className="row">
                <div className="col-3">

                </div>
                <div className="col-6"></div>
                <div className="col-3"></div>
              </div>
              <h4 className="header-title">기간조회</h4>
              <div className="row">
                <div className="col-3">

                </div>
                <div className="col-6"></div>
                <div className="col-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
