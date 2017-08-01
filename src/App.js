import React from 'react'
import { compose, withState } from 'recompose'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import Login from './components/Login'
import Join from './components/Join'
import Topic from './components/Topic'
import Topics from './components/Topics'

import './static/css/font-awesome.min.css'

injectGlobal`
  body {
    height: 100%;
    background-image: url(https://brownbag.itbangmod.in.th/images/bg.jpg);
    background-size: cover;
    background-position: 50% 50%;
    background-attachment: fixed;

  }

  body {
    font-family: 'Prompt', sans-serif;
    letter-spacing: .03em;
    font-weight: 300;
  }
  
  button {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
  }

  h1, h2, h3, h4, h5, h6, b {
    font-weight: 400;
  }
`

const Header = styled.h3`
  padding-top: 40px;
  color: white;
`

const Footer = styled.p`
  color: white;
  text-align: center;
  font-size: 12px;
  font-weight: 200;
  padding-top: 20px;  
  padding-bottom: 20px;
`

const App = props => (
  <div className='App'>
    <Router>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <Header>BROWN BAG 3.0</Header>
          </div>
          <div className='col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/join' component={Join} />
              <Route path='/topic' component={Topic} />
              <Route path='/topics' component={Topics} />
            </Switch>
          </div>
          <div className="col-12">
            <Footer>Powered by Alchemist</Footer>
          </div>
        </div>
      </div>
    </Router>
  </div>
)

const LoginCompose = compose(
  withState('verify', 'setVerify', false),
  withState('error', 'setError', null)
)(App)

export default LoginCompose
