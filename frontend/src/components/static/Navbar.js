
function Navbar() {
    return (
      <div>
          <header>
        
        <div className="header-area">
            <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="menu-wrapper">
                        
                        <div className="logo">
                            <a href="index.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                        </div>
                        
                        <div className="main-menu d-none d-lg-block">
                            <nav>                                                
                                <ul id="navigation">  
                                    <li><a href="index.html">Home</a>
                                        <ul className="submenu">
                                            <li><a href="login">Login</a></li>
                                            <li><a href="cart.html">Popular</a></li>
                                            <li><a href="elements.html">My Feed</a></li>
                                            <li><a href="confirmation.html">Latest Additions</a></li>
                                            
                                        </ul>
                                    </li>
                                    <li><a href="shop.html">Products</a></li>
                                    
                                    
                                    <li><a href="#">Request Product</a>
                                        
                                    </li>
                                    <li><a href="contact">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                        
                        <div className="header-right">
                            <ul>
                                <li>
                                    <div className="nav-search search-switch">
                                        <span className="flaticon-search"></span>
                                    </div>
                                </li>
                                <li> <a href="login.html"><span className="flaticon-user"></span></a></li>
                                <li><a href="cart.html"><span className="flaticon-shopping-cart"></span></a> </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </header>
      </div>
    );
  }
  
  export default Navbar;