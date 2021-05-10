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


function AdminDashboard() {
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

      const go_stats = (event) => {
        history.push('/admin_statistics')
      }

      const go_create = (event) => {
        history.push('/admin_create')
      }
      const go_add = (event) => {
        history.push('/admin_addproduct')
      }


      const logout = (event) => {
        Cookies.remove('admin_token')
        history.push('/admin_login')
      }
  
    
  
    return (
      <div className="Login">
          <h1 style={{margin: "100px"}}>Administrator Dashboard</h1>
          <Button onClick={go_stats} style= {{backgroundColor:'green'}}  type="button">
            Go to Statistics
          </Button>

          <Button onClick={go_create} style= {{marginLeft: '20px' , backgroundColor:'blue'}}  type="button">
            Create New admin
          </Button>
          <Button onClick={go_add} style= {{marginLeft: '20px' , backgroundColor:'orange'}}  type="button">
             Add Product
          </Button>
          
          <div>
              <Button className = 'btn_3' style= {{marginTop: '20px' }} onClick={logout} type="button">
                  Logout
              </Button>
          </div>
      </div>
    );

}


export default AdminDashboard;
