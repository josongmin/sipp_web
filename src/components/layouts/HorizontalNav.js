import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('userStore')
@observer
export default class HorizontalNav extends React.Component {
  render() {
    const { match, userStore: { currentUser, isAuthenticated, logout } } = this.props
    return (
      <Fragment>
        <div className="navbar-custom topnav-navbar">
          <div className="container-fluid">
            <Link to={'/'} className="logo" style={{ display: 'inline-block' }}>
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
            {
              isAuthenticated &&
              <ul className="list-unstyled topbar-right-menu float-right mb-0">
                <li className="dropdown notification-list" style={{ minWidth: 179 }}>
                  <a className="nav-link dropdown-toggle nav-user arrow-none mr-0" data-toggle="dropdown" href="#"
                     role="button" aria-haspopup="false" aria-expanded="false">
                    <span className="account-user-avatar">
                      <img src={currentUser.photo_url} alt="user-image" className="rounded-circle" />
                    </span>
                    <span>
                      <span className="account-user-name">{currentUser.name}</span>
                      <span className="account-position">{currentUser.position}</span>
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                    <a className="dropdown-item notify-item" onClick={logout}>
                      <i className="mdi mdi-logout" />
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            }
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
                      <span> 거래조회 </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/notice'} className={`nav-link ${match.path === '/notice' ? 'active' : ''}`}>
                      <i className="mdi mdi-briefcase-outline mr-1"/>
                      <span> 공지사항 </span>
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
