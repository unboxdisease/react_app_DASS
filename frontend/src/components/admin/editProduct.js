import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Col, Form } from 'react-bootstrap'
import { Chip, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Autocomplete } from '@material-ui/lab'
import Cookies from 'js-cookie'
import Header from '../static/Header'
import { Link } from 'react-router-dom'
import { green } from '@material-ui/core/colors'
import { useHistory } from 'react-router'


const EditProduct = props => {
  
const prop = { props: { id: props.location.Idprops } }
//   class AddIcon extends Component {
//     render () {
//       return null
//     }
//   }
  
  const [loading , setLoading] = useState(true) 
  const [canEdit , setEdit] = useState(false)
  const [details , setDetails] = useState({})
  const [categories, setCategories] = useState([])
  const [tags , setTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const [admin_token , setToken] = useState(null)
  let history = useHistory()

  const load = async () => {
    try {
      // const token = Cookies.get('token')
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // }
      // let res = await axios.get('categories/getAll.php')

      const token = Cookies.get('admin_token')
      if(!token) history.push('/admin_login')
      else{
        setToken(token)
      }

      let res_products = await axios.get(`http://localhost:8000/api/products/getOne.php?id=${prop.props.id}`)
      let detail_obj = {}
      detail_obj['Name'] = res_products.data['Name']
      detail_obj['Price'] = res_products.data['Price']
      detail_obj['Third_Party'] = res_products.data['Third_Party'] != null ? res_products.data['Third_Party'] : ''
      detail_obj['Description'] = res_products.data['Description'] != null ? res_products.data['Description'] : ''
      detail_obj['Publish_Date'] = res_products.data['Publish_Date']
      detail_obj['About'] = []
      if(res_products.data['About'] != null)
      {
          Object.keys(res_products.data['About']).forEach(k => {
              detail_obj['About'].push({
                  key: k,
                  value: res_products.data['About'][k]
              })
          })
      }
      else
      {
          detail_obj['About'].push({
              key: '',
              value: ''
          })
      }

      detail_obj['Images'] = []
      if(res_products.data['Images'] != null)
      {
          Object.keys(res_products.data['Image']).forEach(k => {
              detail_obj['Images'].push({
                  key: k,
                  value: res_products.data['Image'][k]
              })
          })
      }
      else
      {
          detail_obj['Images'].push({
              key: '',
              value: ''
          })
      }

      detail_obj['Specifications'] = []
      if(res_products.data['Specifications'] != null)
      {
          Object.keys(res_products.data['Specifications']).forEach(k => {
              detail_obj['Specifications'].push({
                  key: k,
                  value: res_products.data['Specifications'][k]
              })
          })
      }
      else
      {
          detail_obj['Specifications'].push({
              key: '',
              value: ''
          })
      }

      detail_obj['Unique_Features'] = []
      if(res_products.data['Unique_Features'] != null)
      {
          Object.keys(res_products.data['Unique_Features']).forEach(k => {
              detail_obj['Unique_Features'].push({
                  key: k,
                  value: res_products.data['Unique_Features'][k]
              })
          })
      }
      else
      {
          detail_obj['Unique_Features'].push({
              key: '',
              value: ''
          })
      }

      setDetails(detail_obj)
      res_products.data['Categories'] != null ? setSelectedCategories(res_products.data['Categories']) : setSelectedCategories([])
      res_products.data['Tags'] != null ? setSelectedTags(res_products.data['Tags']) : setSelectedTags([]) 
      
      console.log(res_products.data)
        

      let res_categories = await axios.get('http://localhost:8000/api/categories/getAll.php')
      console.log(JSON.stringify(res_categories))
      setCategories(res_categories.data)

      let res_tags = await axios.get('http://localhost:8000/api/tags/getAll.php')
      console.log(JSON.stringify(res_tags))
      setTags(res_tags.data)
      setLoading(false)

    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    
    load().then()
  }, [])

  const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup
      .number("Invalid Number").required("Invalid Number").positive("Invalid Number"),
    Link: yup.string().required()

    // skills:yup.array().min(1)
  })

  const { register, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

//   const initial = {
//     Name: '',
//     Price: '',
//     Third_Party: '',
//     Description: '',
//     About: [
//       {
//         key: '',
//         value: ''
//       }
//     ],
//     Images: [
//       {
//         key: '',
//         value: ''
//       }
//     ],
//     Specifications: [
//       {
//         key: '',
//         value: ''
//       }
//     ],
//     Unique_Features: [
//       {
//         key: '',
//         value: ''
//       }
//     ]
//   }

//   const [details, setDetails] = useState(initial)

  const onSubmit = async event => {
    // console.log(details)
    try {
      // event.preventDefault()
      console.log('DETAILS',details)
      let product_object = {
        Id: prop.props.id,
        Name: details.Name,
        Price: parseFloat(details.Price),
      }
      if(details.Third_Party != '') product_object['Third_Party'] = details.Third_Party
      if(details.Description != '') product_object['Description'] = details.Description
      if(details.About.length != 0)
      {
        product_object['About'] = {}
        for(let i =0;i<details.About.length;i+=1)
        {
          product_object['About'][details.About[i].key] = details.About[i].value
        }
      }

      if(details.Images.length != 0)
      {
        product_object['Image'] = {}
        for(let i =0;i<details.Images.length;i+=1)
        {
          product_object['Image'][details.Images[i].key] = details.Images[i].value
        }

        product_object['Image'] = JSON.stringify(product_object['Image'])
      }

      if(details.Specifications.length != 0)
      {
        product_object['Specifications'] = {}
        for(let i =0;i<details.Specifications.length;i+=1)
        {
          product_object['Specifications'][details.Specifications[i].key] = details.Specifications[i].value
        }
      }

      if(details.Unique_Features.length != 0)
      {
        product_object['Unique_Features'] = {}
        for(let i =0;i<details.Unique_Features.length;i+=1)
        {
          product_object['Unique_Features'][details.Unique_Features[i].key] = details.Unique_Features[i].value
        }
      }
      if(selectedCategories.length != 0)
      {
        product_object['CategoryIds'] = selectedCategories.map(sc => sc.Id)
      }

      if(selectedTags.length != 0)
      {
        product_object['TagIds'] = selectedTags.map(st => st.Id)
      }
      
      console.log(product_object)
      
      // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJZCI6MiwiVXNlcm5hbWUiOiJyb290IiwiVHlwZSI6IkFkbWluIn0.jwJ6L5fDjzs8MJ2NIlikDFPQJLn5ItZony-R-GM2fOo'
      const token = admin_token
      if(token == null) history.push('/admin_login')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      let res_update = await axios.post('http://localhost:8000/api/products/updateOne.php' , product_object , config)
      console.log('RES' , res_update)
      console.log('CATEGORIES' , selectedCategories)
      setEdit(false)
      load().then()
    //   props.history.push('/admin_statistics')
    
    } catch (err) {
      console.log(err)
    }
  }

  // function handleRemove(i) {
  //     setDetails({...details,"education": details.education.splice(i,1)});
  // }

  const handleChange = (property, event) => {
    setDetails({ ...details, [property]: event.target.value })
    // console.log(details)
  }

  const handleRemove = (stateVariable, idx) => {
    setDetails(prevState => {
      console.log(prevState[stateVariable])
      let newVariable = [...prevState[stateVariable]]
      newVariable.splice(idx, 1)
      console.log(newVariable)
      return {
        ...prevState,
        [stateVariable]: newVariable
      }
    })
    console.log(details)
  }


  const handleAdd = stateVariable => {
    console.log(stateVariable)
    setDetails(prevState => {
      const newVariable = prevState[stateVariable]
      newVariable.push({
        key: '',
        value: ''
      })
      return {
        ...prevState,
        [stateVariable]: newVariable
      }
    })
  }

  const handleJSONChange = (stateVariable, idx, property, value) => {
    setDetails(prevState => {
      const newVariable = prevState[stateVariable]
      newVariable[idx] = {
        ...newVariable[idx],
        [property]: value
      }
      // console.log(neweducation)
      return {
        ...prevState,
        [stateVariable]: newVariable
      }
    })
    // console.log(details)
  }

  const dynamicvariable = element => {
    return (
      <div class='mt-20'>
        <div class='col-md-5 mb-3 pl-0 text-left'>
          <span>{element}:</span>
          <span class='ml-5'>
            {!canEdit ? '' : (
                <Button
                key={`add_btn${element}`}
                size='sm'
                variant='contained'
                color='primary'
                component='span'
                onClick={event => {
                  handleAdd(element)
                }}
              >
                Add
              </Button>
            )}
            
          </span>
        </div>
        {dynamicfield(element)}
      </div>
    )
  }

  const dynamicfield = element =>
    details[element].map((inst, idx) => {
      return (
        <div key={idx}>
          <div class='row mb-2'>
            <div class='col'>
              <input
                disabled={!canEdit}
                type='text'
                name='Key'
                placeholder='Property'
                value={inst.key}
                required
                onChange={event =>
                  handleJSONChange(element, idx, 'key', event.target.value)
                }
                
                class='single-input-primary'
                
              />
              {/* <p style={{ color: 'red' }}>
              {errors.Key?.message}
              </p> */}
            </div>
            <div class='col'>
              <input
                disabled={!canEdit}
                type='text'
                name='Value'
                placeholder='Value'
                value={inst.value}
                required
                onChange={event =>
                  handleJSONChange(element, idx, 'value', event.target.value)
                }
                
                class='single-input-primary'
                
              />
              {/* <p style={{ color: 'red' }}>
              {errors.Value?.message}
              </p> */}
            </div>
            {!canEdit ? '' : (
                <button
                key={`remov_btn${element}${idx}`}
                type='button'
                className='close'
                aria-label='Close'
                onClick={event => {
                  handleRemove(element, idx)
                }}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            )}
            
          </div>
        </div>
      )
    })

  const handleCategChange = (event, values) => {
    event.persist()
    // console.log(selectedCategories)
    setSelectedCategories(values)
  }

  const handleTagChange = (event, values) => {
    event.persist()
    // console.log(values)
    setSelectedTags(values)
  }


  const handleEdit = (e) => {
      setEdit(true)
  }

  const handleRestore = (e) => {
    setEdit(false)
    load().then()
}

  return loading ? '' : (
    <section class="blog_area section-padding">
    <div class='d-flex justify-content-center'>
      <div class='col-lg-8 col-md-8'>
        

        {/* add new category and tags */}
        <div>
        {canEdit ? '' : (
            <button key='edit_btn' onClick={handleEdit} style={{marginLeft: '20px'}}  type='button' value='edit' class='btn_3'>
            Edit
            </button>
        )}
        
        {!canEdit ? '' : (
            <button key='restor_btn' onClick={handleRestore} style={{marginLeft: '20px'}}  type='button' value='restore' class='btn'>
            Restore changes
            </button>
        )}
            <Link to='/admin_statistics'>
            <button key='back_btn'  style={{marginLeft: '20px' , backgroundColor: 'green'}}  type='button' value='stats' class='btn'>
            Go to statistics
            </button>
            </Link>
        
        </div> 

        <h1 style={{marginTop: '20px'}} class='mb-30'>View/Edit product</h1>
        <form action='#' onSubmit={handleSubmit(onSubmit)}>
          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Name:</h6>
            </div>
            <input
              disabled={!canEdit}
              type='text'
              name='name'
              value={details.Name}
              placeholder='Name'
              onChange={event => handleChange('Name' , event)}
              
              class='single-input-primary'
              ref={register}
            />
            <p style={{ color: 'red' }}>
            {errors.name?.message}
            </p>
          </div>
          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Price:</h6>
            </div>
            <input
              disabled={!canEdit}
              type='text'
              name='price'
              value={details.Price}
              placeholder='Price'
              onChange={event => handleChange('Price' , event)}
              
              class='single-input-primary'
              ref={register}
            />
            <p style={{ color: 'red' }}>
            {errors.price?.message}
            </p>
          </div>
          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Third-Party Link:</h6>
            </div>
            <input
              disabled={!canEdit}
              type='text'
              name='Link'
              value={details.Third_Party}
              placeholder='Link'
              onChange={event => handleChange('Third_Party' , event)}
              
              class='single-input-primary'
              ref={register}
            />
            <p style={{ color: 'red' }}>
            {errors.Link?.message}
            </p>
          </div>
          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Description:</h6>
            </div>
            <textarea
              disabled={!canEdit}
              name='description'
              value={details.Description}
              onChange={event => handleChange('Description' , event)}
              class='single-textarea'
              placeholder='Description'
            />
          </div>

          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Publish Date: {details['Publish_Date']}</h6>
            </div>
            
          </div>
  
          {dynamicvariable('About')}
          {dynamicvariable('Images')}
          {dynamicvariable('Specifications')}
          {dynamicvariable('Unique_Features')}
          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Categories:</h6>
            </div>
            <Autocomplete
              disabled={!canEdit}
              multiple
              defaultValue={selectedCategories}
              id='tags-standard'
              options={categories}
              getOptionLabel={option => option.Name}
              values={selectedCategories}
              getOptionSelected={(option, value) => option.Id === value.Id}
              onChange={(event, values) => handleCategChange(event, values)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='standard'
                  placeholder='Categories'
                  class='single-input-primary'
                />
              )}
            />
          </div>

          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Tags:</h6>
            </div>
            <Autocomplete
              disabled={!canEdit}
              multiple
              defaultValue={selectedTags}
              id='tags-standard'
              options={tags}
              getOptionLabel={option => option.Name}
              values={selectedTags}
              getOptionSelected={(option, value) => option.Id === value.Id}
              onChange={(event, values) => handleTagChange(event, values)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='standard'
                  placeholder='Tags'
                  class='single-input-primary'
                />
              )}
            />
          </div>
          {!canEdit ? '' : (
              <button key='submit_btn' style={{marginTop: '10px'}} type='submit' value='submit' class='btn_3'>
              Submit Changes
              </button>
          )}
          
        </form> 
      </div>
    </div>
    </section>
  )
}
export default EditProduct
