import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Dashboard from '../Dashboard/index';

const Routing = () => {
  return (
    <Router>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Signup} />
    </Router>
  );
}

export default Routing;