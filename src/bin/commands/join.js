var Command = require('ronin').Command;
var reader = require('../../lib/reader.js');
var duplex = require('duplex');

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
        var lineStream = duplex();
        reader(lineStream);
        lineStream.on('_data', function(data){
            console.log('data', data);
        });

    }
});

module.exports = LanChat;
