import React from 'react'
import { inject, observer } from 'mobx-react'
import BarLoader from 'react-spinners/BeatLoader'

@inject('transactionStore')
@observer
export default class Loading extends React.Component {
  render() {
    const { loading } = this.props.transactionStore
    return (
      <div style={{ position: 'fixed', zIndex: 10000, left: 0, right: 0, top: 0, bottom: 0, display: loading ? null : 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -15, marginTop: -15 }}>
          <BarLoader size={30}
                     color={'#36D7B7'}
                     sizeUnit={"px"}
                     loading={true} />
        </div>
        <div style={{ width: '100%', height: '100%', background: '#ddd', opacity: 0.3 }} />
      </div>
    )
  }
}
