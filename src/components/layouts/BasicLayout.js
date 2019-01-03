import React from 'react'
import { observer } from 'mobx-react'
import LeftSidebar from './LeftSidebar'
import HorizontalNav from './HorizontalNav'
import TopBar from './TopBar'
import Protected from '../decorator/Protected'

@Protected()
@observer
export default class BasicLayout extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content-page">
          <div className="content">
            <HorizontalNav {...this.props} />
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
