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
      description: 'send a text message on buzzß',

      handler: function(request, reply) {
        var offer   = request.payload.split('offer=')[1].split('&endTime')[0].replace(/'%20'/g, ' ');
        var endTime = request.payload.split('endTime=')[1];
        var barName = request.state.havaBarName;
        var all = "offer:" + offer + " endTime:" + endTime + " barName:" + barName
        sendTextMessage(offer, endTime, barName, function(response){
          if (response === 'err') {
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
