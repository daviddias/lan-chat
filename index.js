var node = require('./src/lib/discovery.js')

var main = function() {
  console.log("starting lan-chat")
  node.join_network(function(){
    node.publish()  
  })
}

main()
