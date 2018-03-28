const app = require('./app');
const http = require('http');
const init = require('./init');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev'
}

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || '3009');

app.set('port', port);

const server = http.createServer(app);

init().then(() => {
    server.listen(port);
}).catch((err) => {
    // node will console.error on mysql error but run server anyway
    console.error(err);
    server.listen(port);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    console.log(`Listening on ${bind}`);
});
