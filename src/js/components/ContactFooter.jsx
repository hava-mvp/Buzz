import React from 'react';
import Firebase from 'firebase';

var ContactFooter = React.createClass({
  handleClickOnFooter: function(){
    var _this = this;
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
