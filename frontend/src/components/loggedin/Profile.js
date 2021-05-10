import React, { useState, useEffect } from 'react'
import { Redirect, Link, useHistory } from "react-router-dom";
import axios from 'axios'
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import * as yup from 'yup'
// import myConstants from '../constants'

function Profile () {
  let history = useHistory();
  const [details, setDetails] = useState({
    profile: {}
  })
  const [preferances, setPreferances] = useState({
    pre: {}
  })

  useEffect(() => {
    const load = async () => {
      try {
        const token = Cookies.get('token')
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        let res = await axios.get('http://localhost:8000/api/users/getCurrentUserDetails.php', config)
        console.log(JSON.stringify(res))
        setDetails({
          ...details,
          profile: res.data
        })
        let res1 = await axios.get('http://localhost:8000/api/users/getUserCategories.php', config)
        console.log(JSON.stringify(res1))
        setPreferances({
          ...preferances,
          pre: res1.data
        })
      } catch (err) {
        console.log(err.response)
      }
    }
    load().then()
  }, [])
  let profileLists = []
  let categorieslist = []
  console.log(preferances.pre[0])
  for (let key in details.profile) {
    profileLists.push(
      <li>
        <p>
          <b>{key}:</b> {details.profile[key]}
        </p>
      </li>
    )
  }
  for (let key in preferances.pre) {
    categorieslist.push(
      <li>
        <p>
          <b>{key}:</b> {preferances.pre[key].Name}
        </p>
      </li>
    )
  }

  const onSubmit = async event => {

    try {
      
      Cookies.remove('token',  { sameSite: 'Strict', secure: true })
      window.location.href = "/"
    } catch (err) {
      console.log(err.response)
      alert("Invalid Login Details")
    }
  }
  let str = "Hi, " +  details.profile.Username
  console.log(str)

  return (
    <div>
    <Header type = {str}/>
    <div class='blog_right_sidebar container'>
      <div class='row '>
        <div class='col mt-2'>
          <aside class='single_sidebar_widget post_category_widget'>
            <h4 class='widget_title'>Profile</h4>
            <ul class='list cat-list'>
              {profileLists}
            </ul>
          </aside>
        </div>
        <div class='col mt-2 pr-5'>
          <aside class='single_sidebar_widget post_category_widget'>
            <h4 class='widget_title'>Category</h4>
            <ul class='list cat-list'>
              {categorieslist}
             
            </ul>
          </aside>
          <button type='submit' value='submit' class='btn_3' onClick={() => onSubmit()}>
                            logout
                          </button><br></br><br></br>
          <button type='button' class='btn_3' onClick={() => history.push('/editprofile')}>
                            Edit profile
                          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
