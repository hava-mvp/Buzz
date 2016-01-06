import React from 'react';

let SocialMediaLinks = React.createClass({
  render: function() {
    return (
      <div className='row'>
        <a href="https://www.instagram.com/?hl=en">
          <img className='icon-in' src="https://cdn1.iconfinder.com/data/icons/simple-icons/4096/instagram-4096-black.png"/>
        </a>
        <a href="https://www.facebook.com/">
          <img className='icon-fb' src="https://vectorlogofree.com/wp-content/uploads/2014/07/25305-facebook-sign-of-letter-f-inside-a-black-rounded-square-shape-icon-vector-icon-vector-eps.png"/>
        </a>
        <a href="https://twitter.com/">
          <img className='icon-tw' src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/twitter_circle_black-512.png"/>
        </a>
      </div>
    );
  }
});

module.exports = SocialMediaLinks;
