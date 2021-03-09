import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/contact" component={Contact} />
      </Router>
    </div>
  );
}

export default App;
