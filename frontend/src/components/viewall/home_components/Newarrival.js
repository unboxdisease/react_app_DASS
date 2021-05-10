import { ProgressBar } from "react-bootstrap";
import {Link} from "react-router-dom";
function Arrival(props) {
    const Productdata = {
        name : props.props.Name,
        price : props.props.Price
    }
    // console.log(props.props.Image)
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    let imgstr;
    
    const defstrg = 'assets/img/gallery/popular1.png'
    if(isJson(props.props.Image) )
    {
        let a = JSON.parse(props.props.Image)
        console.log(a)
        if (a instanceof Object)
        {
            imgstr = Object.entries(a)[0][1]
        }
        else
        {
            imgstr = defstrg
        }
    }
    else
    {
        imgstr = defstrg
    }
    console.log(imgstr)
    return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <Link to={
                        {
                            pathname: "/viewProduct" ,
                            Idprops: props.props.Id
                        }
                    }>
        <div className="single-new-pro mb-30 text-center">
            <div className="product-img">
                <img src={imgstr} alt=""/>
                
            </div>
            <div className="product-caption">
                <h3><a href="product_details.html">{Productdata.name}</a></h3>
                <span>₹ {Productdata.price}</span>
            </div>
        </div>
        </Link>
    </div>
    );
  }
  
  export default Arrival;