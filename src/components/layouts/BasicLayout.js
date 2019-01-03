import React from 'react'
import { observer } from 'mobx-react'
import LeftSidebar from './LeftSidebar'
import TopBar from './TopBar'
import Protected from '../decorator/Protected'

@Protected()
@observer
export default class BasicLayout extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <LeftSidebar {...this.props} />
        <div className="content-page">
          <div className="content">
            <TopBar />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
