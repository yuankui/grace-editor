/**
 * Exports the utilities `simple-git` depends upon to allow for mocking during a test
 */
module.exports = {

   buffer: function () { return window.require('buffer').Buffer; },

   childProcess: function () { return window.require('child_process'); },

   exists: require('./exists')

};
