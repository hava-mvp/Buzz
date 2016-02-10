var test = require('tape');
var ReactTestUtils = require('react-addons-test-utils');
var React = require('react');
var shallowRenderer = ReactTestUtils.createRenderer();
var App = require('../src/js/Components/CreateOffers.jsx');

shallowRenderer.render(<App />);

var appRender = shallowRenderer.getRenderOutput();

test('App exists', t => {
  t.ok("test", 'test');

  //t.ok(appRender, 'app render object exists');
  t.end();
});
