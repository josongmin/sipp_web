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
    await this.props.transactionStore.getTrxs()
  }

  render() {
    const { filters, setFilters, loading } = this.props.transactionStore
    return (
      <BasicLayout {...this.props}>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="form-inline">
                  <Select options={
                    [
                      {label: '전체서비스', value: ''},
                      {label: 'Shopee EC', value: 'SHOPEE_EC'},
                      {label: 'Shopee pay', value: 'SHOPEE_PAY'},
                      {label: 'Shopee Kredit', value: 'SHOPEE_KREDIT'},
                    ]}
                          value={filters.service_type}
                          onChange={(value) => setFilters('service_type', value)}
                  />
                </form>
              </div>
              <h4 className="page-title">TRANSACTIONS</h4>
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
