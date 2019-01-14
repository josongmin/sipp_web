import React from 'react'
import { observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import StatsCard from '../components/dashboard/StatsCard'
import DateRangePicker from '../components/forms/DateRangePicker'
import maintenanceImg from '../images/maintenance.svg'
@observer
export default class SchedulePage extends React.Component {
  render() {
    return (
      <BasicLayout {...this.props}>
        <div class="row justify-content-center" style={{marginTop:100}}>
            <div class="col-12">
            <div class="text-center">
              <img src={maintenanceImg} height="140" alt="File not found Image"></img>
              <h3 class="mt-4">Under Maintenance</h3>
              <p class="text-muted">We're making the system more awesome. We'll be back shortly.</p>
              <p class="text-muted">^_^</p>
            </div>
              
          </div>
        </div>
      </BasicLayout>
    )
  }
}
