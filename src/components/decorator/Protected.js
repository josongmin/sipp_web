import React from 'react'
import { withRouter } from 'react-router-dom'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'

export default () => {
  return Component => {
    @inject('userStore') @observer
    class Auth extends React.Component {
      constructor(props) {
        super(props)

        this.userStore = this.props.userStore

        reaction(
          () => this.userStore.isAuthenticated,
          (isAuthenticated) => {
            if(!isAuthenticated) props.history.replace('/login')
            else if(props.match.path === '/login') props.history.replace('/')
          }
        )
      }
      render() {
        const { userStore, ...restProps } = this.props
        return (
          <div>
            <Component {...restProps} />
          </div>
        )
      }
    }

    return withRouter(Auth)
  }
}
