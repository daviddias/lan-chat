var zmq = require('zmq');
var ip = require('ip');
var PORT = ':6665';
//harcoded subnet #TODO: automatically set the subnet

var subnet = 'tcp://192.168.2.';
//#TODO: dynamic check
var scrape = function(cb) {
    console.log('scrapping network...');
    var ourIp = ip.address();
    var lastByte = parseInt(ourIp.split('.')[3]);
    console.log(lastByte);
    for (var i = 1; i < 255; i++) {
        if (i !== lastByte) {
            subscribeAttempt(subnet + i + PORT);
        }
    }
    cb();
};

var subscribeAttempt = function(addr) {
    var sockSub  = zmq.socket('sub');
    //console.log(addr)
    sockSub.connect(addr);
    sockSub.subscribe('');

    sockSub.on('message', function(env, data) {
        console.log(env.toString());
    });
};

var publish = function() {
    var sockPub  = zmq.socket('pub');
    var myPort  = 'tcp://' + ip.address() + PORT;

    console.log(myPort);
    sockPub.bind(myPort, function(err) {
        if (err) {
            console.log('err: ' + err);
            return;
        }

        //#TODO: get input from stdin
        setInterval(function() {
            sockPub.send('Im a client and a server');
        }, 2000);
    });
};

exports.publish = publish;
exports.joinNetwork = scrape;
