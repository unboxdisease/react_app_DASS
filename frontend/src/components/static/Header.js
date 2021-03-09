function Header (props) {
  return (
    <div class='slider-area '>
      <div class='single-slider slider-height2 d-flex align-items-center'>
        <div class='container'>
          <div class='row'>
            <div class='col-xl-12'>
              <div class='hero-cap text-center'>
                <h2>{props.type}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
