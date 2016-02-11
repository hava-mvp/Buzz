import React from 'react';



var IndividualOffer = React.createClass({

  componentDidMount: function (){
    var buttons = document.getElementsByClassName('show-code-button')[0].outerHTML
    buttons.addEventListener('click', function(){
      console.log('>>>>>>',document.getElementsByClassName('show-code-button')[0].outerHTML);
      console.log('ID>>',document.getElementById('button'));

      document.getElementById("showCode").innerHTML = "CODEEEEE";
    })
  },

  render: function() {
    console.log("THIS--->>>>>",this.props.offerDetails.barName);
    return (
      <li className="listItem">
        <hr className="line" />
        <div className="barName">
          {this.props.offerDetails.barName.replace(/\"/g,"")}
        </div>
        <div className="info">
          {this.props.offerDetails.offer}
        </div>
        <div className="info">
          End Time: {this.props.offerDetails.endTime}
        </div>
        <div id="showCode" className="info">
          <button id="button" className="show-code-button btn btn-xs">Show Offer Code</button>
        </div>
      </li>
    )
  }
})

export default IndividualOffer;


// <div className="outer">
//   <div className="inner">
//     End Time: {this.props.offerDetails.endTime}
//   </div>
//   <div className="inner">
//     <button id="button" className="show-code-button btn btn-xs">Show Offer Code</button>
//   </div>
// </div>
