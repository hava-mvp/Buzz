import React from 'react';
import Firebase from 'firebase';
import BarLocation from './BarLocation.jsx'
import ToggleOfferCode from './ToggleOfferCode.jsx'

var IndividualOffer = React.createClass({

  render: function() {
    var _this = this;
    return (
    <div>
      <li className="listItem">
        <hr className="line" />
        <div className="barName">
          {_this.props.offerDetails.barName.replace(/\"/g,"")}
        </div>
        <div className="info">
          {_this.props.offerDetails.offer}
        </div>
        <div className="info">
          Offer Expires at: {_this.props.offerDetails.endTime}
        </div>
        <div className="info">
          <ToggleOfferCode offerDetails={_this.props.offerDetails}/>
        </div>
        <div className="info map">
          <BarLocation offerDetails={_this.props.offerDetails.barName}/>
        </div>
      </li>
    </div>
    )
  }
})

export default IndividualOffer;
