import React from 'react'
import { inject, observer } from 'mobx-react'
import BasicLayout from '../components/layouts/BasicLayout'
import Select from '../components/forms/Select'
import FilterPanel from '../components/transaction/FilterPanel'
import TransactionTable from '../components/transaction/TransactionTable'
import Loading from '../components/layouts/Loading'

@inject('transactionStore')
@observer
export default class TransactionPage extends React.Component {
  async componentDidMount() {
    this.props.transactionStore.resetFilters()
    await this.props.transactionStore.getTrxs()
  }

  render() {
    const { filters, setFilters, loading } = this.props.transactionStore
    return (
      <BasicLayout {...this.props}>
        <div className="row" style={{marginTop:5}}>
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="form-inline" style={{marginTop:10,marginBottom:-5}}>
                  <Select options={
                    [
                      {label: 'All services', value: ''},
                      {label: 'Shopee', value: 'SHOPEE_EC'},
                      {label: 'ShopeePay', value: 'SHOPEE_PAY'},
                      {label: 'ShopeeKredit', value: 'SHOPEE_KREDIT'},
                    ]}
                          value={filters.service_type}
                          onChange={(value) => setFilters('service_type', value)}
                  />
                </form>
              </div>
              {/* <h3 style={{ marginTop: 30 }}>Transaction history</h3> */}
              <h4 className="page-title" style={{marginTop:10}}>Transaction history</h4>
            </div>
          </div>
        </div>
        <FilterPanel />
        <div className="row filterPanel">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <TransactionTable />
              </div>
            </div>
          </div>
        </div>
        <Loading loading={loading} />
      </BasicLayout>
    )
  }
}
