import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Input extends React.Component {
  render() {
    const { label, onChange, value } = this.props
    return (
      <div className="form-group mb-3">
        {label && <label htmlFor={label}>{label}</label>}
        <input type="text" id={label} value={value} className="form-control" onChange={(e) => onChange(e.target.value)} />
      </div>
    )
  }
}
