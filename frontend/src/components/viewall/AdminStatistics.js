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
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';




function AdminStatistics() {
    const [curToken, setCurToken] = useState('');
    const [data, setData] = useState('');
    let history = useHistory();

    const handle_link = (event , product_id) =>{
      console.log(product_id)
      history.push({
        pathname: '/admin_viewProduct',
        Idprops: product_id
      })
    }

    const go_dash = (event) => {
      history.push('/admin_dashboard')
    }

    useEffect(() => {
        const token = Cookies.get('admin_token');
        console.log('token is:', token);
        
        if (!token) {
            console.log('REDIRECTING');
            history.push('/admin_login');
        }

        setCurToken(token);

        const load = async () => {
            try {
              let res = await axios.get('http://localhost:8000/api/products/getAll.php')

              setData(
                res.data
              )
            } catch (err) {
              console.log(err.response)
            }
          }
          load().then()

        
      }, [])

      useEffect(() => {
          console.log('data:', data);
      }, [data])

      const columns = [{
        dataField: 'Id',
        text: 'Product ID',
        sort: true
      }, {
        dataField: 'Name',
        text: 'Product Name',
        sort: true
      }, {
        dataField: 'Price',
        text: 'Product Price',
        sort: true
      }, {
          dataField: 'Clicks',
          text: 'Clicks',
          sort: true
      }, {
          dataField: 'Rating',
          text: 'Rating',
          sort: true
      },{
        dataField: 'Id_2',
        text: 'View/Edit',
        formatter: (cellContent , row) => {
          return (
            <button className="btn" style={{backgroundColor: 'yellowgreen'}} onClick={(event) => handle_link(event , row.Id)} className="btn">View/Edit</button>
          )
        }
      }];

      const defaultSorted = [{
        dataField: 'Id',
        order: 'asc'
      }];
      

  
    return (
      <div>
          <h1 style={{padding: "60px"}}>View statistics</h1>
          <Button style={{marginBottom:'20px'}}  onClick={go_dash} type="button">
            Back to Dashboard
          </Button>
          <BootstrapTable bootstrap4 keyField='Id' data={ data } columns={ columns } defaultSorted={ defaultSorted } />
      </div>
    );

}


export default AdminStatistics;
