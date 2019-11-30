import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import Nav from './components/Nav'
import Footer from './components/Footer'

import Home from './pages/Home'
import Generate from './pages/Generate'
import Create from './pages/Create'
import Login from './pages/Login'
import Profile from './pages/Profile'


import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/generate" component={Generate} />
        <Route exact path="/create" component={Create} /> 
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={Home} />
        <Route exact path="/palette/:id" />
        <Route />
      </BrowserRouter>
    </div>
  );
}

export default App;
