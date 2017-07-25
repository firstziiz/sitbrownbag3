import React from 'react'
import { compose, withState, withHandles } from 'recompose'

const VerifyForm = props => (
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
      >Verify</button>
    </p>
    <div id='recaptcha-container' />
  </form>
)

export default VerifyForm
