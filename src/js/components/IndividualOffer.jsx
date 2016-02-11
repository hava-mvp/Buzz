import React from 'react';



var IndividualOffer = React.createClass({

  componentDidMount: function (){

  },

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
        <div className="outer">
          <div className="inner">
            End Time: {this.props.offerDetails.endTime}
          </div>
          <div className="inner">
            <button id="button" className="show-code-button btn btn-xs">Show Offer Code</button>
          </div>
        </div>
      <hr class="line" />
      </li>
    )
  }
})

export default IndividualOffer;
