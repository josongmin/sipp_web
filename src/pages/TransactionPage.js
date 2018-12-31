import React from 'react'
import { observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import Select from '../components/forms/Select'
import FilterPanel from '../components/transaction/FilterPanel'

@observer
export default class TransactionPage extends React.Component {
  render() {
    return (
      <BasicLayout {...this.props}>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="form-inline">
                  <Select options={
                    [
                      {label: '전체서비스', value: 'all'},
                      {label: '33', value: '123'},
                      {label: '55', value: '345'},
                    ]
                  } />
                </form>
              </div>
              <h4 className="page-title">TRANSACTIONS</h4>
            </div>
          </div>
        </div>
        <FilterPanel />
      </BasicLayout>
    )
  }
}
