import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@observer
export default class LeftSidebar extends React.Component {
  render() {
    const { match } = this.props
    return (
      <div className="left-side-menu">
        <div className="slimscroll-menu">
          <a href="index.html" className="logo text-center">
            <span className="logo-lg">
                SHOPEE
            </span>
            <span className="logo-sm">
              SHOPEE
            </span>
          </a>
          <ul className="metismenu side-nav">

            <li className="side-nav-title side-nav-item">Navigation</li>

            <li className="side-nav-item">
              <Link to="/" className={`side-nav-link ${match.path === '/' ? 'active' : ''}`}>
                <i className="dripicons-meter"/>
                <span> DASHBOARD </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={'/transaction'} className={`side-nav-link ${match.path === '/transaction' ? 'active' : ''}`}>
                <i className="dripicons-meter"/>
                <span> 거래조회 </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={'/notice'} className={`side-nav-link ${match.path === '/notice' ? 'active' : ''}`}>
                <i className="dripicons-meter"/>
                <span> 공지사항 </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={'/transaction'} className={`side-nav-link ${match.path === '/transaction' ? 'active' : ''}`}>
                <i className="dripicons-meter"/>
                <span> 기타 </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={'/transaction'} className="side-nav-link">
                <i className="dripicons-meter"/>
                <span> 기타 </span>
              </Link>
            </li>
          </ul>

          <div className="clearfix"/>

        </div>

      </div>
    )
  }
}
