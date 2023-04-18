import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import Navbar from './component/NavBar/navbar';
import FooterComp from './component/Footer';
import { AuthProvider } from './useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
    <Navbar />
    <App />
    <FooterComp />
    </AuthProvider>
    </Router>
  </React.StrictMode>
);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();