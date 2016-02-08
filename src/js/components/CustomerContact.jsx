import React from 'react';

var CustomerContact = React.createClass({

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div>
        <h2>Contact Us</h2>

          <p>
            Email us at:
            <a href="mailto:office@hava-app.com" target="_top">office@hava-app.com</a>
          </p>

          <div className='row social'>
          <a href="https://www.instagram.com/thehavaapp/">
            <img className='icon-in' src="https://cdn1.iconfinder.com/data/icons/simple-icons/4096/instagram-4096-black.png"/>
          </a>
          <a href="https://www.facebook.com/">
            <img className='icon-fb' src="https://vectorlogofree.com/wp-content/uploads/2014/07/25305-facebook-sign-of-letter-f-inside-a-black-rounded-square-shape-icon-vector-icon-vector-eps.png"/>
          </a>
          <a href="https://twitter.com/thehavaapp">
            <img className='icon-tw' src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/twitter_circle_black-512.png"/>
          </a>
        </div>
      </div>
    )
  }
});

export default CustomerContact;
