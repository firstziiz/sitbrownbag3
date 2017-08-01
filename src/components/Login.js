import React from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { firebaseAuth, firebaseLogout } from '../utils/firebase'

import { Banner, Card } from '../utils/styles'

import BagBanner from '../static/BagBanner.png'

/* global firebase */

const LoginForm = props => {
  console.log(props.loading)
  return (
    <Card active={props.loading}>
      <button
        role="button"
        className="btn btn-info btn-lg btn-block"
        onClick={() => props.history.push('/topics')}
        style={{ marginBottom: '15px' }}
      >
        {'ดูหัวข้อที่ถูกเสนอมาทั้งหมด!'}
      </button>
      <div className='card'>
        <Banner className='card-img-top' src={BagBanner} alt='banner' />
        <div className='card-block'>
          <h4 className='card-title text-center'>SUBMIT TOPIC</h4>
          <div className='card-text text-center'>
            {`ลงทะเบียนด้วย Facebook สำหรับผู้ที่สนใจเข้ามาร่วมแชร์ประสบการณ์ ความรู้ สิ่งที่น่าสนใจไปกับเราที่ Brown Bag #3.0 !`}
          </div>
          <div className='form-group'>
            {
              (!firebase.auth().currentUser)
              ? (
                <button
                  role='button'
                  className='btn btn btn-primary btn-block'
                  onClick={e => props.login(e)}
                >
                  <i className='fa fa-facebook' aria-hidden='true' />
                  {' Sign Up with Facebook'}
                </button>
              )
              : (
                <button
                  role='button'
                  className='btn btn btn-danger btn-block'
                  onClick={e => props.logout(e)}
                >
                  <i className='fa fa-sign-out' aria-hidden='true' />
                  {' Sign Out'}
                </button>
              )
            }
          </div>
        </div>
      </div>
    </Card>
  )
}

const LoginCompose = compose(
  withState('loading', 'setLoading', false),
  withState('user', 'setUser', null),
  withHandlers({
    login: props => e => {
      e.preventDefault()
      firebaseAuth().then((result) => {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken
          // ...
        }
        // The signed-in user info.
        var user = result.user
        props.setUser(user)
        console.log(token, user)
      }).catch((error) => {
        console.log(error)
      })
    },
    logout: props => e => {
      firebaseLogout().then((result) => {
        props.setUser(null)
      })
    }
  }),
  lifecycle({
    componentWillMount () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.setUser(user)
          console.log('willmount', user)
          this.props.history.push('/join')
        }
      })
      this.props.setLoading(true)
    }
  })
)(LoginForm)

export default LoginCompose
