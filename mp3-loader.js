const fs = require("fs");

// https://stackoverflow.com/questions/28834835/readfile-in-base64-nodejs
function base64_encode(file) {
    // read binary data
    const buffer = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return buffer.toString('base64');
}

module.exports = function (source) {
    const base64 = base64_encode(this.resourcePath);
    const str = `data:audio/mp3;base64,${base64}`;
    return `module.exports = ${JSON.stringify(str)}`;
};