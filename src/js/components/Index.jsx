import React from 'react';

var Index = React.createClass({

  handleBarClick: function(){
    window.location.assign("/public/#bar");
  },

  handleCustomerClick: function(){
    window.location.assign("/public/#customer");
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
