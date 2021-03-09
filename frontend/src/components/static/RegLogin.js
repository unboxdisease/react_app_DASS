import React from 'react'
// import axios from 'axios'

function RegLogin (props) {
  return (
    <section class='login_part section_padding '>
      <div class='container'>
        <div class='row align-items-center'>
          <div class='col-lg-6 col-md-6'>
            <div class='login_part_text text-center'>
              <div class='login_part_text_iner'>
                <h2>{props.props.question}</h2>
                <p>
                  There are advances being made in science and technology
                  everyday, and a good example of this is the
                </p>
                <a href='register' class='btn_3'>
                  {props.props.orstep}
                </a>
              </div>
            </div>
          </div>
          <div class='col-lg-6 col-md-6'>
            <div class='login_part_form'>
              <div class='login_part_form_iner'>
                <h3>
                  {props.props.statement}
                  {/* Welcome Back ! <br />
                    Please Sign in now */}
                </h3>
                <form
                  class='row contact_form'
                  action='#'
                  method='post'
                  novalidate='novalidate'
                >
                  <div class='col-md-12 form-group p_star'>
                    <input
                      type='text'
                      class='form-control'
                      id='name'
                      name='name'
                      value=''
                      placeholder='Username'
                    />
                  </div>
                  <div class='col-md-12 form-group p_star'>
                    <input
                      type='password'
                      class='form-control'
                      id='password'
                      name='password'
                      value=''
                      placeholder='Password'
                    />
                  </div>
                  <div class='col-md-12 form-group'>
                    <div class='creat_account d-flex align-items-center'>
                      <input type='checkbox' id='f-option' name='selector' />
                      <label for='f-option'>Remember me</label>
                    </div>
                    <button type='submit' value='submit' class='btn_3'>
                      {props.props.thisstep}
                    </button>
                    {(props.props.thisstep === 'Login') && <a class='lost_pass' href='#'> forget password?</a>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegLogin
