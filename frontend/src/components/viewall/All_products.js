import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useStyles from '../styles/generalStyles'
import Arrival from './home_components/Newarrival'
import Popular from './home_components/Popular'
import Big from './home_components/big_showcase'
import Header from '../static/Header'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import {
    Button, ButtonGroup,
    LinearProgress, MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Grid
} from '@material-ui/core'
import Fuse from 'fuse.js'

const SORTABLE_HEADERS = ['Price', 'Rating', 'Publish_Date']

const FilterForm = ({ classes, filter, setFilter, setFilterFn, sortby, setSortBy, categories }) => {
    return (
        <Formik
            initialValues={{
                name: filter.name,
                // minPrice: filter.minPrice,
                // maxPrice: filter.maxPrice,
                category: filter.category,
                // sortby: sortby
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log('values:', values);
                // if (values.sortby !== '' && values.sortby) {
                //     setSortBy(values.sortby);
                // }
                setFilterFn({
                    fn: (items) => {
                        let returnArr = items
                        if (values.name !== '') {
                            const fuse = new Fuse(returnArr, {
                                keys: ['Name']
                            })
                            returnArr = fuse.search(values.name).map(res => res.item)
                            // returnArr = returnArr.filter(item => item.Name.includes(values.name))
                        }
                        console.log('after search', returnArr);
                        // if (values.minPrice !== '')
                        //     returnArr = returnArr.filter(item => item.Price >= values.minPrice)
                        // console.log('after minPrice:', returnArr);
                        // if (values.maxPrice !== '')
                        //     returnArr = returnArr.filter(item => item.Price < values.maxPrice)
                        // console.log('after maxPrice:', returnArr);
                        if (values.category !== '') {
                            console.log('items:', returnArr);
                            let to_ret = [];
                            for (let item in returnArr) {
                                if (returnArr[item].Categories) {
                                    for (let category in returnArr[item].Categories) {
                                        console.log('checking ', returnArr[item].Categories[category], values.category)
                                        if (values.category === returnArr[item].Categories[category].Name)
                                            to_ret.push(returnArr[item]);
                                    }
                                }
                            }
                            returnArr = to_ret;
                        }
                        // console.log('after maxPrice:', returnArr);
                        // console.log('TESTING:', items[5].Categories.map(c => c.Name));
                        return returnArr
                    }
                })

                setSubmitting(false)
            }}
        >
            {({ submitForm, isSubmitting, touched, errors }) => (
                <Form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                type="text"
                                label="Name"
                                name="name"
                                autoComplete='off'
                                // variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        {/* <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="sort by"
                                    name="sortby"
                                    select
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {SORTABLE_HEADERS.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid> */}
                        <Grid item xs={12}>
                            <Field
                                component={TextField}
                                type="text"
                                label="category"
                                name="category"
                                select
                                // variant="outlined"
                                // margin="normal"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.Id} value={option.Name}>
                                        {option.Name}
                                    </MenuItem>
                                ))}
                            </Field>
                        </Grid>
                        {/* <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    type="number"
                                    label="Min price"
                                    name='minPrice'
                                    autoComplete='off'
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    type="number"
                                    label="Max price"
                                    name="maxPrice"
                                    autoComplete='off'
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}
                        {isSubmitting && <LinearProgress />}
                    </Grid>

                    <ButtonGroup fullWidth style={{ marginTop: '30px' }}>
                        <Button
                            // variant="contained"
                            // color="primary"
                            className="genric-btn primary"
                            fullWidth
                            type="submit"
                            disabled={isSubmitting}
                            className={classes.submit}
                        >
                            Filter
                            </Button>
                        <Button
                            // variant="contained"
                            // color="secondary"
                            className="genric-btn danger"
                            fullWidth
                            type='reset'
                            disabled={isSubmitting}
                        >
                            Reset
                            </Button>
                    </ButtonGroup>
                </Form>
            )}
        </Formik>
    )
}

function compare(a, b, key) {
    if (!a[key] || !b[key]) {
        return 0;
    }
    if (a[key] < b[key]) {
        return -1;
    }
    if (a[key] > b[key]) {
        return 1;
    }
    return 0;
}

function sortByKey(array, key) {
    if (key == '')
        return array;
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        // console.log('a', a, 'b', b, 'key', key, 'x', x, 'y', y, 'x<y', (x<y));
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


function All_products() {
    const classes = useStyles()
    const [data, setData] = useState([])
    const [isLoading, setLoad] = useState(true)
    const [filterFn, setFilterFn] = useState({ fn: (items) => items })
    const [dataToShow, setDataToShow] = useState([])
    const [sortBy, setSortBy] = useState('Publish_Date')
    const [categories, setCategories] = useState([])

    const filter = {
        name: '',
        category: ''
    }

    const fetchData = async () => {
        try {
            let res = await axios.get('http://localhost:8000/api/products/getAll.php')
            // console.log(JSON.stringify(res))
            console.log('calling fetchData');
            console.log(res.data)
            setData(res.data)
            setDataToShow(res.data);
            setLoad(false)

            res = await axios.get('http://localhost:8000/api/categories/getAll.php')
            setCategories(res.data);
            console.log('categories:', res.data);
        } catch (err) {
            console.log(err.response)
        }
    }

    // setLoad(false);
    useEffect(() => {
        fetchData()
        setDataToShow(data)
    }, [])

    useEffect(() => {
        //   setData(filterFn.fn(data));
        console.log('filtered:', filterFn.fn(data));
        setDataToShow(filterFn.fn(data));
    }, [filterFn])

    useEffect(() => {
        //   console.log('sort by: ', sortBy);
        let tempSorted = sortByKey(data, sortBy);
        console.log('sorby, data,sorted:', sortBy, data, tempSorted);
    }, [sortBy])

    return (
        <main>
            <Header type='Find Products' />
            {/* <div className='watch-area section-padding30'>
        <div className='container'>
          {isLoading === true ? (
            <></>
          ) : (
            <div className='row'>
                <Paper style={{padding: '40px', marginBottom: '40px'}}>
                    <Typography variant="h4" component="h5">
                        Filter
                    </Typography>
                    <FilterForm filter={filter} 
                        setFilterFn={setFilterFn} 
                        classes={classes} 
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        categories={categories}/>
                </Paper>
              {sortByKey(dataToShow, sortBy).reverse().map(d => (
                <Big props={d} key={d.Id} />
              ))}
            </div>
          )}
        </div>
      </div> */}


            <section class="blog_area section-padding">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-8 mb-5 mb-lg-0">

                            <div class="blog_left_sidebar">
                                <div className="row product-btn justify-content-between mb-40">
                                    <div className="properties__button">
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" style={{ marginRight: "10px" }} onClick={() => setSortBy('Publish_Date')}>Newest Arrivals</a>
                                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" style={{ marginRight: "10px" }} onClick={() => setSortBy('Price')}> Price high to low</a>
                                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => setSortBy('Rating')}> Highest rated </a>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="grid-list-view">
                                    </div>
                                </div>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                        <div className='watch-area'>
                                            <div className='container'>
                                                {isLoading === true ? (
                                                    <></>
                                                ) : (
                                                    <div className='row'>
                                                        {sortByKey(dataToShow, sortBy).reverse().map(d => (
                                                            <Big props={d} key={d.Id} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                        <div className='watch-area'>
                                            <div className='container'>
                                                {isLoading === true ? (
                                                    <></>
                                                ) : (
                                                    <div className='row'>
                                                        {sortByKey(dataToShow, sortBy).reverse().map(d => (
                                                            <Big props={d} key={d.Id} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

                                        <div className='watch-area'>
                                            <div className='container'>
                                                {isLoading === true ? (
                                                    <></>
                                                ) : (
                                                    <div className='row'>
                                                        {sortByKey(dataToShow, sortBy).reverse().map(d => (
                                                            <Big props={d} key={d.Id} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4" >
                            <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget popular_post_widget">
                                <Paper style={{ padding: '40px', marginBottom: '40px' }}>
                                    <Typography variant="h4" component="h5">
                                        Filter
                                    </Typography>
                                    <FilterForm filter={filter}
                                        setFilterFn={setFilterFn}
                                        classes={classes}
                                        sortBy={sortBy}
                                        setSortBy={setSortBy}
                                        categories={categories} />
                                </Paper>
                                
                                </aside>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

        </main>
    )
}

export default All_products
