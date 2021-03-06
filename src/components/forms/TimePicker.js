import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class TimePicker extends React.Component {
  componentDidMount() {
    this.$el = $(this.el)
    this.$el.timepicker({
      "icons": {
        "up": "mdi mdi-chevron-up",
        "down": "mdi mdi-chevron-down"
      }
    }).on('changeTime.timepicker', (e) => {
      this.props.onChange(e.time)
    })

    this.props.setRef(this.$el)
  }

  render() {
    const { label, value } = this.props
    return (
      <div className="form-group mb-3">
        {label && <label>{label}</label>}
        <div className="input-group" >
          <input ref={el => this.el = el} type="text" className="form-control" data-toggle='timepicker' value={value}
                 onChange={() => {}} />
            <div className="input-group-append">
              <span className="input-group-text"><i className="dripicons-clock" /></span>
            </div>
        </div>
      </div>
    )
  }
}
