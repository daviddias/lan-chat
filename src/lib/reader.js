var es = require('event-stream');

module.exports = reader;

function reader(stream) {
    var stdin = process.openStdin();
    stdin.setEncoding('utf8');
    stdin
        .pipe(es.split())
        .pipe(stream);

}
