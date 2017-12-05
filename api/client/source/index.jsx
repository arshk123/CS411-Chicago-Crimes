import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, browserHistory, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import PoliceHome from './components/PoliceHome/PoliceHome.jsx'
import Map from './components/Map/Map.jsx'
import Login from './components/Login/Login.jsx'
import PoliceLogin from './components/Login/PoliceLogin/PoliceLogin.jsx'

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');
// <Route exact path="/policelogin" component={PoliceLogin}/>
render(
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/map" component={Map}/>
      <Route exact path="/login" component={Map}/>
      <Route exact path="/civilian" component={Map}/>
      <Route exact path="/policelogin" component={PoliceLogin}/>
      <Route exact path="/policehome" component={PoliceHome}/>
    </Switch>
  </Router>,
  document.getElementById('app')
);
