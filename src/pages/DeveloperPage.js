import React from 'react'

import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import BasicLayout from '../components/layouts/BasicLayout'
import Loading from '../components/layouts/Loading'
import maintenanceImg from '../images/maintenance.svg'
import Select from '../components/forms/Select'
import DateRangePicker from '../components/forms/DateRangePicker'

import TimePicker from '../components/forms/TimePicker'
import '../components/transaction/FileterPanel.css' 

@inject('developerStore', 'modalStore')
@observer
export default class DeveloerPage extends React.Component {
  
  @observable vaNumber
  @observable amount
  @observable trxTime
  @observable trxDate
  

  constructor(props){
    super(props);
    this.vaNumber = ''
    this.amount =''
    this.trxDate = moment()
    this.trxTime = moment()
  }

  render() {
    const { loading } = this.props.developerStore
    
    
    return (
      <BasicLayout {...this.props}>
        <div class="row justify-content-center" >
          <div class="col-12">
            <div class="page-title-box">
              <h4 class="page-title" style={{marginTop:10}}>Simulate event</h4>
            </div>
              
          </div>

          
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h4 class="header-title mt-5 mt-sm-0">1. Simulate payment</h4>
                <p class="text-muted">
                    It will invoke a payment event.
                </p>
                <div className="row">
                  <div className="col-5">
                    <label for="example-input-small">VA Number</label>
                    <input type="text" id="example-input-normal" name="example-input-normal" class="form-control" placeholder="VA Number"
                      onChange={this.handlePaymentFieldChange.bind(this, 'vaNumber')} />
                  </div>
                  <div className="col-4">
                    <label for="example-input-small">Amount</label>
                    <input type="text" id="example-input-normal" name="example-input-normal" class="form-control" placeholder="Amount" 
                      onChange={this.handlePaymentFieldChange.bind(this, 'amount')}/>
                  </div>

                 

                  <div className="col-2">
                    <label for="example-date">Submit</label><br/>
                    <button type="submit" class="btn btn-primary" onClick={this.payment}>Payment</button>
                  </div>
                
                </div>
                
              </div>
              
            </div>
            
          </div>
          
        </div>
        <Loading loading={loading} size={15} />
      </BasicLayout>
    )
  }

  @action.bound
  handlePaymentFieldChange(key, e) {
    this[key] = e.target.value
   
  }

  @action.bound
  async payment(e) {
    e.preventDefault();
    
    this.props.developerStore.onPayment(this.vaNumber, this.amount, this.trxDate + ' ' + this.trxTime)
      .catch(err => {
        if(err.response.status !== 200) {
          const { status } = err.response.data
          this.props.modalStore.showModal('LoginAlert', { msg: status.msg, style: { width: 250, margin: '0 auto' }})
        }
      })
    
  }
}
