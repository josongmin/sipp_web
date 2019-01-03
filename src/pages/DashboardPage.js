import React from 'react'
import { inject, observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import StatsPanel from '../components/dashboard/StatsPanel'

@inject('dashboardStore')
@observer
export default class DashboardPage extends React.Component {
  async componentDidMount() {
    this.props.dashboardStore.getDayGraph()
    this.props.dashboardStore.getMonthGraph()
    this.props.dashboardStore.getYearGraph()
  }
  render() {
    const { dailyStats, monthStats, yearStats } = this.props.dashboardStore
    return (
      <BasicLayout {...this.props}>
        <h3 style={{ marginTop: 30 }}>DASHBOARD</h3>
        <StatsPanel title={'DAILY'} stats={dailyStats} />
        <StatsPanel title={'MONTHLY'} stats={monthStats} />
        <StatsPanel title={'YEAR'} stats={yearStats} />
      </BasicLayout>
    )
  }
}
