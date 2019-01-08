import React from 'react'
import { observer } from 'mobx-react'
import BarLoader from 'react-spinners/BeatLoader'

@observer
export default class Loading extends React.Component {
  render() {
    const { loading, size = 30 } = this.props
    return (
      <div style={{ position: 'fixed', zIndex: 10000, left: 0, right: 0, top: 0, bottom: 0, display: loading ? null : 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -(size/2), marginTop: -(size/2) }}>
          <BarLoader size={size}
                     color={'#36D7B7'}
                     sizeUnit={"px"}
                     loading={true} />
        </div>
        <div style={{ width: '100%', height: '100%', background: '#ddd', opacity: 0.3 }} />
      </div>
    )
  }
}
