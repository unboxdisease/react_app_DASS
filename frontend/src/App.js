import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css'
import Login from './components/viewall/Login';
import Register from './components/viewall/Register';
import Contact from './components/viewall/Contact';
import Navbar from './components/static/Navbar';
import Footer from './components/static/Footer';
import Home from './components/viewall/Home' ;
import All_products from './components/viewall/All_products';
import Popular_products from './components/viewall/Popular_products';
import New_products from './components/viewall/New_products';
import Profile from './components/loggedin/Profile'
import Curated_feed from './components/loggedin/Curated_feed';
import AddProduct from './components/admin/addProduct'
import EditProduct from './components/admin/editProduct'
import ProductDisplay from './components/viewall/productDisplay';
import AdminLogin from './components/static/AdminLogin';
import AdminCreate from './components/viewall/CreateAdmin';
import AdminStatistics from './components/viewall/AdminStatistics';
import EditProfile from './components/viewall/EditProfile'; 

import AdminDashboard from './components/viewall/AdminDashboard';

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Home} />
        <Route exact path='/viewAll' component={All_products} />
        <Route exact path='/popular' component={Popular_products} />
        <Route exact path='/new' component={New_products} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/feed' component={Curated_feed} />

 
        <Route exact path='/viewProduct' component={ProductDisplay} />
        <Route exact path='/admin_login' component={AdminLogin} />
        <Route exact path='/admin_create' component={AdminCreate} />
        <Route exact path='/admin_statistics' component={AdminStatistics} />
        <Route exact path='/admin_addProduct' component={AddProduct} />

        <Route exact path='/editProfile' component={EditProfile} />

        <Route exact path='/admin_viewProduct' component={EditProduct}/>

        <Route exact path='/admin_dashboard' component={AdminDashboard}/>
      </Router>
      <Footer />
    </div>
  )
}

export default App
