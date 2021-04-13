import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import Home from "./pages/home";
import ConfirmPassword from "./pages/confirmPassword";

function App() {
  return (
    <Router>
      <div className="">
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/confirmPassword" component={ConfirmPassword}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
