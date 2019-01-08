import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class LoginAlert extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { msg } = this.props
    return (
      <div className="modal-filled bg-danger" style={{ padding: '20px 40px' }}>
        <div className="text-center">
          <i className="dripicons-wrong h1" />
          <h4 className="mt-2">Oh snap!</h4>
          <p className="mt-3"> {msg}</p>
        </div>
      </div>
    )
  }
}
