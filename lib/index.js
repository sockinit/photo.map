var server = require('./server.js');

server.start(function(err) {
    if (err) throw err;
    console.log(server.info.port);
    console.log('server started!');
});
