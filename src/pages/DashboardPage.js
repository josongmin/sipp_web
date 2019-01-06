import React from 'react'
import { inject, observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import StatsPanel from '../components/dashboard/StatsPanel'
import DateRangePicker from '../components/forms/DateRangePicker'

@inject('dashboardStore')
@observer
export default class DashboardPage extends React.Component {
  async componentDidMount() {
    this.props.dashboardStore.getDayGraph()
    this.props.dashboardStore.getMonthGraph()
    this.props.dashboardStore.getYearGraph()
  }
  render() {
    const { dailyStats, monthStats, yearStats, getDayGraph, getMonthGraph, getYearGraph } = this.props.dashboardStore
    return (
      <BasicLayout {...this.props}>
        <h3 style={{ marginTop: 30 }}>DASHBOARD</h3>
        <StatsPanel title={'DAILY'}
                    stats={dailyStats}
                    onGetData={getDayGraph}
                    dateInput={
                      <div className="form-group">
                        <DateRangePicker nomb onChange={(value) => {}} />
                      </div>
                    }
        />
        <StatsPanel title={'MONTHLY'}
                    stats={monthStats}
                    onGetData={getMonthGraph}
                    dateInput={
                      <div className="form-group">
                        <input className="form-control" type="month" name="month" />
                      </div>
                    }
        />
        <StatsPanel title={'YEAR'}
                    stats={yearStats}
                    onGetData={getYearGraph}
                    dateInput={
                      <div className="form-group">
                        <input className="form-control" type="year" name="month" />
                      </div>
                    }
        />
      </BasicLayout>
    )
  }
}
