import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class StatsCard extends React.Component {
  render() {
    const { title, value1, value2, value2_arrow_type = '', hint, icon } = this.props
    return (
      <div className="card widget-flat ">
        <div className="card-body">
          <div className="float-right">
            <i className={`mdi mdi-${icon} widget-icon`} />
          </div>
          <h5 className="text-muted font-weight-normal mt-0" title="Number of Customers">{title}</h5>
          <h3 className="mt-3 mb-3">{value1}</h3>
          <p className="mb-0 text-muted">
            <span className={`text-${value2_arrow_type === 'DOWN' ? 'danger' : 'success'} text-nowrap mr-2`}><i className={`mdi mdi-arrow-${value2_arrow_type.toLowerCase()}-bold`} /> {value2}</span>
            <span className="">{hint}</span>
          </p>
        </div>
      </div>
    )
  }
}
