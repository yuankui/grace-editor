const fs = require('fs');
require('js-base64');
const fd = fs.openSync('./FileSystem.ts', 'r');


const buf = new Uint8Array(10000);
const len = 100;
fs.read(fd, buf, 0, len, 0, (err, bytesRead, buffer) => {

    const read = buffer.subarray(0, 100);
    const s = new TextDecoder("utf-8").decode(read);

    console.log(s);
});

