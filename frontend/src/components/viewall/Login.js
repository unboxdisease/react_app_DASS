import React from 'react'
import Header from '../static/Header'
import Footer from '../static/Footer'
import RegLogin from '../static/RegLogin'

function Login () {
  const props = {
    question: 'New Around Here ?',
    orstep: 'Sign Up',
    statement: <div> Welcome Back ! <br />Please Sign in now </div>,
    thisstep: 'Login'
  }

  return (
    <div>
      <body>
        <main>
          <Header type='Login' />
          <RegLogin props={props} />
        </main>
        <Footer />
      </body>
    </div>
  )
}

export default Login
