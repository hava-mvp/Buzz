import React from 'react';



var IndividualOffer = React.createClass({
  render: function() {
    console.log("THIS--->>>>>",this.props.offerDetails.barName);
    return (

      <li className="listItem">
        <div className="barName">
          {this.props.offerDetails.barName.replace(/\"/g,"")}
        </div>
        <div>
          {this.props.offerDetails.offer}
        </div>
        <div>
          {this.props.offerDetails.endTime}
        </div>
        <div>
          Show Offer Code
        </div>
      </li>

    )
  }
})

export default IndividualOffer;
