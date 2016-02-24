import React from 'react';

var checkLocalStorage = () => {
  var barName = localStorage.getItem('havaBarName');
  var customerId = localStorage.getItem('havaid');
  if(barName === null && customerId === null) {
    console.log('not logged in');
    return;
  } else if (barName !== null && customerId === null)  {
    console.log('barname loggedin');
    navigateToNextPage('/public/#create-offers');
  } else if (barName === null && customerId !== null)  {
    console.log('customer logged in');
    navigateToNextPage('/public/#live-offers');
  } else {
    // if barName and customerId in localStorage:
    console.log('BOTH logged in');
    navigateToNextPage('/public/#create-offers');
  }
}

var navigateToNextPage = (location) => {
  window.location = location;
}

var Index = React.createClass({

  handleBarClick: function(){
    window.location.assign("/public/#bar");
  },

  handleCustomerClick: function(){
    window.location.assign("/public/#customer");
  },

  componentWillMount: function(){
    checkLocalStorage();
  },

  render: function() {
    return (
      <div>
        <div className="wrapper">
          <h3 className="index-title">Are you a bar or a customer?</h3>
          <button onClick={this.handleBarClick} className="index-button btn btn-default">Bar</button>
          <button onClick={this.handleCustomerClick} className="index-button btn btn-default">Customer</button>
        </div>
      </div>
    )
  }
})

export default Index;
