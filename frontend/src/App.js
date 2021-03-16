import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css'
import Login from './components/viewall/Login';
import Register from './components/viewall/Register';
import Contact from './components/viewall/Contact';
import Navbar from './components/static/Navbar';
import Footer from './components/static/Footer'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/contact' component={Contact} />
      </Router>
      <Footer />
    </div>
  )
}

export default App
