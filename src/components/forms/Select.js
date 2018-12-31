import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Select extends React.Component {
  render() {
    const { label, options, onChange } = this.props
    return (
      <div className="form-group mb-3">
        {label && <label htmlFor="example-select">{label}</label>}
        <select className="form-control" onChange={this.handleChange.bind(this)}>
          {
            options.map(option => (
              <option key={option.value}>{option.label}</option>
            ))
          }
        </select>
      </div>
    )
  }

  handleChange(e) {
    console.log(e.target.value)
  }
}
