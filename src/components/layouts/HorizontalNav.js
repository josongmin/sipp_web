import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import logoImg from '../../images/logo-dark.png'


@inject('userStore')
@observer
export default class HorizontalNav extends React.Component {
  render() {
    const { match, userStore: { currentUser, isAuthenticated, logout } } = this.props
    return (
      <Fragment>
        <div className="navbar-custom topnav-navbar ">
          <div className="container-fluid">

            <Link to={'/'} className="logo" style={{ display: 'inline-block' }}>

              <h1 className="logo-lg" style={{ margin: 0, paddingTop: 15 }}>

                <img src={logoImg} alt="Shopee" height="22" onLoad="typeof google==='object'&amp;&amp;google.aft&amp;&amp;google.aft(this)"></img>
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
                <li className="dropdown notification-list" style={{}}>
                  <a className="nav-link dropdown-toggle nav-user arrow-none mr-0" data-toggle="dropdown" href="#"
                     role="button" aria-haspopup="false" aria-expanded="false">
                    <span className="account-user-avatar">
                      <img src={currentUser.photo_url} alt="user-image" className="rounded-circle" />
                    </span>
                    <span>
                      <span className="account-user-name text-primary">{currentUser.name}</span>
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
          <div className="container-fluid " >
            <nav className="navbar navbar-dark navbar-expand-lg topnav-menu">

              <div className="collapse navbar-collapse" id="topnav-menu-content">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${match.path === '/' ? 'active' : ''}`}>
                      <i className="mdi mdi mdi-signal-cellular-3 mr-1"/>
                      <span> Dashboard </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/transaction'} className={`nav-link ${match.path === '/transaction' ? 'active' : ''}`}>
                      <i className="mdi mdi-presentation-play mr-1"/>
                      <span> Transaction history </span>
                    </Link>
                  </li>

                  <li className="nav-item" >
                    <Link to={'/schedule'} className={`nav-link ${match.path === '/schedule' ? 'active' : ''}`}>
                      <i className="mdi mdi mdi-calendar-check mr-1"/>
                      <span> Schedule </span>
                    </Link>
                  </li>


                  <li className="nav-item" >
                    <Link to={'/members'} className={`nav-link ${match.path === '/members' ? 'active' : ''}`}>
                      <i className="mdi mdi-account-settings mr-1"/>
                      <span> Members </span>
                    </Link>
                  </li>

                  <li className="nav-item" >
                    <Link to={'/help'} className={`nav-link ${match.path === '/help' ? 'active' : ''}`}>
                      <i className="mdi mdi-compass-outline mr-1"/>
                      <span> Help </span>
                    </Link>
                  </li>

                  <li className="nav-item" >
                    <Link to={'/developer'} className={`nav-link ${match.path === '/developer' ? 'active' : ''}`}>
                      <i className="mdi  mdi mdi-transition mr-1"/>
                      <span> Developer </span>
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
