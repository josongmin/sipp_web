import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class TopBar extends React.Component {
  render() {
    return (
      <div className="navbar-custom">
        <button className="button-menu-mobile open-left disable-btn">
          <i className="mdi mdi-menu" />
        </button>
        <div className="app-search">
          <form>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="주문번호 입력" />
                <span className="mdi mdi-magnify" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
