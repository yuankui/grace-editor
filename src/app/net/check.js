const net = require('net');

function checkHost(ipPort) {
    const startTime = Date.now();
    const [ip, port] = ipPort.split(':');
    return new Promise((resolve, reject) => {
        const socket = net.connect({
            host: ip,
            port: port,
        }, () => {
            const endTime = Date.now();
            socket.write("test");
            socket.destroy();
            resolve(endTime - startTime);
        });

        socket.on("error", err => {
            reject(err);
        })
    })
}

module.exports = {
    checkHost,
};