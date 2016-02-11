var React = require('react');
import {Link} from 'react-router';


var NavBar = React.createClass({

  componentDidMount: function() {
    document.getElementById('contactBtn').addEventListener('click', function(){
      window.location.assign("/public/#/customer-contact");
    })

    document.getElementById('backBtn').addEventListener('click', function(){
      window.location.assign("/public/#/live-offers");
    })
  },

  render : function (){
    if (true){
      return (
        <div>
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Hava</a>
              <button type="submit" id="contactBtn" className="btn btn-default">Contact</button>
            </div>
          </nav>
        </div>
      )
    } else {
      return (
        <div>
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Hava</a>
              <button type="submit" id="customerLoginBtn" className="btn btn-default">Back</button>
            </div>
          </nav>
        </div>
      )
    }
  }
});

module.exports = NavBar;

//window.location.match
