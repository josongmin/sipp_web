import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="authentication-bg">
        <div className="account-pages mt-5 mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card">
                  <div className="card-header pt-4 pb-4 text-center bg-primary">
                    <a href="index.html">
                      <span>SHOPEE</span>
                    </a>
                  </div>

                  <div className="card-body p-4">

                    <div className="text-center w-75 m-auto">
                      <h4 className="text-dark-50 text-center mt-0 font-weight-bold">Sign In</h4>
                      <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>
                    </div>

                    <form action="#">

                      <div className="form-group">
                        <label htmlFor="emailaddress">Email address</label>
                        <input className="form-control" type="email" id="emailaddress" required=""
                               placeholder="Enter your email" />
                      </div>

                      <div className="form-group">
                        <a href="pages-recoverpw.html" className="text-muted float-right">
                          <small>Forgot your password?</small>
                        </a>
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" required="" id="password"
                               placeholder="Enter your password" />
                      </div>

                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="checkbox-signin" checked />
                            <label className="custom-control-label" htmlFor="checkbox-signin">Remember me</label>
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
                    <p className="text-muted">Don't have an account?
                      <a href="pages-register.html" className="text-dark ml-1"><b>Sign Up</b></a>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
