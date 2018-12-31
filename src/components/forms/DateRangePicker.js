import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export default class DateRangePicker extends React.Component {
  componentDidMount() {
    this.$el = $(this.el)
    this.$el.daterangepicker({
      singleDatePicker: true
    }, (start, end, label) => {
      console.log(start, end, label)
    })
  }

  render() {
    const { style = {}, nomb } = this.props

    const cls = classNames('input-group', {
      'mb-3': !nomb
    })
    return (
      <div className={cls} style={style}>
        <input ref={el => this.el = el} type="text" className="form-control form-control-light" onChange={this.handleChange.bind(this)} />
        <div className="input-group-append">
          <span className="input-group-text bg-primary border-primary text-white">
            <i className="mdi mdi-calendar-range font-13" />
          </span>
        </div>
      </div>
    )
  }

  handleChange(e) {
    console.log(e.target.value)
  }
}
