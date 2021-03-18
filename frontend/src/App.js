import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Home from '../src/pages/home';

// const app_name = 'wo0of';
// function buildPath(route){    
// 	if (process.env.NODE_ENV === 'production') return 'https://' + app_name +  '.herokuapp.com/' + route;
// 	else return 'http://localhost:5000/' + route;    
					
// }
/**
 * <Router> 
 * <Switch>
 * <Route path="/home" component="/home.js"/> 
 * <Route path="/login" component="/login.js"/>
 * <Route path="/signup" component="/signup.js"/>
 * </Switch>
 * </Router>
 */


function App() {
  return (
    <div className="App">
      <Home/>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js(dont edit me)</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
