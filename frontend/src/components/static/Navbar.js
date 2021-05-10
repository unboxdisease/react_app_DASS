import React from 'react'
import Cookies from 'js-cookie'
import '../../css/navbarnew.css'
function Navbar () {
  let loginUrl = Cookies.get('token') ? '/profile' : '/login'
  return (
    <div class='navigation-wrap bg-light start-header start-style'>
      <div class='container'>
        <div class='row'>
          <div class='col-12'>
            <nav class='navbar navbar-expand-md navbar-light'>
              <a
                class='navbar-brand'
                href='/home'
                target='_blank'
              >
                <img src='assets/img/logo/logo.png' alt='' />
              </a>

              <button
                class='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span class='navbar-toggler-icon' />
              </button>

              <div class='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul class='navbar-nav ml-auto py-4 py-md-0'>
                  <li class='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
                    <a
                      class='nav-link '
                      href='/home'
                    >
                      Home
                    </a>
                    
                  </li>
                  
                  <li class='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
                    <a
                      class='nav-link dropdown-toggle'
                      data-toggle='dropdown'
                      href='/viewAll'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      Products
                    </a>
                    <div class='dropdown-menu'>
                    <a class='dropdown-item' href='/viewAll'>
                       All Products
                      </a>
                      <a class='dropdown-item' href='/new'>
                        Latest Products
                      </a>
                      <a class='dropdown-item' href='/popular'>
                        Popular Products
                      </a>
                      {loginUrl === "/profile" ? (<a class='dropdown-item' href='/feed'>
                        My Feed
                      </a>):(<></>)}
                      
                      
                    </div>
                  </li>
                  
                  <li class='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
                    <a class='nav-link' href='/contact'>
                      Contact
                    </a>
                  </li>
                  {loginUrl === "/login" ? (<li class='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
                    <a class='nav-link' href='/login'>
                      Login
                    </a>
                  </li>) : (
                    <li class='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
                    <a class='nav-link' href='/profile'>
                       My Profile
                    </a>
                  </li>
                  )}
                  
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
