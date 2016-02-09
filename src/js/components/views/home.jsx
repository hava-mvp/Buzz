import React from 'react';
import Formsy from 'formsy-react';
import { Input } from 'formsy-react-components';


let Home = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome To Hava</h1>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Home;
