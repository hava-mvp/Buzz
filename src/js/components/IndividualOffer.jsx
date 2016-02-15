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
          End Time: {_this.props.offerDetails.endTime}
        </div>
        <ToggleOfferCode offerDetails={_this.props.offerDetails}/>
        <BarLocation offerDetails={_this.props.offerDetails.barName}/>
      </li>
    </div>
    )
  }
})

export default IndividualOffer;
