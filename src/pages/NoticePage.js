import React from 'react'
import { observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import StatsCard from '../components/dashboard/StatsCard'
import DateRangePicker from '../components/forms/DateRangePicker'

@observer
export default class NoticePage extends React.Component {
  render() {
    return (
      <BasicLayout {...this.props}>
        <div className="row">
          notice
        </div>
      </BasicLayout>
    )
  }
}
