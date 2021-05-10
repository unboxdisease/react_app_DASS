import {Link} from "react-router-dom";
function Big(props) {
    
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

        <div className="row align-items-center justify-content-between">

            <div className="col-lg-6 col-md-6 col-sm-10">
                <div className="choice-watch-img mb-40">
                <img src={imgstr} alt=""  style={{width: "100%", maxWidth: "385px"}}/>
                    
                </div>
            </div>
            {/* <left> */}
            <div className="col-lg-5 ">
                <div className="watch-details mb-40">
                    <h3>{props.props.Name}</h3>
                    <h2>₹
{props.props.Price}</h2>
                    <p>{props.props.Description}</p>
                    
                    <Link to={
                        {
                            pathname: "/viewProduct" ,
                            Idprops: props.props.Id
                        }
                    }>
                      <button className = "btn"> View Product</button>
                    </Link>
                </div>
            </div>
            {/* </left> */}
        </div>
    );
}

export default Big;