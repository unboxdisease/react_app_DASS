function Footer () {
  return (
    <div>
      <footer>
        <div className='footer-area footer-padding'>
          <div className='container'>
            <div className='row d-flex justify-content-between'>
              <div className='col-xl-3 col-lg-3 col-md-5 col-sm-6'>
                <div className='single-footer-caption mb-50'>
                  <div className='single-footer-caption mb-30'>
                    <div className='footer-logo'>
                      <a href='index.html'>
                        <img src='assets/img/logo/logo.png' alt='' />
                      </a>
                    </div>
                    <div className='footer-tittle'>
                      <div className='footer-pera'>
                        <p>
                          Find unique products curated just for you. Check out My Feed under the Products tab to get a list of products suitable for your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-2 col-lg-3 col-md-3 col-sm-5'>
                <div className='single-footer-caption mb-50'>
                  <div className='footer-tittle'>
                    <h4>Quick Links</h4>
                    <ul>
                      <li>
                        <a href='/contact'>Contact</a>
                      </li>
                      <li>
                        <a href='/feed'>My Feed</a>
                      </li>
                      <li>
                        <a href='/profile'>Profile</a>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-4 col-sm-7'>
                <div className='single-footer-caption mb-50'>
                  <div className='footer-tittle'>
                    <h4>My Profile</h4>
                    <ul>
                      <li>
                        <a href='/home'>home</a>
                      </li>
                      <li>
                        <a href='/profile'>Profile</a>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-5 col-sm-7'>
                <div className='single-footer-caption mb-50'>
                  <div className='footer-tittle'>
                    <h4>Products</h4>
                    <ul>
                      <li>
                        <a href='/new'>Latest Products</a>
                      </li>
                      <li>
                        <a href='/popular'>Popular Products</a>
                      </li>
                      <li>
                        <a href='/feed'>MyFeed</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='row align-items-center'>
              <div className='col-xl-7 col-lg-8 col-md-7'>
                <div className='footer-copy-right'>
                 
                </div>
              </div>
              <div className='col-xl-5 col-lg-4 col-md-5'>
                <div className='footer-copy-right f-right'>
                  <div className='footer-social'>
                    <a href='#'>
                      <i className='fab fa-twitter'></i>
                    </a>
                    <a href='https://www.facebook.com/sai4ull'>
                      <i className='fab fa-facebook-f'></i>
                    </a>
                    <a href='#'>
                      <i className='fab fa-behance'></i>
                    </a>
                    <a href='#'>
                      <i className='fas fa-globe'></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='search-model-box'>
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <div className='search-close-btn'>+</div>
          <form className='search-model-form'>
            <input
              type='text'
              id='search-input'
              placeholder='Searching key.....'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Footer
