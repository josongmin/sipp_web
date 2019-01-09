import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@observer
export default class HorizontalNav extends React.Component {
  render() {
    const { match } = this.props
    return (
      <Fragment>
        <div className="navbar-custom topnav-navbar">
          <div className="container-fluid">
            <Link to={'/'} className="logo">  
              <h1 className="logo-lg" style={{ margin: 0, paddingTop: 15 }}>
                SHOPEE
              </h1>
            </Link>
            <a className="navbar-toggle" data-toggle="collapse" data-target="#topnav-menu-content">
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
          </div>
        </div>
        <div className="topnav">
          <div className="container-fluid">
            <nav className="navbar navbar-dark navbar-expand-lg topnav-menu">

              <div className="collapse navbar-collapse" id="topnav-menu-content">
                <ul className="navbar-nav"> 
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${match.path === '/' ? 'active' : ''}`}>
                      <i className="mdi mdi-speedometer mr-1"/>
                      <span> DASHBOARD </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/transaction'} className={`nav-link ${match.path === '/transaction' ? 'active' : ''}`}>
                      <i className="mdi mdi-google-pages mr-1"/>
                      <span> TRANSACTIONS </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/notice'} className={`nav-link ${match.path === '/notice' ? 'active' : ''}`}>
                      <i className="mdi mdi-briefcase-outline mr-1"/>
                      <span> NOTICE </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </Fragment>
    )
  }
}
