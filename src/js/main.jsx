'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import CustomerLogin from './components/CustomerLogin.jsx';
import BarLogin from './components/BarLogin.jsx';
import CreateOffers from './components/CreateOffers.jsx';
import OffersPage from './components/OffersPage.jsx'

let Home = require('./components/views/home.jsx');

require('../styles/main.js');

let rootElement = document.getElementById('react-content');

render((
  <Router>
    <Route path="/">
      <Route path="bar" component={BarLogin} />
      <Route path="create-offers" component={CreateOffers} />
      <Route path="customer" component={CustomerLogin} />
      <Route path="live-offers" component={OffersPage} />
    </Route>
  </Router>
), rootElement);
