var Command = require('ronin').Command;
var duplex = require('duplex');
var reader = require('../../lib/reader.js');
var Messenger = require('../../lib/messenger.js');

var LanChat = Command.extend({
    desc: 'join the lan chat',

    options: {
        name: {
            type: 'string',
            alias: 'n'
        },
        auth: {
            type: 'boolean',
            alias: 'a'
        }
    },

    run: function (name, auth) {
        if (!name) {
            console.log('--name required');
            process.exit(1);
        }
        console.log('join command', name, auth);
        var messenger = new Messenger();
        messenger.start(function ready() {
            messenger.scan(); 
        });
        var lineStream = duplex();
        reader(lineStream);
        lineStream.on('_data', function(data){
            console.log('a enviar:', data);
        });

    }
});

module.exports = LanChat;
