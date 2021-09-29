import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Header from './components/header';
import { ThemeProvider } from "@mui/material";
import Home from './components/home';
import Admin from './components/admin';


function App() {
 
  return (
    <div className="App">
      
      <Router>
        <Header></Header>
        <Route component={Home} path="/home"></Route>

      <Route component={Signup} path="/signin"></Route>
      <Route component={Login} path="/login"></Route>   
      <Route component={Admin} path="/admin"></Route>  
      </Router>
      
    </div>
    
  );
}

export default App;
