import React, { useState } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import * as yup from 'yup'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../css/admin_login.css';


function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    function validateForm() {
      return username.length > 0 && password.length > 0;
    }
  
    async function handleSubmit(event) {
      event.preventDefault();

      try {
        // alert(details.Username+" "+details.Password)
        let res= await axios.post('http://localhost:8000/api/admins/login.php', {'Username': username, 'Password': password})
        console.log('token received: ', JSON.stringify(res.data.jwt))
        Cookies.set('admin_token', res.data.jwt, { sameSite: 'Strict', secure: true })
        // history.push({
        //   pathname: '/feed'
        // })
        history.push('/admin_dashboard');
      } catch (err) {
        console.log(err.response)
        alert("Invalid Login Details")
      }
    }
  
    return (
      <div className="Login">
          <h1 style={{margin: "100px"}}>Admin login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );

}


export default AdminLogin;
