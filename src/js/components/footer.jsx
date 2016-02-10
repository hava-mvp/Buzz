var React = require('react');
import { Link } from 'react-router';


var Footer = React.createClass({

  render : function (){

    return (
      <div>
        <Link to="/public/#/customer-contact" className="navbar-brand">Contact Us</Link>
      </div>
    )
  }
});

module.exports = Footer;
