import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
function Register () {
  const [preferences, setPreferences] = useState([])
  const [selectedPreferences, setSelectedPreferences] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        // const token = Cookies.get('token')
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` }
        // }
        // let res = await axios.get('categories/getAll.php')
        let res = await axios.get('http://localhost:8000/api/categories/getAll.php')
        console.log(JSON.stringify(res))
        setPreferences(res.data)
      } catch (err) {
        console.log(err.response)
      }
    }
    load().then()
  }, [])
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup
      .string()
      .required()
      .email(),
    contact: yup
      .number()
      .test(
        'len',
        'Must be exactly 10 characters',
        val => val.toString().length === 10
      )
  })

  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const initialDetails = {
    Email: '',
    Password: '',
    Username: '',
    Contact: ''
  }

  const props = {
    props: {
      question: 'Already an User ?',
      orstep: 'Log In',
      orstepurl: 'login',
      statement: (
        <div>
          {' '}
          Welcome to Curation ! <br />
          Please Sign Up now{' '}
        </div>
      ),
      thisstep: 'Register'
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

  const handlePrefChange = (event, values) => {
    event.persist()
    console.log(values)
    setSelectedPreferences(values)
  }

  const onSubmit = async event => {
    // alert('Hello')
    try {
      // alert(details)
      let res = await axios.post(
        'users/register.php',
        details
      )
      console.log(JSON.stringify(res))
      Cookies.set('token', res.data.token)
      console.log(JSON.stringify(res))
      Cookies.set('token', res.data.token, { sameSite: 'Strict', secure: true })
      const tobesent = {
        categories: []
      }
      console.log(selectedPreferences)
      tobesent.categories = selectedPreferences.map(x => x.Id)
      const token = Cookies.get('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      console.log(tobesent)
      let res1 = await axios.post('users/setUserCategories.php', tobesent, config)
      console.log(JSON.stringify(res1))
      history.push({
        pathname: '/feed'
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <body>
        <main>
          <Header type='Register' />
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
                            id='Email'
                            name='email'
                            value={details.Email}
                            placeholder='Email'
                            onChange={event => handleChange('Email', event)}
                            ref={register}
                          />
                          <p style={{ color: 'red' }}>
                            {errors.email?.message}
                          </p>
                        </div>
                        <div class='col-md-12 form-group p_star'>
                          <input
                            type='text'
                            class='form-control'
                            id='username'
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
                            type='number'
                            class='form-control'
                            id='contact'
                            name='contact'
                            value={details.Contact}
                            placeholder='Contact number'
                            onChange={event => handleChange('Contact', event)}
                            ref={register}
                          />
                          <p style={{ color: 'red' }}>
                            {errors.contact?.message}
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
                        <div class='col-md-12 form-group p_star'>
                          <Autocomplete
                            multiple
                            id='tags-standard'
                            options={preferences}
                            getOptionLabel={option => option.Name}
                            values={selectedPreferences}
                            getOptionSelected={(option, value) => option.Id === value.Id}
                            onChange={(event, values) =>
                              handlePrefChange(event, values)}
                            renderInput={params => (
                              <TextField
                                {...params}
                                variant='standard'
                                label='Add Preference'
                                placeholder='Preferences'
                              />
                            )}
                          />
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
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* <Footer /> */}
      </body>
    </div>
  )
}

export default Register
