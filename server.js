
const http = require('http');
const app = require('./app');


// setInterval(function() {
//     http.get("http://backend-seou.herokuapp.com/");
// }, 300000); // every 5 minutes (300000)


const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'require elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};



app.set('port', process.env.PORT || 3000);

//server = functions.https.onRequest(app);
//module.exports = server;
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
