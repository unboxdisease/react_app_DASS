import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'
function Side (props) {
    
      const [preferances, setPreferances] = useState({
        pre: {}
      })
    
      useEffect(() => {
        const load = async () => {
          try {
            
            let res1 = await axios.get('http://localhost:8000/api/categories/getAll.php')
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
      
      let categorieslist = []
    //   console.log(preferances.pre)
      for (let key in preferances.pre) {
        categorieslist.push(
          <li>
            <p>
              {preferances.pre[key].Name}
            </p>
          </li>
        )
      }
    return (
        <div class="col-lg-4">
        <div class="blog_right_sidebar">
            

            <aside class="single_sidebar_widget post_category_widget">
                <h4 class="widget_title">Category</h4>
                <ul class="list cat-list">
                 {categorieslist}   
                </ul>
            </aside>

            <aside class="single_sidebar_widget popular_post_widget">
                <h3 class="widget_title">Advertisements</h3>
                <div class="media post_item">
                    <img src="assets/img/post/post_1.png" alt="post"/>
                    <div class="media-body">
                        <a href="single-blog.html">
                            <h3>From life was you fish...</h3>
                        </a>
                        <p>January 12, 2019</p>
                    </div>
                </div>
                <div class="media post_item">
                    <img src="assets/img/post/post_2.png" alt="post"/>
                    <div class="media-body">
                        <a href="single-blog.html">
                            <h3>The Amazing Hubble</h3>
                        </a>
                        <p>02 Hours ago</p>
                    </div>
                </div>
                <div class="media post_item">
                    <img src="assets/img/post/post_3.png" alt="post"/>
                    <div class="media-body">
                        <a href="single-blog.html">
                            <h3>Astronomy Or Astrology</h3>
                        </a>
                        <p>03 Hours ago</p>
                    </div>
                </div>
                <div class="media post_item">
                    <img src="assets/img/post/post_4.png" alt="post"/>
                    <div class="media-body">
                        <a href="single-blog.html">
                            <h3>Asteroids telescope</h3>
                        </a>
                        <p>01 Hours ago</p>
                    </div>
                </div>
            </aside>
            <aside class="single_sidebar_widget tag_cloud_widget">
                <h4 class="widget_title">Tag Clouds</h4>
                <ul class="list">
                    <li>
                        <a href="#">project</a>
                    </li>
                    <li>
                        <a href="#">love</a>
                    </li>
                    <li>
                        <a href="#">technology</a>
                    </li>
                    <li>
                        <a href="#">travel</a>
                    </li>
                    <li>
                        <a href="#">restaurant</a>
                    </li>
                    <li>
                        <a href="#">life style</a>
                    </li>
                    <li>
                        <a href="#">design</a>
                    </li>
                    <li>
                        <a href="#">illustration</a>
                    </li>
                </ul>
            </aside>


            

        </div>
        </div>
        
    )
  }
  
  export default Side