const net = require('net');

const startTime = Date.now();

// const ipPort = 'sg2.moocute.xyz:65164';
const ipPort = 'hk8.kozow.com:60100';

function checkHost(ipPort) {
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

checkHost(ipPort)
    .then(value => console.log('cost time', value))
    .catch(e => console.log('error', e));