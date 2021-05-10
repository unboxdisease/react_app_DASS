import React, { useState } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import * as yup from 'yup'
// import myConstants from '../constants'

function Login () {
  const schema = yup.object().shape({
    password: yup.string().required(),
    username: yup
      .string()
      .required()
      // .email()
  })

  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const initialDetails = {
    Username: '',
    Password: ''
  }

  const props = {
    props: {
      question: 'New Around Here ?',
      orstep: 'Sign Up',
      orstepurl: 'register',
      statement: (
        <div>
          {' '}
          Welcome Back ! <br />
          Please Sign in now{' '}
        </div>
      ),
      thisstep: 'Login'
    }
  }

  const [details, setDetails] = useState(initialDetails)
  const history = useHistory()

  const handleChange = (property, event) => {
    event.persist()
    console.log(details)
    setDetails(prevState => {
      return { ...prevState, [property]: event.target.value }
    })
  }

  const onSubmit = async event => {
    // alert('Hello')
    // console.log(details)
    try {
      // alert(details.Username+" "+details.Password)
      let res= await axios.post('http://localhost:8000/api/users/login.php', details)
      console.log(JSON.stringify(res))
      Cookies.set('token', res.data.token, { sameSite: 'Strict', secure: true })
      history.push({
        pathname: '/feed'
      })
    } catch (err) {
      console.log(err.response)
      alert("Invalid Login Details")
    }
  }

  return (
    <div>
          <Header type='Login' />
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
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div class='col-md-12 form-group p_star'>
                          <input
                            type='text'
                            class='form-control'
                            id='Username'
                            name='username'
                            value={details.Username}
                            placeholder='Username'
                            onChange={event => handleChange('Username', event)}
                            ref={register}
                          />
                          <p style={{ color: 'red' }}>
                            {errors.username?.message}
                          </p>
                        </div>
                        <div class='col-md-12 form-group p_star'>
                          <input
                            type='password'
                            class='form-control'
                            id='password'
                            name='password'
                            value={details.Password}
                            placeholder='Password'
                            onChange={event => handleChange('Password', event)}
                            ref={register}
                          />
                          <p style={{ color: 'red' }}>
                            {errors.password?.message}
                          </p>
                        </div>
                        <div class='col-md-12 form-group'>
                          <div class='creat_account d-flex align-items-center'>
                            <input
                              type='checkbox'
                              id='f-option'
                              name='selector'
                            />
                            <label for='f-option'>Remember me</label>
                          </div>
                          <button type='submit' value='submit' class='btn_3'>
                            {props.props.thisstep}
                          </button>
                          <a class='lost_pass' href='#'> forget password?</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </div>
  )
}

export default Login
