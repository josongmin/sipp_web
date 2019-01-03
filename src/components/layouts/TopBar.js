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
          
        </div>
      </div>
    )
  }
}
