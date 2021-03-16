import React from 'react'
import Header from '../static/Header'
import Footer from '../static/Footer'
import RegLogin from '../static/RegLogin'

function Register () {
  const props = {
    question: 'Already an User ?',
    orstep: 'Log In',
    orstepurl: 'login',
    statement: <div> Welcome to Curation ! <br />Please Sign Up now </div>,
    thisstep: 'Register'
  }

  return (
    <div>
      <body>
        <main>
          <Header type='Register' />
          <RegLogin props={props} />
        </main>
        {/* <Footer /> */}
      </body>
    </div>
  )
}

export default Register
