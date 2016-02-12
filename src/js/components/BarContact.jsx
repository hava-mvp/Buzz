import React from 'react';

var BarContact = React.createClass({

  handleBackClick: function(){
    window.location.assign("/public/#create-offers");
  },

  render: function() {
    return (
      <div className="contact-wrapper">
        <h2>Contact Us</h2>
          <p>
            Call the Hava office at: 07xxxxxxxxx
          </p>
          <p>
            Email us at:
            <a href="mailto:office@hava-app.com" target="_top"> office@hava-app.com</a>
          </p>
          <div className='rowSocial'>
            <a href="https://www.instagram.com/thehavaapp/">
              <img className='icon' src="https://cdn1.iconfinder.com/data/icons/iconza-circle-social/64/697067-instagram-512.png"/>
            </a>
            <a href="https://www.facebook.com/">
              <img className='icon' src="https://cdn1.iconfinder.com/data/icons/iconza-circle-social/64/697057-facebook-512.png"/>
            </a>
            <a href="https://twitter.com/thehavaapp">
              <img className='icon' src="https://cdn1.iconfinder.com/data/icons/iconza-circle-social/64/697029-twitter-512.png"/>
            </a>
          </div>
          <div className="site-footer">
            <p onClick={this.handleBackClick} id="contactBtn" className="navbar-brand">Back to Create Offers</p>
          </div>
      </div>
    )
  }
});

export default BarContact;
