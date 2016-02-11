var React = require('react');
import { Link } from 'react-router';


var Footer = React.createClass({

  conponentDidMount: function(){

    document.getElementById('contactBtn').addEventListener('click', function(){
      if(window.location.match)
        window.location.assign("/public/#/customer-contact");
    })
  },

  render : function (){

    return (
      <div>
        <p type="submit" id="contactBtn" className="navbar-brand">Having Issues? Contact Us</p>
      </div>
    )
  }
});

module.exports = Footer;
// <Link to="/public/#/customer-contact" className="navbar-brand">Contact Us</Link>
