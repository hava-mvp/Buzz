// var log = require('why-is-node-running')
var test = require('tape');
var start = require('../lib/start.js');
var server = require('../lib/index.js');
var sendTextMessage = require('../lib/sendTextMessage.js').sendTextMessage;

var payloadString = "offer=This%20is%20a%20test&endTime=7pm";
//var request = require('./testData.js')

test('simple server running', function(t) {
  var options = {
    method: "GET",
    url: "/"
  };

  server.inject(options, function(response) {
    t.equal(response.statusCode, 200, '200 status code returned');
    server.stop(t.end);
  });
});

test('public served', function(t) {
  var options = {
    method: "GET",
    url: "/index.html"
  };
  server.inject(options, function(response) {
    t.equal(response.statusCode, 200, '200 status code returned');
    server.stop(t.end);
  });
});

// test('server dealing with post request', function(t) {
//   var options = {
//     method: "POST",
//     url: "/sendTextMessage",
//     payload: payloadString
//     };
//   server.inject(options, function(response) {
//     console.log("RESPOSE--->>>>>>", response);
//     t.equal(response.statusCode, 200, '200 status code returned');
//     server.stop(t.end);
//   });
// });

test('sendTextMessage', function(t) {
  var offer =  "This is a test offer";
  var endTime = "16:00";
  var barName = "Pub Ruth";

  var actual = 'Hello! Pub Ruth has a new offer: This is a test offer. The offer ends at 16:00. Click the link below to get your code. http://hava-mvp.herokuapp.com/#/live-offers';
    sendTextMessage(offer,endTime, barName, function(response){
      var expected = 'Hello! ' + barName + ' has a new offer: ' + offer + '. The offer ends at ' + endTime + '. Click the link below to get your code. http://hava-mvp.herokuapp.com/#/live-offers';
      t.equal( actual , expected, "Passed" );
      server.stop(t.end);
    })
  });
