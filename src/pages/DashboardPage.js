import React from 'react'
import { observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import StatsCard from '../components/dashboard/StatsCard'
import DateRangePicker from '../components/forms/DateRangePicker'

@observer
export default class DashboardPage extends React.Component {
  render() {
    return (
      <BasicLayout {...this.props}>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="form-inline">
                  <div className="form-group">
                    <DateRangePicker nomb />
                  </div>
                  <a href="javascript: void(0);" className="btn btn-primary ml-2">
                    <i className="mdi mdi-autorenew" />
                  </a>
                  <a href="javascript: void(0);" className="btn btn-primary ml-1">
                    <i className="mdi mdi-filter-variant" />
                  </a>
                </form>
              </div>
              <h4 className="page-title">DASHBOARD</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-5">

            <div className="row">
              <div className="col-lg-6">
                <StatsCard />
              </div>
              <div className="col-lg-6">
                <StatsCard />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <StatsCard />
              </div>
              <div className="col-lg-6">
                <StatsCard />
              </div>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="card">
              <div className="card-body">
                <div className="dropdown float-right">
                  <a href="#" className="dropdown-toggle arrow-none card-drop" data-toggle="dropdown"
                     aria-expanded="false">
                    <i className="mdi mdi-dots-vertical" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a href="javascript:void(0);" className="dropdown-item">Sales Report</a>
                    <a href="javascript:void(0);" className="dropdown-item">Export Report</a>
                    <a href="javascript:void(0);" className="dropdown-item">Profit</a>
                    <a href="javascript:void(0);" className="dropdown-item">Action</a>
                  </div>
                </div>
                <h4 className="header-title mb-3">Projections Vs Actuals</h4>

                <div style={{ height: 263 }} className="chartjs-chart">
                  <canvas id="high-performing-product"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    )
  }
}
