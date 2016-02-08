import React from 'react';

const Offer = ({video}) => {

  return (
    <li>
          <div>{video.snippet.title}</div>
    </li>
  );
}

export default Offer;
