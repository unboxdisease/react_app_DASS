import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Autocomplete } from '@material-ui/lab'
import { TextField, unstable_createMuiStrictModeTheme } from '@material-ui/core'
function EditProfile () {
  const [preferences, setPreferences] = useState([])
  const [selectedPreferences, setSelectedPreferences] = useState([])
  const [initPref, setInitPref] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      try {
        let token = Cookies.get('token')
        if (!token) {
            history.push('/login');
        }


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        let res = await axios.get('http://localhost:8000/api/users/getCurrentUserDetails.php', config);
        let userDetails = res.data;
        console.log('user details: ', userDetails);
        setDetails({
          Email: userDetails.Email,
          Username: userDetails.Username,
          Contact: userDetails.Contact
        })

        res = await axios.get('http://localhost:8000/api/categories/getAll.php')
        console.log(JSON.stringify(res))
        console.log('preferences:', res.data);
        setPreferences(res.data)

        res = await axios.get('http://localhost:8000/api/users/getUserCategories.php', config);
        console.log('user categories:', res.data);
        // setInitPref(res.data.map(c => c.Name));
        // setSelectedPreferences(res.data);
        setInitPref(res.data);
      } catch (err) {
        console.log(err.response)
      }
    }
    load().then()
  }, [])

  const schema = yup.object().shape({
    // username: yup.string().required(),
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
    Username: '',
    Contact: ''
  }

  const props = {
    props: {
      question: 'Revert?',
      orstep: 'Profile',
      orstepurl: '/profile',
      statement: (
        <div>
          {' '}
          Edit profile
        </div>
      ),
      thisstep: 'Save'
    }
  }

  const [details, setDetails] = useState(initialDetails)
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
      const token = Cookies.get('token')
      console.log(selectedPreferences)
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      let tobesent = details;
      console.log('to send:', tobesent)
      let res1 = await axios.post('http://localhost:8000/api/users/editProfile.php', tobesent, config)
      console.log(JSON.stringify(res1))

      if (selectedPreferences.length > 0) {
        const categoriesUpdate = {"categories": selectedPreferences.map(x => x.Id)};
        console.log('sending categories', categoriesUpdate);
        let res2 = await axios.post('http://localhost:8000/api/users/setUserCategories.php', categoriesUpdate, config);
        console.log(JSON.stringify(res2));
      }
      history.push({
        pathname: '/feed'
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    console.log('Selected prefs: ', selectedPreferences);
  }, [selectedPreferences])

  return (
    <div>
      <body>
        <main>
          <Header type='Edit Profile' />
          <section class='login_part section_padding '>
            <div class='container'>
              <div class='row align-items-center'>
                <div class='col-lg-6 col-md-6'>
                  <div class='login_part_text text-center'>
                    <div class='login_part_text_iner'>
                      <h2>{props.props.question}</h2>
                      <p>
                        Your old preferences are: {(initPref.map(p => p.Name).join(', '))}, which is very cool!
                        Don't want to edit your profile? Want to just go back to the old one?
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
                            disabled
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
                          <Autocomplete
                            multiple
                            id='tags-standard'
                            options={preferences}
                            getOptionLabel={option => option.Name}
                            values={selectedPreferences}
                            getOptionSelected={(option, value) => option.Id === value.Id}
                            onChange={(event, values) => handlePrefChange(event, values)}
                            defaultValue={initPref}
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

export default EditProfile
