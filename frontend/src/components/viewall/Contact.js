import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  message: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  subject: yup.string().required()
})

function Contact () {
  // Schema for form validation
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const initialMessage = {
    message: '',
    name: '',
    email: '',
    subject: ''
  }

  const [message, setMessage] = useState(initialMessage)

  // handleChange of Form elements
  const handleChange = (property, event) => {
    event.persist()
    console.log(message)
    setMessage(prevState => {
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

const [data, setData] = useState([]);
const [isLoading, setLoad] = useState(true);

const fetchData = async () => {
    try {
        let res= await axios.get('http://localhost:8000/api/admins/getAll.php')
        // console.log(JSON.stringify(res))
        // console.log(res.data)
        setData(res.data);
        setLoad(false);
        
      } catch (err) {
        console.log(err.response)
      }
}

// setLoad(false);
useEffect(()=> {
    fetchData()
  },[]);

  let adminLists = []

  for (let key in data) {
    adminLists.push((
      <li key = {key.ID}>
        <p >
          <b>{data[key].Name}</b> <p>     </p>{data[key].Email}
        </p>
        </li>)
    )}
    

  console.log(data)

  return (
    <div>
      <Header type='Get in touch' />
      <section class='contact-section'>
      <div class='blog_right_sidebar container'>
      <div class='row '>
      <div class='col mt-2'>
          <aside class='single_sidebar_widget post_category_widget'>
            <h4 class='widget_title'>Admins That You can Contact</h4>
            <ul class='list cat-list'>
              {adminLists}
            </ul>
          </aside>
        </div></div></div>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-8'>
              <form
                class='form-contact contact_form'
                action='contact_process.php'
                method='post'
                id='contactForm'
                novalidate='novalidate'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div class='row'>
                  <div class='col-12'>
                    <div class='form-group'>
                      <textarea
                        class='form-control w-100'
                        name='message'
                        id='message'
                        cols='30'
                        rows='9'
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter Message'"
                        placeholder=' Enter Message'
                        value={message.message}
                        onChange={event => handleChange('message', event)}
                        ref={register}
                      />
                      <p style={{ color: 'red' }}>{errors.message?.message}</p>
                    </div>
                  </div>
                  <div class='col-sm-6'>
                    <div class='form-group'>
                      <input
                        class='form-control valid'
                        name='name'
                        id='name'
                        type='text'
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter your name'"
                        placeholder='Enter your name'
                        value={message.name}
                        onChange={event => handleChange('name', event)}
                        ref={register}
                      />
                      <p style={{ color: 'red' }}>{errors.name?.message}</p>
                    </div>

                  </div>
                  <div class='col-sm-6'>
                    <div class='form-group'>
                      <input
                        class='form-control valid'
                        name='email'
                        id='email'
                        type='email'
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter email address'"
                        placeholder='Email'
                        value={message.email}
                        onChange={event => handleChange('email', event)}
                        ref={register}
                      />
                    </div>
                    <p style={{ color: 'red' }}>{errors.email?.message}</p>
                  </div>
                  <div class='col-12'>
                    <div class='form-group'>
                      <input
                        class='form-control'
                        name='subject'
                        id='subject'
                        type='text'
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter Subject'"
                        placeholder='Enter Subject'
                        value={message.subject}
                        onChange={event => handleChange('subject', event)}
                        ref={register}
                      />
                    </div>
                    <p style={{ color: 'red' }}>{errors.subject?.message}</p>

                  </div>
                </div>
                <div class='form-group mt-3'>
                  <button
                    type='submit'
                    class='button button-contactForm boxed-btn'
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div class='col-lg-3 offset-lg-1'>
              <div class='media contact-info'>
                <span class='contact-info__icon'>
                  <i class='ti-home'></i>
                </span>
                <div class='media-body'>
                  <h3>NetiSoft</h3>
                  <p>Bangalore</p>
                </div>
              </div>
              <div class='media contact-info'>
                <span class='contact-info__icon'>
                  <i class='ti-tablet'></i>
                </span>
                <div class='media-body'>
                  <h3>+1 253 565 2365</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div class='media contact-info'>
                <span class='contact-info__icon'>
                  <i class='ti-email'></i>
                </span>
                <div class='media-body'>
                  <h3>support@NetiSoft.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
