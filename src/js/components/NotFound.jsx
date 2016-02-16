import React from 'react';

var NotFound = React.createClass({

  render: function(){
    return(
      <div >
        <div className="not-found-wrapper">
          <p>
          404 page not found
          </p>
          <img className="pint-img" src="http://farm7.static.flickr.com/6176/6206916781_30d8729720.jpg"/>
        </div>
      </div>
    )
  }
});

export default NotFound;
