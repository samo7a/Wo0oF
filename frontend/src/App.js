import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import Home from "./pages/home";
import NavbarProfile from "./pages/components/navbar";
import Header from "./pages/components/header";
import DogManager from "./pages/components/dogManager";
import ConfirmPassword from "./pages/confirmPassword";

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
          <Route path="/confirmPassword" component={ConfirmPassword}></Route>
        </Switch>
        {/* <ConfirmPassword /> */}
      </div>
    </Router>
  );
}

export default App;
