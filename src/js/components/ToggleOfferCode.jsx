import React from 'react';
import Firebase from 'firebase';

var OfferCodeButton = React.createClass({

  componentDidMount: function (){
    var _this = this;
    var barName = _this.props.offerDetails.barName.replace(/\"/g,"") ;
    var barOfferEndTime = _this.props.offerDetails.endTime;
    var barOfferToggleButton = barName + "-" + barOfferEndTime;
    document.getElementById(barOfferToggleButton).addEventListener("click", function(){
      var toggleOffer = _this.props.offerDetails.offerCode;
      document.getElementById(barOfferToggleButton).setAttribute("style", "display:none")
      document.getElementById(toggleOffer).setAttribute("style", "display:block")
    });
  },

  render: function() {
    var _this = this;
    var barName = _this.props.offerDetails.barName.replace(/\"/g,"");
    var barOfferEndTime = _this.props.offerDetails.endTime;
    var barOfferToggleButton = barName + "-" + barOfferEndTime;
    return (
      <button id={barOfferToggleButton} className="show-code-button btn btn-lg this">Show Code</button>
      <h3 id={_this.props.offerDetails.offerCode} className="code">{_this.props.offerDetails.offerCode}</h3>
    )
  }
})

export default OfferCodeButton;
