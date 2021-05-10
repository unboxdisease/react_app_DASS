import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Header from "../static/Header";
import { Button } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import axios from "axios";
import Cookies from "js-cookie";

function ProductDisplay(props) {
  const prop = { props: { id: props.location.Idprops } }
  console.log(prop)
  let [rated, setRated] = useState({ rated: -1 });
  const [ratenow, setRateNow] = useState({ ratenow: 0 });
  const [data, setData] = useState({
  //   Name: 'Product1',
  //   Price: 200,
  //   Description: null,
  //   Clicks: 0,
  //   Rating: 0,
  //   Purchases: 0,
  //   Third_Party: 'http://www.google.com/',
  //   Image: '{"Image_1":"https://images-na.ssl-images-amazon.com/images/I/71wkpcIfqdL._AC_SL1500_.jpg","Image_2":"https://images-na.ssl-images-amazon.com/images/I/91HL52U9OXL._AC_SL1500_.jpg"}',
  //   Publish_Date: '2021-02-14 21:44:29',
  //   About: {
  //     good: 'yes',
  //     worth: 'nah'
  //   },
  //   Specifications: {
  //     Height: '108.1191',
  //     Width: '101001',
  //     SARS_COV: 'Yes'
  //   },
  //   Unique_Features: {
  //     'I am unique?': 'Yes you are because you are',
  //     'Am I unique?': 'Have confidence dude...'
  //   },
  //   Categories: null,
  //   Tags: null
  });
  // const [isLoading, setLoad] = useState(true)
  async function send_request_rating(rat) {
    try {
      const token = Cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log("Rating Sent:", { Value: rat, ProductId: prop.props.id });
      const res = await axios.post(
        "http://localhost:8000/api/ratings/rateProduct.php",
        { Value: rat, ProductId: prop.props.id },
        config
      );

      console.log(JSON.stringify(res));
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  }
  function changeRating(newRating, name) {
    setRateNow({ ratenow: newRating });
    send_request_rating(newRating).then(() =>{
      console.log("New Rating:", ratenow.ratenow);
      fetchData()
    })
  }
  const fetchData = async () => {
    try {
      console.log("Opened Now")
      console.log(prop.props.id);
      let res = await axios.get(`http://localhost:8000/api/products/getOne.php?id=${prop.props.id}`);
      setData(res.data)
      console.log(JSON.stringify(res))
      console.log(res.data)
      const token = Cookies.get("token");
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let res1 = await axios.post(
          "http://localhost:8000/api/ratings/getUserProductRating.php",
          {
            ProductId: prop.props.id
          },
          config
        )
        console.log(res1)
        console.log(res1.data)
        
        setRated(() => {return({ rated: (res1.data.Value instanceof Array ? -1 : parseInt(res1.data.Value)) })});
        // console.log("Ratednow,,,,,",rated.rated)
      }
      for (const [key, value] of Object.entries(data)) {
        console.log(key + ":" + value);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  // setLoad(false);
  useEffect(() => {
      fetchData().then()
  }, []);

  function image_handler() {
    const to_display = [];
    // console.log('Data', data)
    for (const [key, value] of Object.entries(JSON.parse(data["Image"]))) {
      to_display.push(
        <div>
          <img src={value} alt="#" />
        </div>
      )
    }
    return to_display;
  }

  function table_render(element) {
    const to_display = [];
    // console.log('Data', data)
    for (const [key, value] of Object.entries(data[element])) {
      to_display.push(
        <div className="row table-row">
          <div className="col">{key}</div>
          <div className="col">{value}</div>
        </div>
      );
    }
    return to_display;
  }

  function render_unique() {
    const to_display = [];
    console.log("Data", data);
    for (const [key, value] of Object.entries(data["Unique_Features"])) {
      to_display.push(
        <div class="col-md-6 mt-3">
          <div class="single-defination">
            <h4 class="mb-20">{key}</h4>
            <p>{value}</p>
          </div>
        </div>
      );
    }
    return to_display;
  }
  function rating_function() {
    const token1 = Cookies.get("token");
    console.log("Token:", token1);
    console.log("Wgere are you now/");
    if (token1) {
      console.log("Rated", rated.rated);
      if (rated.rated === -1) {
        console.log("Enterred This", ratenow.ratenow);
        return (
          <div className="section-top-border">
            <h3 className="mb-30">Rate It!!!</h3>
            <StarRatings
              rating={ratenow.ratenow}
              starRatedColor="blue"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </div>
        );
      } else {
        return (
          <div className="section-top-border">
            <h3 className="mb-30">Your Rating</h3>
            <StarRatings
              rating={rated.rated}
              starDimension="40px"
              starSpacing="15px"
            />
          </div>
        );
      }
    } else {
      return "";
    }
  }
  async function clickProduct() {
    try {
      let token = Cookies.get("token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log("pid Sent:", { ProductId: prop.props.id });
      let res = await axios.post(
        "http://localhost:8000/api/clicks/clickProduct.php",
        { ProductId: prop.props.id },
        config
      );
      console.log(JSON.stringify(res));
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  }
  function buy_now() {
    let token2 = Cookies.get("token");
    if (token2) {
      if (data["Third_Party"] != null) {
        return (
          <a href={data["Third_Party"]} onClick={async () => {await clickProduct()}}>
            <Button size="lg" block>
              Buy Now
            </Button>
          </a>
        );
      } else {
        // Replace in future...
        return (
          <a href="#" onClick={async () => {await clickProduct()}}>
            <Button size="lg" block>
              Buy Now
            </Button>
          </a>
        );
      }
    } else {
      return (
        <Link to="/login">
          <Button size="lg" block>
            Buy Now
          </Button>
        </Link>
      );
    }
  }
  return (
    <div>
      <Header type="View Product Details" />
      <div class="product_image_area">
        <div class="container">
          <div class="row justify-content-center">
            <div className="col-lg-12">
              {data.Image != null ? (
                <Carousel dynamicHeight="False">{image_handler()}</Carousel>
              ) : (
                <Carousel dynamicHeight="False"><img src = 'assets/img/gallery/popular1.png' /></Carousel>
              )}
            </div>
            <div className="col-lg-8">
              <div className="single_product_text text-center">
                <h1>{data["Name"]}</h1>
                <p>{data["Description"]}</p>
                <div className="row section-top-border">
                  <div className="col-md-6 mb-3">
                    <h4>Price:</h4>
                    <h4>{data["Price"]}</h4>
                  </div>

                  <div className="col-md-6 mb-3">
                    <h4>
                      Rating:{" "}
                      <StarRatings
                        rating={data["Rating"]}
                        starDimension="40px"
                        starSpacing="15px"
                      />
                    </h4>
                  </div>

                  <div className="col-md-12">{buy_now()}</div>
                </div>
                {data["About"] != null ? (
                  <div className="section-top-border">
                    <h3 className="mb-30">About the Product</h3>
                    <div className="progress-table-wrap">
                      <div className="progress-table">
                        <div className="row table-head">
                          <div className="col country">Feature</div>
                          <div className="col visit">Description</div>i
                        </div>
                        {table_render("About")}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {data["Unique_Features"] != null ? (
                  <div className="section-top-border">
                    <h3 className="mb-30">What Is So Unique?</h3>
                    <div class="row justify-content-center">
                      {render_unique()}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {data["Specifications"] != null ? (
                  <div className="section-top-border">
                    <h3 className="mb-30">Specifications</h3>
                    <div className="progress-table-wrap">
                      <div className="progress-table">
                        <div className="row table-head">
                          <div className="col country">Specification</div>
                          <div className="col visit">Description</div>
                        </div>
                        {table_render("Specifications")}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {rating_function()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDisplay;
