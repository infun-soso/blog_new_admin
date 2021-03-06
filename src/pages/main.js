import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import AdminIndex from './adminIndex';

function Main(props) {
  return (
    <Router>
      <Route path='/login' exact component={Login}/>
      <Route path='/index' component={AdminIndex}/>
    </Router>
  )
}

export default Main