import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Home from './pages/home';
import NavbarProfile from './pages/components/navbar';
import Header from './pages/components/header';
import Profile from './pages/profile';
import DogManager from './pages/dogManager';

// const app_name = 'wo0of';
// function buildPath(route){
// 	if (process.env.NODE_ENV === 'production') return 'https://' + app_name +  '.herokuapp.com/' + route;
// 	else return 'http://localhost:5000/' + route;


function App() {
  const [isOwner, setisOwner] = useState(false);
  const handleIsOwner = () => setisOwner(!isOwner); // somehow figure out if owner

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          {/* <Header/>
          <NavbarProfile /> */}
          <Route path="/home" >
            {isOwner ? <DogManager /> : <Home />}
          </Route>
          <Route path="/profile" component={Profile}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
