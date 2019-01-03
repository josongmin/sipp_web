import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

export default () => {
  return Component => {
    @inject('userStore') @observer
    class Auth extends React.Component {
      render() {
        const { userStore, ...restProps } = this.props
        return (
          <div>
            {!userStore.isAuthenticated && restProps.match.path !== '/login' && <Redirect to={'/login'} replace />}
            {userStore.isAuthenticated && restProps.match.path === '/login' && <Redirect to={'/'} replace />}
            <Component {...restProps} />
          </div>
        )
      }
    }

    return Auth
  }
}
