import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class StatsCard extends React.Component {
  render() {
    return (
      <div className="card widget-flat">
        <div className="card-body">
          <div className="float-right">
            <i className="mdi mdi-account-multiple widget-icon"></i>
          </div>
          <h5 className="text-muted font-weight-normal mt-0" title="Number of Customers">Customers</h5>
          <h3 className="mt-3 mb-3">36,254</h3>
          <p className="mb-0 text-muted">
            <span className="text-success mr-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</span>
            <span className="text-nowrap">Since last month</span>
          </p>
        </div>
      </div>
    )
  }
}
