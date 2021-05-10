import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Arrival from './home_components/Newarrival'
import Popular from './home_components/Popular'
import Big from './home_components/big_showcase'
import Header from '../static/Header';
import Side from '../static/sidebar'
function compare(a, b) {
  if (a.Publish_Date < b.Publish_Date) {
    return -1;
  }
  if (a.Publish_Date > b.Publish_Date) {
    return 1;
  }
  return 0;
}
function New_products() {


  const [data, setData] = useState([]);
  const [isLoading, setLoad] = useState(true);

  const fetchData = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/products/getAll.php')
      console.log(JSON.stringify(res))
      console.log(res.data)
      setData(res.data);
      setLoad(false);

    } catch (err) {
      console.log(err.response)
    }
  }

  // setLoad(false);
  useEffect(() => {
    fetchData()
  }, []);


  return (
    <main>
      {/* <!--? slider Area Start --> */}
      <Header type="Latest Products" />
      {/* <!-- slider Area End--> */}
      {/* <!-- ? New Product Start --> */}
      <section class="blog_area section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mb-5 mb-lg-0">
              <div class="blog_left_sidebar">






                <article class="blog_item">
                <div className="watch-area section-padding30">
                  <div className="container">
                    {isLoading === true ? (<></>) : (
                      <div className="row">
                        {data.map((d) => <Big props={d} key={d.Id} />).sort(compare)}

                      </div>
                    )}
                  </div>
                  </div>
                </article>

                

                
              </div>
            </div>
            <Side></Side>
          </div></div></section>


      {/* <!--? Watch Choice  Start--> */}
      

    </main>
  )
}

export default New_products