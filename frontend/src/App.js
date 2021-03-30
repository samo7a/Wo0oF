import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// const app_name = 'wo0of';
// function buildPath(route){
// 	if (process.env.NODE_ENV === 'production') return 'https://' + app_name +  '.herokuapp.com/' + route;
// 	else return 'http://localhost:5000/' + route;


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
