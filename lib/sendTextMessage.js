var env = require('env2')//('.env');
var messagebird = require('messagebird')(process.env.messagebird);
var Firebase = require('firebase');

var messageBird = module.exports = {};

messageBird.sendTextMessage = function(offer, endTime, barName, callback) {
  messageBird.getAllRecipients(function(recipients) {
    console.log('>>>>>>ALL PHONENUMBERS - LENGTH: ', recipients.length);
    var barNameClean = barName.match(/%20/g) ? barName.replace(/%20/g, " ") : barName;
    var offerClean = offer.match(/%20/g) ? decodeURIComponent(offer) : offer;
    var endTimeClean = endTime.replace(/%3A/g, ":").replace(/%20/g, "");
    messageBird.checkArrLength(recipients, barNameClean, offerClean, endTimeClean, callback);
  });
}

messageBird.getAllRecipients = function(callback) {
  console.log('getting back all recipients');
  var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/customer");
  firebaseRef.once('value', function(snapshot) {
    var data = snapshot.val();
    var userIds = Object.keys(data);
    var customerPhoneNumbers = userIds.map(function(customerId){
      return data[customerId]['phoneNumber'];
    });
    callback(customerPhoneNumbers);
  })
}

messageBird.checkArrLength = function(arr, barNameClean, offerClean, endTimeClean, callback) {
  var totalNumberOfBatches = Math.ceil(arr.length/50);
  var batchesOf50;
  var messageSentStatus = [];
  var params = {
    'originator': 'Hava',
    'body': `Hello! ${barNameClean} has a new offer: ${offerClean}. The offer ends at ${endTimeClean}. Click the link below to get your code. http://hava-mvp.herokuapp.com/#live-offers`
  };
  for (var i=0; i<arr.length; i+=50) {
    batchesOf50 = arr.slice(i,i+50);
    messageBird.sendOfferAlert(batchesOf50, params, messageSentStatus, totalNumberOfBatches, callback);
  }
}

messageBird.sendOfferAlert = function(batchOf50, params, messageSentStatus, totalNumberOfBatches, callback) {
  params['recipients'] = batchOf50,

  messagebird.messages.create(params, function (err, response) {
    if (err) {
      console.log('MESSAGE BIRD ERR>>>>>>',err);
      messageBird.haveAllTextsBeenSent('notOk', messageSentStatus, totalNumberOfBatches, callback);
    } else {
      console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
      messageBird.haveAllTextsBeenSent('ok', messageSentStatus, totalNumberOfBatches, callback);
    }
  });
}

messageBird.haveAllTextsBeenSent = function(response, messageSentStatus, totalNumberOfBatches, callback){
  messageSentStatus.push(response);
  console.log('messageSentStatus: ' + messageSentStatus);
  if (messageSentStatus.length === totalNumberOfBatches) {
    const statusOfTexts = messageSentStatus.toString();
    callback(statusOfTexts);
  } else {
    console.log('waiting on messages to be sent');
  }
}
