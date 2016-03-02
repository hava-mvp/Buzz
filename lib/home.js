var sendTextMessage = require('./sendTextMessage.js').sendTextMessage;

exports.register = function(server, options, next) {

server.route([
  {
    method: 'GET',
    path: '/{param*}',
    config: {
      description: 'return the app',

      handler: {
        directory: {
          path: 'public',
          listing: true
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/sendTextMessage',
    config: {
      description: 'send a text message on buzz',

      handler: function(request, reply) {
        var offer   = request.payload.split('offer=')[1].split('&endTime')[0].replace(/'%20'/g, ' ');
        var endTime = request.payload.split('endTime=')[1].split('&barName')[0].replace(/'%20'/g, ' ');
        var barName = request.payload.split('barName=')[1]
        var all = "offer:" + offer + " endTime:" + endTime + " barName:" + barName
        sendTextMessage(offer, endTime, barName, function(response){
          console.log('CALLED BACK!!: ' + response);
          var messagesNotSent = new RegExp('notOk', 'g');
          if (response.match(messagesNotSent)) {
            reply('notOk')
          } else {
            reply('ok');
          }
        });
      }
    }
  }
]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
