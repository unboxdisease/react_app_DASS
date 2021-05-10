import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import axios from 'axios'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required(),
  cantact: yup.number().test('len', 'Must be exactly 10 characters', val => val.toString().length === 10)
})

function RegLogin (props) {
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const initialDetails = {
    email: '',
    password: '',
    
    username:(props.props.thisstep==='Login')? 'None':'',
    contact:(props.props.thisstep==='Login')? 'None':''
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

      
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <section className='login_part section_padding '>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6 col-md-6'>
            <div className='login_part_text text-center'>
              <div className='login_part_text_iner'>
                <h2>{props.props.question}</h2>
                <p>
                  There are advances being made in science and technology
                  everyday, and a good example of this is the
                </p>
                <a href={props.props.orstepurl} className='btn_3'>
                  {props.props.orstep}
                </a>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-6'>
            <div className='login_part_form'>
              <div className='login_part_form_iner'>
                <h3>
                  {props.props.statement}
                  {/* Welcome Back ! <br />
                    Please Sign in now */}
                </h3>
                <form
                  className='row contact_form'
                  action='#'
                  method='post'
                  novalidate='novalidate'
                  onSubmit={handleSubmit(onSubmit)}
                >
                   {(props.props.thisstep === 'Register') &&
                   <div className='col-md-12 form-group p_star'>
                   <input
                     type='text'
                     className='form-control'
                     id='username'
                     name='username'
                     value={details.username}
                     placeholder='Username'
                     onChange={event => handleChange('username', event)}
                     ref={register}
                   />
                   <p style={{ color: 'red' }}>{errors.username?.message}</p>
                 </div> }
                  
                  <div className='col-md-12 form-group p_star'>
                    <input
                      type='text'
                      className='form-control'
                      id='Email'
                      name='Email'
                      value={details.email}
                      placeholder='Email'
                      onChange={event => handleChange('email', event)}
                      ref={register}
                    />
                    <p style={{ color: 'red' }}>{errors.email?.message}</p>
                  </div>
                  <div className='col-md-12 form-group p_star'>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      name='password'
                      value={details.password}
                      placeholder='Password'
                      onChange={event => handleChange('password', event)}
                      ref={register}
                    />
                    <p style={{ color: 'red' }}>{errors.password?.message}</p>
                  </div>
                  {(props.props.thisstep === 'Register') &&  <div className='col-md-12 form-group p_star'>
                    <input
                      type='number'
                      className='form-control'
                      id='contact'
                      name='contact'
                      value={details.contact}
                      placeholder='Contact number'
                      onChange={event => handleChange('contact', event)}
                      ref={register}
                    />
                    <p style={{ color: 'red' }}>{errors.contact?.message}</p>
                  </div>}
                 
                  <div className='col-md-12 form-group'>
                    <div className='creat_account d-flex align-items-center'>
                      <input type='checkbox' id='f-option' name='selector' />
                      <label for='f-option'>Remember me</label>
                    </div>
                    <button type='submit' value='submit' className='btn_3'>
                      {props.props.thisstep}
                    </button>
                    {(props.props.thisstep === 'Login') && <a className='lost_pass' href='#'> forget password?</a>}
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
