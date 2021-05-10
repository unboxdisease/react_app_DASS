import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Arrival from './home_components/Newarrival'
import Popular from './home_components/Popular'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

function compare( a, b ) {
    if ( a.Publish_Date < b.Publish_Date ){
      return -1;
    }
    if ( a.Publish_Date > b.Publish_Date ){
      return 1;
    }
    return 0;
  }
function Home () {
// const initial = {
//     props:{Name:"",
//             Price:""}
// }

const [data, setData] = useState([]);
const [isLoading, setLoad] = useState(true);

const fetchData = async () => {
    try {
        let res= await axios.get('http://localhost:8000/api/products/getAll.php')
        // console.log(JSON.stringify(res))
        
        setData(res.data);
        setLoad(false);
        console.log(res.data)
      } catch (err) {
        console.log(err.response)
      }
}

// setLoad(false);
useEffect(()=> {
    fetchData()
  },[]);
  let imgstr;
function isJson(str) {
    const defstrg = "assets/img/hero/watch.png"
    try {
        JSON.parse(str);
    } catch (e) {
        return defstrg;
    }
    
    

    let a = JSON.parse(str)
    console.log(a)
    if (a instanceof Object)
    {
        imgstr = Object.entries(a)[0][1]
    }
    else
    {
        imgstr = defstrg
    }

    

return imgstr
}




console.log(imgstr)
return (
    <main>
        {/* <!--? slider Area Start --> */}
        <div className="slider-area ">
            <div className="slider-active">
                {/* <!-- Single Slider --> */}
                {/* <!-- Single Slider --> */}
                <div className="single-slider slider-height d-flex align-items-center slide-bg mt-4">
                    <div className="container">
                        <div style={{marginTop: '100px'}} className="col justify-content-between align-items-center">
                            <div className="row-xl-8 row-lg-8 row-md-8 row-sm-8" >
                                <div className="hero__caption">
                                    <h1 data-animation="fadeInLeft" data-delay=".4s" data-duration="2000ms">Find Unique Products</h1>
                                    <p data-animation="fadeInLeft" data-delay=".7s" data-duration="2000ms">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat is aute irure.</p>
                                    {/* <!-- Hero-btn --> */}
                                    <div className="hero__btn" data-animation="fadeInLeft" data-delay=".8s" data-duration="2000ms">
                                        <a href="/viewAll" className="btn hero-btn">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row-xl-3 row-lg-3 row-md-4 row-sm-4 d-none d-sm-block mt-4">
                                {data.slice(3,6).map(p => {
                                    console.log(isJson(p.Image))
                                    return (
                                        <img style={{width: '100px'   , marginLeft: '100px' , marginRight: '100px'}} src={isJson(p.Image)}/>
                                    )
                                })}
                                {/* <div className="hero__img" data-animation="bounceIn" data-delay=".4s">
                                    <img src="assets/img/hero/watch.png" alt="" className=" heartbeat"/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- slider Area End--> */}
        {/* <!-- ? New Product Start --> */}
        <section className="new-product-area section-padding30">
            <div className="container">
                {/* <!-- Section tittle --> */}
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-tittle mb-70">
                            <h2>New Arrivals</h2>
                        </div>
                    </div>
                </div>
                {isLoading === true  ? (<></>) :(
                <div className="row">
                {data.map((d)=>  <Arrival props={d} key = {d.Id}/>).sort(compare).slice(0,3)}
                    
                </div>
                )}
            </div>
            {/* <!-- Button --> */}
            <div className="row justify-content-center">
                    <div className="room-btn pt-70">
                        <a href="new" className="btn view-btn1">View More Latest Products</a>
                    </div>
                </div>
        </section>
        
        {/* <!-- Gallery Area End --> */}
        {/* <!--? Popular Items Start --> */}
        <div className="popular-items section-padding30">
            <div className="container">
                {/* <!-- Section tittle --> */}
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-10">
                        <div className="section-tittle mb-70 text-center">
                            <h2>Popular Items</h2>
                            <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                        </div>
                    </div>
                </div>
                
                {isLoading === true  ? (<></>) :(
                <div className="row">
                {data.map((d)=>  <Popular props={d} key = {d.Id}/>).slice(0,3)}
                    
                </div>
                )}
                
                {/* <!-- Button --> */}
                <div className="row justify-content-center">
                    <div className="room-btn pt-70">
                        <a href="popular" className="btn view-btn1">View More Popular Products</a>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Popular Items E</div>nd --> */}
        {/* <!--? Video Area Start --> */}
        {/* <div className="video-area">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                    <div className="video-wrap">
                        <div className="play-btn "><a className="popup-video" href="https://www.youtube.com/watch?v=KMc6DyEJp04"><i className="fas fa-play"></i></a></div>
                    </div>
                    </div>
                </div> */}
                {/* <!-- Arrow --> */}
                {/* <div className="thumb-content-box">
                    <div className="thumb-content">
                        <h3>Next Video</h3>
                        <a href="#"> <i className="flaticon-arrow"></i></a>
                    </div>
                </div>
            </div>
        </div> */}
        {/* <!-- Video Area End --> */}
        {/* <!--? Watch Choice  Start--> */}
        {/* <div className="watch-area section-padding30">
            <div className="container">
                <div className="row align-items-center justify-content-between padding-130">
                    <div className="col-lg-5 col-md-6">
                        <div className="watch-details mb-40">
                            <h2>Watch of Choice</h2>
                            <p>Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            <a href="shop.html" className="btn">Show Watches</a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-10">
                        <div className="choice-watch-img mb-40">
                            <img src="assets/img/gallery/choce_watch1.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-6 col-sm-10">
                        <div className="choice-watch-img mb-40">
                            <img src="assets/img/gallery/choce_watch2.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="watch-details mb-40">
                            <h2>Watch of Choice</h2>
                            <p>Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            <a href="shop.html" className="btn">Show Watches</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        {/* <!-- Watch Choice  End--> */}
        {/* <!--? Shop Method Start--> */}
        <div className="shop-method-area">
            <div className="container">
                <div className="method-wrapper">
                    <div className="row d-flex justify-content-between">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-method mb-40">
                                <i className="ti-package"></i>
                                <h6>Curated Product Display</h6>
                                <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-method mb-40">
                                <i className="ti-unlock"></i>
                                <h6>Secure Login System</h6>
                                <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                            </div>
                        </div> 
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-method mb-40">
                                <i className="ti-star"></i>
                                <h6>Rate and review</h6>
                                <p>aorem ixpsacdolor sit ameasecur adipisicing elitsf edasd.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Shop Method End--> */}
    </main>
  )
}

export default Home