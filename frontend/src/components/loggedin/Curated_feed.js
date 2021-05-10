import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Big from '../viewall/home_components/big_showcase'
import Header from '../static/Header'
import Cookies from 'js-cookie'
import StarRatings from "react-star-ratings";
import {Link} from 'react-router-dom'
import GridDisplay from '../viewall/home_components/grid-showcase'

function Curated_feed () {
  const [isLoading, setLoad] = useState(true)
  const [details, setDetails] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const token = Cookies.get('token')
        console.log('Token',token)
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        let res = await axios.get('http://localhost:8000/api/products/getCuratedProducts.php', config)
        console.log(JSON.stringify(res))
        setLoad(false)
        setDetails(res.data)
      } catch (err) {
        console.log(err.response)
      }
    }
    load().then()
  }, [])

  console.log(details)

  return (
    <main>
      <Header type="Feed" />
      <section class='cart_area section_padding'>
        <GridDisplay props={details} />
      </section>
    </main>
  )
}

export default Curated_feed
