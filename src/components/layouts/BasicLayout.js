import React from 'react'
import { observer } from 'mobx-react'
import HorizontalNav from './HorizontalNav'
import Protected from '../decorator/Protected'
import Modal from './Modal'

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
        <Modal />
      </div>
    )
  }
}
