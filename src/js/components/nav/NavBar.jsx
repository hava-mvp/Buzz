var React = require('react');
import {Link} from 'react-router';


var NavBar = React.createClass({

  // componentDidMount: function() {
  //   document.getElementById('contactBtn').addEventListener('click', function(){
  //     window.location.assign("/public/#/customer-contact");
  //   })
  // },

  render : function (){

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Hava</a>
            <Link to="/public/#/customer-contact" className="navbar-brand">Contact</Link>
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = NavBar;


//<button type="submit" id="contactBtn" className="btn btn-default">Contact</button>
