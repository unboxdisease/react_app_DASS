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
import { useHistory } from 'react-router'

const AddProducts = props => {
  

  class AddIcon extends Component {
    render () {
      return null
    }
  }
  const [categories, setCategories] = useState([])
  const [tags , setTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const [newCategory , setNewCategory] = useState('')
  const [newTag , setNewTag] = useState('')

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
      let res = await axios.get('http://localhost:8000/api/categories/getAll.php')
      console.log(JSON.stringify(res))
      setCategories(res.data)

      let res_tags = await axios.get('http://localhost:8000/api/tags/getAll.php')
      console.log(JSON.stringify(res_tags))
      setTags(res_tags.data)

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

  const initial = {
    Name: '',
    Price: '',
    Third_Party: '',
    Description: '',
    About: [
      {
        key: '',
        value: ''
      }
    ],
    Images: [
      {
        key: '',
        value: ''
      }
    ],
    Specifications: [
      {
        key: '',
        value: ''
      }
    ],
    Unique_Features: [
      {
        key: '',
        value: ''
      }
    ]
  }

  const [details, setDetails] = useState(initial)

  const onSubmit = async event => {
    // console.log(details)
    try {
      // event.preventDefault()
      console.log('DETAILS',details)
      let product_object = {
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
      let res_add = await axios.post('http://localhost:8000/api/products/addOne.php' , product_object , config)
      console.log('RES' , res_add)
      // console.log('CATEGORIES' , selectedCategories)
      
      
      setDetails({...details , Name: '' , Price: '' , Third_Party:'' , Description: '', About: [
        {
          key: '',
          value: ''
        }
      ],
      Images: [
        {
          key:'',
          value:''
        }
      ],
      Specifications: [
        {
          key: '',
          value: ''
        }
      ],
      Unique_Features: [
        {
          key: '',
          value: ''
        }
      ]
     })
     setSelectedCategories([])
     setSelectedTags([])
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
            <Button
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
                type='text'
                name='Key'
                placeholder='Property'
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Key'"
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
                type='text'
                name='Value'
                placeholder='Value'
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Value'"
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
            <button
              type='button'
              className='close'
              aria-label='Close'
              onClick={event => {
                handleRemove(element, idx)
              }}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        </div>
      )
    })

  const handleCategChange = (event, values) => {
    event.persist()
    // console.log(values)
    setSelectedCategories(values)
  }

  const handleTagChange = (event, values) => {
    event.persist()
    // console.log(values)
    setSelectedTags(values)
  }

  const handleNewCategChange = (event) => {
    event.persist()
    // console.log(values)
    setNewCategory(event.target.value)
  }

  const handleNewTagChange = (event) => {
    event.persist()
    // console.log(values)
    setNewTag(event.target.value)
  }

  const newCategSubmit =  async (event) => {
    event.preventDefault()
    console.log(newCategory)
    let categ_obj = {
      Name: newCategory
    }
    let res_categ_add = await axios.post('http://localhost:8000/api/categories/addOne.php' , categ_obj)
    load().then()
    console.log('RES CATEG' , res_categ_add)
    setNewCategory('')
  }

  const newTagSubmit = async (event) => {
    event.preventDefault()
    console.log(newTag)
    let tag_obj = {
      Name: newTag
    }
    let res_tag_add = await axios.post('http://localhost:8000/api/tags/addOne.php' , tag_obj)
    load().then()
    console.log('RES TAG' , res_tag_add)
    setNewTag('')
  }
  const go_dash = (event) => {
    history.push('/admin_dashboard')
  }

  return (
    <section class="blog_area section-padding">
    <div class='d-flex justify-content-center'>
      <div class='col-lg-8 col-md-8'>
      <Button style={{marginBottom:'20px'}}  onClick={go_dash} type="button">
            Back to Dashboard
          </Button>

        {/* add new category and tags */}
        <div style={{border: '2px black solid'}}>
          <h4>New Categories and tags</h4>
        <form  onSubmit={newCategSubmit}>
        <div style={{marginLeft:'20px'}} class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Add new category:</h6>
            </div>
            <input
              type='text'
              name='new_category'
              value={newCategory}
              placeholder='New Category'
              onChange={handleNewCategChange}
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'New category'"
              required
              
              class='single-input-primary'
            />
            <button style={{marginTop: '10px'}} type='submit' value='submit' class='btn_3'>
            Add category
            </button>
          </div>
        </form>

        <form  onSubmit={newTagSubmit}>
        <div style={{marginLeft:'20px'}} class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Add new tag:</h6>
            </div>
            <input
              type='text'
              name='new_tag'
              value={newTag}
              placeholder='New Tag'
              onChange={handleNewTagChange}
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'New tag'"
              required
              
              class='single-input-primary'
            />
            <button style={{marginTop: '10px'}} type='submit' value='submit' class='btn_3'>
            Add tag
            </button>
          </div>
        </form>

        </div>

        <h1 style={{marginTop: '20px'}} class='mb-30'>Add product</h1>
        <form action='#' onSubmit={handleSubmit(onSubmit)}>
          <div class='mt-20'>
            <div class='col-md-3 pl-0 text-left'>
              <h6>Name:</h6>
            </div>
            <input
              type='text'
              name='name'
              value={details.Name}
              placeholder='Name'
              onChange={event => handleChange('Name' , event)}
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Name'"
              
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
              type='text'
              name='price'
              value={details.Price}
              placeholder='Price'
              onChange={event => handleChange('Price' , event)}
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Price'"
              
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
              type='text'
              name='Link'
              value={details.Third_Party}
              placeholder='Link'
              onChange={event => handleChange('Third_Party' , event)}
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Link'"
              
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
              name='description'
              value={details.Description}
              onChange={event => handleChange('Description' , event)}
              class='single-textarea'
              placeholder='Description'
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Description'"
            />
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
              multiple
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
              multiple
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
          <button style={{marginTop: '10px'}} type='submit' value='submit' class='btn_3'>
            Submit Product
            </button>
        </form>
      </div>
    </div>
    </section>
  )
}
export default AddProducts
