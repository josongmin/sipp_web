import React from 'react'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import Protected from '../components/decorator/Protected'
import Loading from '../components/layouts/Loading'
import Modal from '../components/layouts/Modal'
import './LoginPage.css'

@Protected()
@inject('userStore', 'modalStore')
@observer
export default class LoginPage extends React.Component {
  @observable email
  @observable password

  constructor(props) {
    super(props)

    this.email = ''
    this.password =''
  }
  render() {
    return (
      <div className="authentication-bg" style={{ minHeight: '100%' }}>
        <div className="account-pages mt-5 mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card">
                  <div className="card-header pt-4 pb-4 text-center bg-primary">
                    <h2 style={{ color: '#fff' }}>SHOPEE</h2>
                  </div>
                  <div className="card-body p-4">
                    <div className="text-center w-75 m-auto">
                      <h4 className="text-dark-50 text-center mt-0 font-weight-bold">Sign In</h4>
                      <p className="text-muted mb-4">Enter your ID and password to access admin panel.</p>
                    </div>
                    <form onSubmit={this.login}>
                      <div className="form-group">
                        <label htmlFor="emailaddress">ID</label>
                        <input className="form-control"
                               onChange={this.handleChange.bind(this, 'email')}
                               value={this.email}
                               id="emailaddress"
                               required=""
                               placeholder="Enter your id" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control"
                               onChange={this.handleChange.bind(this, 'password')}
                               value={this.password}
                               type="password"
                               required=""
                               id="password"
                               placeholder="Enter your password" />
                      </div>
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox">
                        </div>
                      </div>
                      <div className="form-group mb-0 text-center">
                        <button className="btn btn-primary" type="submit"> Log In</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 text-center">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loading loading={this.props.userStore.loading} size={15} />
        <Modal />
      </div>
    )
  }

  @action.bound
  handleChange(key, e) {
    this[key] = e.target.value
  }

  @action.bound
  async login(e) {
    e.preventDefault()
    if(this.email && this.password) {
      await this.props.userStore.login(this.email, this.password)
        .catch(err => {
          if(err.response.status === 401) {
            this.props.userStore.logout()
            const { status } = err.response.data
            this.props.modalStore.showModal('LoginAlert', { msg: status.msg, style: { width: 250, margin: '0 auto' }})
          }
        })
    }
  }
}
