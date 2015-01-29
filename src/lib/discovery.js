var zmq   = require('zmq'),
ip        = require('ip')


var PORT = ":6665"  
//harcoded subnet #TODO: automatically set the subnet
var subnet = "tcp://192.168.2."


//#TODO: dynamic check
var scrape = function(cb) {
  console.log("scrapping network...")
  for(var i=1; i<255; i++) {
    subscribe_attempt(subnet+i+PORT)
  }
  cb()
}


var subscribe_attempt = function(addr) {
  var sock_sub  = zmq.socket('sub')
  //console.log(addr)
  sock_sub.connect(addr)
  sock_sub.subscribe("")

  sock_sub.on('message', function(env, data){
    console.log(env.toString()) 
  })
}


var publish = function(){
  var sock_pub  = zmq.socket('pub')
  var my_port  = "tcp://"+ip.address()+PORT

  console.log(my_port)
 
  sock_pub.bind(my_port, function(err){
    if(err) {
      console.log("err: "+err)
      return       
    } 

    //#TODO: get input from stdin
    setInterval(function(){
      sock_pub.send("I'm a client and a server") 
    }, 2000)  
  }) 
}


exports.publish = publish
exports.join_network = scrape
