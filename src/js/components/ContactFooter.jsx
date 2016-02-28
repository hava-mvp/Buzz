import React from 'react';
import Firebase from 'firebase';

var checkLocalStorage = function() {
  var barName = localStorage.getItem('havaBarName');
  if(barName !== null) {
    return;
  } else {
    navigateToPage('/');
  }
}

var navigateToPage = (pageUrl) => {
  window.location = pageUrl;
}

var ContactFooter = React.createClass({
  componentWillMount: function() {
    checkLocalStorage();
  },

  handleClickOnFooter: function(){
    var _this = this;
    console.log('THIS!!!', _this);
    window.location.assign(this.props.navigateTo);
  },

  render: function() {
    return (
      <div className="site-footer offer-footer">
        <p type="submit" className="footer-text" onClick={this.handleClickOnFooter}>{this.props.footerName}</p>
      </div>
    )
  }
});

export default ContactFooter;
