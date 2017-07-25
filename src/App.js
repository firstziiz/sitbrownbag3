import React, { PureComponent } from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { login } from './config/firebase'

import './bulma.css'

import Login from './components/Login'
import Verify from './components/Verify'

/* global firebase */

const App = props => (
  <div className='App'>
    <div className='hero is-fullheight is-dark is-bold'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-4 is-offset-4'>
              <h1 className='title has-text-centered'>
                Register an Account
              </h1>
              <div className='box'>
                {
                  !props.verify
                  ? <Login {...props} />
                  : <Verify {...props} />
                }
              </div>
              <div className='has-text-centered'>
                <div id='recaptcha-container' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const LoginCompose = compose(
  withState('verify', 'setVerify', false),
  lifecycle({
    componentDidMount () {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    }
  })
)(App)

export default LoginCompose
