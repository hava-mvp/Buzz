var React = require('react');
import {Link} from 'react-router';


var NavBar = React.createClass({

  render : function (){
    return (
      <div>
        <img src = {"https://camo.githubusercontent.com/9b080a763e13fc469f2df5a7151bbcd4b96856c9/68747470733a2f2f66696c65732e6769747465722e696d2f6a61636b6361726c69736c652f6a6e444e2f6c6f676f2d677265656e2d696e7665727465642e706e67"} className="havaLogo"/>
      </div>

    )
  }
});

module.exports = NavBar;
