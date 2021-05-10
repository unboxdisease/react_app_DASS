import {Link} from "react-router-dom";
function Popular(props) {
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
            <div className="single-popular-items mb-50 text-center">
                <div className="popular-img">
                    <img src={imgstr} alt=""/>
                    <div className="img-cap">
                        <span>Add to cart</span>
                    </div>
                    <div className="favorit-items">
                        
                    </div>
                </div>
                <div className="popular-caption">
                    <h3><a href="product_details.html">{props.props.Name}</a></h3>
                    <span>$ {props.props.Price}</span>
                </div>
            </div>
            </Link>
        </div>
    );
  }
  
  export default Popular;