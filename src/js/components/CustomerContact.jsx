import React from 'react';
import ContactFooter from './ContactFooter.jsx'

var checkLocalStorage = function() {
  var barName = localStorage.getItem('havaid');
  if(barName !== null) {
    return;
  } else {
    navigateToPage('/#customer');
  }
}

var navigateToPage = (pageUrl) => {
  window.location = pageUrl;
}

var CustomerContact = React.createClass({
  componentWillMount: function() {
    checkLocalStorage();
  },

  handleBackClick: function(){
    window.location.assign("/#live-offers");
  },

  render: function() {
    return (
      <div className="contact-wrapper">
        <h2>Contact Us</h2>
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
        <ContactFooter navigateTo={'/#live-offers'} footerName={'Back to Live Offers'} />
      </div>
    )
  }
});

export default CustomerContact;
