var Command = require('ronin').Command;

var LanChat = Command.extend({
  desc: '',
  
  run: function () {
    console.log('run   $lan-chat join --user <yourname>   to join');
  }
});

module.exports = LanChat;
