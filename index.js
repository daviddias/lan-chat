var node = require('./src/lib/discovery.js');

var port = process.argv[2];

var main = function() {
  console.log('starting lan-chat');
  node.join_network(function() {
    node.publish();
  });
};

main();
