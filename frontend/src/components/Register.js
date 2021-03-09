function Register() {
    return (
      <div>
        <body>
      
      <main>
          {/* <!-- Hero Area Start--> */}
          <div class="slider-area ">
              <div class="single-slider slider-height2 d-flex align-items-center">
                  <div class="container">
                      <div class="row">
                          <div class="col-xl-12">
                              <div class="hero-cap text-center">
                                  <h2>Register</h2>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* <!-- Hero Area End--> */}
          {/* <!--================login_part Area =================--> */}
          <section class="login_part section_padding ">
              <div class="container">
                  <div class="row align-items-center">
                      
                      <div class="col-lg-6 col-md-6">
                          <div class="login_part_form">
                              <div class="login_part_form_iner">
                                  <h3>New to our Shop? <br/>
                                      Please enter your details</h3>
                                  <form class="row contact_form" action="#" method="post" novalidate="novalidate">
                                      <div class="col-md-12 form-group p_star">
                                          <input type="text" class="form-control" id="name" name="name" value=""
                                              placeholder="Username"/>
                                      </div>
                                      <div class="col-md-12 form-group p_star">
                                          <input type="password" class="form-control" id="password" name="password" value=""
                                              placeholder="Password"/>
                                      </div>
                                      <div class="col-md-12 form-group">
                                          <div class="creat_account d-flex align-items-center">
                                              <input type="checkbox" id="f-option" name="selector"/>
                                              <label for="f-option">Remember me</label>
                                          </div>
                                          <button type="submit" value="submit" class="btn_3">
                                              log in
                                          </button>
                                          <a class="lost_pass" href="#">forget password?</a>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* <!--================login_part end =================--> */}
      </main>
      <footer>
          
          <div class="footer-area footer-padding">
              <div class="container">
                  <div class="row d-flex justify-content-between">
                      <div class="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                          <div class="single-footer-caption mb-50">
                              <div class="single-footer-caption mb-30">
                                  
                                  <div class="footer-logo">
                                      <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt=""/></a>
                                  </div>
                                  <div class="footer-tittle">
                                      <div class="footer-pera">
                                          <p>Asorem ipsum adipolor sdit amet, consectetur adipisicing elitcf sed do eiusmod tem.</p>
                                  </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-5">
                          <div class="single-footer-caption mb-50">
                              <div class="footer-tittle">
                                  <h4>Quick Links</h4>
                                  <ul>
                                      <li><a href="#">About</a></li>
                                      <li><a href="#"> Offers & Discounts</a></li>
                                      <li><a href="#"> Get Coupon</a></li>
                                      <li><a href="#">  Contact Us</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                          <div class="single-footer-caption mb-50">
                              <div class="footer-tittle">
                                  <h4>New Products</h4>
                                  <ul>
                                      <li><a href="#">Woman Cloth</a></li>
                                      <li><a href="#">Fashion Accessories</a></li>
                                      <li><a href="#"> Man Accessories</a></li>
                                      <li><a href="#"> Rubber made Toys</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                          <div class="single-footer-caption mb-50">
                              <div class="footer-tittle">
                                  <h4>Support</h4>
                                  <ul>
                                      <li><a href="#">Frequently Asked Questions</a></li>
                                      <li><a href="#">Terms & Conditions</a></li>
                                      <li><a href="#">Privacy Policy</a></li>
                                      <li><a href="#">Report a Payment Issue</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div class="row align-items-center">
                      <div class="col-xl-5 col-lg-4 col-md-5">
                          <div class="footer-copy-right f-right">
                              
                              <div class="footer-social">
                                  <a href="#"><i class="fab fa-twitter"></i></a>
                                  <a href="https://www.facebook.com/sai4ull"><i class="fab fa-facebook-f"></i></a>
                                  <a href="#"><i class="fab fa-behance"></i></a>
                                  <a href="#"><i class="fas fa-globe"></i></a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
      </footer>
  
      <div class="search-model-box">
          <div class="h-100 d-flex align-items-center justify-content-center">
              <div class="search-close-btn">+</div>
              <form class="search-model-form">
                  <input type="text" id="search-input" placeholder="Searching key....."/>
              </form>
          </div>
      </div>
      
  
      
  
  </body>
      </div>
    );
  }
  
  export default Register;