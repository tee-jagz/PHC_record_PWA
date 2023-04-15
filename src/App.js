import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';

import {AppRoutes} from './Routes';
//import './App.css';
import Navbar from './component/NavBar/navbar';
import RegisterPage from './component/register/register';



function App() {
  return (
    <div style={{width:'100%', paddingTop: '10%', paddingLeft: '10px'}}>
    <AppRoutes />
    </div>
    
  );
}



export default App;
