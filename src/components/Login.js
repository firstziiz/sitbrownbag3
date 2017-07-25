import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { login } from '../config/firebase'

const LoginForm = props => (
  <div>
    <form onSubmit={e => props.login(e)}>
      <div className='field has-text-centered'>
        <label className='label'>Phone Number</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='+66881234567'
            onChange={e => props.setPhoneNumber(e.target.value)}
            value={props.phoneNumber}
          />
        </div>
      </div>
      <p className='control has-text-centered'>
        <button
          className='button btn-login is-primary'
        >Login with Firebase</button>
      </p>
    </form>
  </div>
)

const LoginCompose = compose(
withState('phoneNumber', 'setPhoneNumber', ''),
  withState('code', 'setCode', ''),
  withState('status', 'setStatus', ''),
  withHandlers({
    login: props => e => {
      e.preventDefault()
      console.log(`hi`)
      login(props.phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).

          var code = window.prompt('Enter the verification code you received by SMS')
          if (code) {
            confirmationResult.confirm(code).then(function (e) {
              console.log(e)
              window.close()
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              console.error('Error while checking the verification code', error)
              window.alert('Error while checking the verification code:\n\n' +
                  error.code + '\n\n' + error.message)
            })
          }

          window.confirmationResult = confirmationResult
          console.log(window.confirmationResult)
        }).catch((error) => {
          // Error; SMS not sent
          console.log(error)
        })
    }
  })
)(LoginForm)

export default LoginCompose
