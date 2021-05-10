import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import Header from '../static/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import * as yup from 'yup'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../css/admin_login.css';


function AdminCreate() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [name, setName] = useState('');
    const [curToken, setCurToken] = useState('');
    let history = useHistory();

    useEffect(() => {
        const token = Cookies.get('admin_token');
        console.log('token is:', token);
        
        if (!token) {
            console.log('REDIRECTING');
            history.push('/admin_login');
        }

        setCurToken(token);
      }, [])
  
    function validateForm() {
      return username.length > 0 && password.length > 0 && name.length > 0;
    }

    const go_dash = (event) => {
      history.push('/admin_dashboard')
    }
  
    async function handleSubmit(event) {
      event.preventDefault();

      try {
        // alert(details.Username+" "+details.Password)
        let request_body = {'Username': username, 'Password': password, 'Email': email, 'Contact': contact, 'Name': name};
        const config = {
            headers: { Authorization: `Bearer ${curToken}` }
        }
        console.log('config: ', config);
        let res = await axios.post('http://localhost:8000/api/admins/createNewAdmin.php', request_body, config);
        console.log(JSON.stringify(res))
        history.push('/admin_login');
      } catch (err) {
        console.log(err.response)
        alert("Invalid Details", err.response.data.message);
      }
    }
  
    return (
      <div className="Login">
          <h1 style={{margin: "100px"}}>Create an Admin</h1>
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
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="contact">
            <Form.Label>contact</Form.Label>
            <Form.Control
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
        <Button style={{marginTop:'20px'}} onClick={go_dash} type="button">
            Back to Dashboard
        </Button>
      </div>
    );

}


export default AdminCreate;
