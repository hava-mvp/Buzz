var React = require('react');
import { Link } from 'react-router';


var Footer = React.createClass({

  render : function (){

    return (
      <div>
        <footer class="footer">
         <div class="container">
           <p class="text-muted">Place sticky footer content here.</p>
         </div>
       </footer>
      </div>
    )
  }
});

module.exports = Footer;
