import React from 'react'
import { inject, observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import Loading from '../components/layouts/Loading'
import StatsPanel from '../components/dashboard/StatsPanel'
import DateRangePicker from '../components/forms/DateRangePicker'
import Select from '../components/forms/Select'

@inject('dashboardStore')
@observer
export default class DashboardPage extends React.Component {
  
  
  async componentDidMount() {
    this.props.dashboardStore.getAllGraph()
  }
  render() {
    const { dailyStats, monthStats, yearStats, dayGraphs, monthGraphs, yearGraphs, getDayGraph, getMonthGraph, getYearGraph, day, month, year, setDate, loading } = this.props.dashboardStore
    return (
      <BasicLayout {...this.props}>
        <h3 style={{ marginTop: 30, marginBottom:15 }}>Statistics</h3>
        <StatsPanel title={'Hourly statistics'}
                    type={'Hourly'}
                    stats={dailyStats}
                    graphs={dayGraphs}
                    onGetData={getDayGraph}
                    dateInput={
                      <div className="form-group">
                        <DateRangePicker nomb onChange={(value) => {setDate('day', value)}} value={day.format('DD MMM YYYY')} />
                      </div>
                    }
        />
        <StatsPanel title={'Daily statistics'}
                    stats={monthStats}
                    graphs={monthGraphs}
                    onGetData={getMonthGraph}
                    dateInput={
                      <div className="form-group">
                        <input className="form-control" type="month" name="month" onChange={(e) => setDate('month', e.target.value)} value={month} />
                      </div>
                    }
        />
        <StatsPanel title={'Monthly statistics'}
                    stats={yearStats}
                    graphs={yearGraphs}
                    onGetData={getYearGraph}
                    dateInput={
                      <Select options={
                        [
                          {label: '2018', value: '2018'},
                          {label: '2019', value: '2019'}
                        ]}
                              value={year}
                              nomb
                              onChange={(value) => setDate('year', value)}
                      />
                    }
        />
        <div style={{height:40}}></div>
        <Loading loading={loading} />
      </BasicLayout>
    )
  }
}
