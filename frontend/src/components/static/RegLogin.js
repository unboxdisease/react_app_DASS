import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import axios from 'axios'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

function RegLogin (props) {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const initialDetails = {
    email: '',
    password: ''
  }

  const [details, setDetails] = useState(initialDetails)

  const handleChange = (property, event) => {
    event.persist()
    console.log(details)
    setDetails(prevState => {
      return { ...prevState, [property]: event.target.value }
    })
  }

  const onSubmit = async event => {
    // console.log(details)
    try {
      //
    } catch (err) {
      console.log(err)
    }
  }


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
                <a href={props.props.orstepurl} class='btn_3'>
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
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div class='col-md-12 form-group p_star'>
                    <input
                      type='text'
                      class='form-control'
                      id='username'
                      name='username'
                      value={details.email}
                      placeholder='Username'
                      onChange={event => handleChange('username', event)}
                      ref={register}
                    />
                    <p style={{ color: 'red' }}>{errors.username?.message}</p>
                  </div>
                  <div class='col-md-12 form-group p_star'>
                    <input
                      type='password'
                      class='form-control'
                      id='password'
                      name='password'
                      value={details.password}
                      placeholder='Password'
                      onChange={event => handleChange('message', event)}
                      ref={register}
                    />
                    <p style={{ color: 'red' }}>{errors.password?.message}</p>
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
