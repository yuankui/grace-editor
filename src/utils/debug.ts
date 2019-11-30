const process = window.require('process');
const isDebug = process.env['NODE_ENV'] === 'development';

export function debug(callback: () => void) {
    if (isDebug) {
        callback();
    }
}