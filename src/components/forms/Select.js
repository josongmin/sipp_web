import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class Select extends React.Component {
  render() {
    const { label, options, value = '', className, nomb, ...restProps } = this.props
    return (
      <div className={`form-group ${nomb ? '' : 'mb-3'}`}>
        {label && <label htmlFor="example-select">{label}</label>}
        <select value={value} className={`form-control ${className}`} {...restProps} onChange={this.handleChange.bind(this)} >
          {
            options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          }
        </select>
      </div>
    )
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }
}
