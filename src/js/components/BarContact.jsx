import React from 'react';
import ContactFooter from './ContactFooter.jsx'

var BarContact = React.createClass({

  handleBackClick: function(){
    window.location.assign("/#create-offers");
  },

  render: function() {
    return (
      <div className="contact-wrapper">
        <h2>Contact Us</h2>
          <p>
            Call the Hava office at: <a href='tel:07821573753'>07821573753</a>
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
          <ContactFooter navigateTo={'/#create-offers'} footerName={'Back to Create Offers'} />
      </div>
    )
  }
});

export default BarContact;
