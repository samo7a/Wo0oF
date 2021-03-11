import logo from './logo.svg';
import './App.css';

// const app_name = 'wo0of';
// function buildPath(route){    
// 	if (process.env.NODE_ENV === 'production') return 'https://' + app_name +  '.herokuapp.com/' + route;
// 	else return 'http://localhost:5000/' + route;    
					
// }
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
