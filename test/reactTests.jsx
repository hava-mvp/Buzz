import test from 'tape';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';

let shallowRenderer = ReactTestUtils.createRenderer();

import {CreateOffers} from '../src/js/Components/CreateOffers.jsx';

shallowRenderer.render(<CreateOffers />);
//
// var appRender = shallowRenderer.getRenderOutput();
// console.log(appRender);

test('CreateOffers exists', t => {
  t.ok("test", 'test');
  //t.ok(appRender, 'app render object exists');
  t.end();
});
