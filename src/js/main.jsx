'use strict';

import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import CustomerLogin   from './components/CustomerLogin.jsx';
import BarLogin        from './components/BarLogin.jsx';
import CreateOffers    from './components/CreateOffers.jsx';
import OffersPage      from './components/OffersPage.jsx'
import CustomerContact from './components/CustomerContact.jsx'
import BarContact      from './components/BarContact.jsx'
import NavBar          from './components/nav/NavBar.jsx';
import HavaAdmin       from './components/HavaAdmin.jsx';
import NotFound        from './components/NotFound.jsx';

let Home = require('./components/views/home.jsx');

require('../styles/main.js');

ReactDOM.render(<NavBar />, document.querySelector('.nav-bar'));

class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router>
        <Route path="/">
          <Route path="bar" component={BarLogin} />
          <Route path="create-offers" component={CreateOffers} />
          <Route path="customer-contact" component={CustomerContact} />
          <Route path="bar-contact" component={BarContact} />
          <Route path="customer" component={CustomerLogin} />
          <Route path="live-offers" component={OffersPage} />
          <Route path="hava-admin" component={HavaAdmin} />
          <Route path="*" component={NotFound} />

        </Route>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('.react-content'));
