import React from 'react';
import Firebase from 'firebase';
import BarLocation from './BarLocation.jsx'

var IndividualOffer = React.createClass({

  componentDidMount: function (){
    var self = this;
    var id = self.props.offerDetails.barName.replace(/\"/g,"")
    document.getElementById(id).addEventListener("click", function(){
      var pId = self.props.offerDetails.offerCode
      document.getElementById(id).setAttribute("style", "display:none")
      document.getElementById(pId).setAttribute("style", "display:block")
    });
  },

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
        <div className="info">
          <button id={_this.props.offerDetails.barName.replace(/\"/g,"")} className="show-code-button btn btn-lg">Show Code</button>
          <h3 id={_this.props.offerDetails.offerCode} className="code">{_this.props.offerDetails.offerCode}</h3>
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
