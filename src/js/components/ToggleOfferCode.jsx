import React from 'react';
import Firebase from 'firebase';

var OfferCodeButton = React.createClass({

  getInitialState: function(){
    return ({
      toggleButton: "inline-block",
      toggleOfferCode: "none"
    });
  },

  toggleOffer: function(){
    var _this = this;
    var barOfferToggleButton = _this.props.offerDetails.barName.replace(/\"/g,"") + "-" + _this.props.offerDetails.endTime;
    var toggleButton = document.getElementById(barOfferToggleButton);
    var toggleOffer = document.getElementById(_this.props.offerDetails.offerCode);
    // console.log('inside toggleOffer', toggleButton.getAttribute("style"));
    (toggleButton.getAttribute("style").match('inline-block')) ?
    (_this.setState({
      toggleButton: "none",
      toggleOfferCode: "block"
    })) : (_this.setState({
      toggleButton: "inline-block",
      toggleOfferCode: "none"
    }))
  },

  render: function() {
    var _this = this;
    var barName = _this.props.offerDetails.barName.replace(/\"/g,"");
    var barOfferEndTime = _this.props.offerDetails.endTime;
    var barOfferToggleButton = barName + "-" + barOfferEndTime;
    return (
      <div className="info">
        <button onClick={_this.toggleOffer} id={barOfferToggleButton} className="show-code-button btn btn-sm" style={{display: _this.state.toggleButton}}> Show Code</button>
        <h3 onClick={_this.toggleOffer} id={_this.props.offerDetails.offerCode} className="code" style={{display: _this.state.toggleOfferCode}}>{_this.props.offerDetails.offerCode}</h3>
      </div>
    )
  }
})

export default OfferCodeButton;
