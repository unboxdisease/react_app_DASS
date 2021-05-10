import { Link } from 'react-router-dom'
function GridDisplay (props) {
  const styles = {
    border: '1px solid rgba(1, 0, 0, 0.1)',
    width: "100%", maxWidth: "385px"
  }
  function blocks () {
    return props.props.map((item) => {
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
        if(isJson(item.Image) )
        {
            let a = JSON.parse(item.Image)
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
      return (
        <div class='col-xl-4 col-lg-4 col-md-6 col-sm-6 '>
          <Link to={
                        {
                            pathname: "/viewProduct" ,
                            Idprops: item.Id
                        }
                    }>
          <div class='single-popular-items mb-50 text-center'>
            <div class='popular-img'>
              <img
                src={imgstr}
                alt=''
                style={styles}
              />
            </div>
            <div class='popular-caption'>
              <h4>{item.Name}</h4>
              <span>$ {item.Price}</span>
            </div>
          </div>
          </Link>
        </div>
      )
    })
  }
  return (
    <div
      class='tab-pane fade show active'
      id='nav-home'
      role='tabpanel'
      aria-labelledby='nav-home-tab'
    >
      <div class='row'>
        {blocks()}
      </div>
    </div>
  )
}
export default GridDisplay
