const RocksDB = require("rocksdb");

const rocksdb = new RocksDB('/Users/yuankui/git/grace-editor/index.dat/doc-detail');

async function next(iter) {
    return new Promise((resolve, reject) => {
        iter.next((err, key, value) => {
            if (err) {
                reject(err);
            } else {
                resolve([key, value]);
            }
        });
    })
}

rocksdb.open(async err => {
    const iterator = rocksdb.iterator();
    for (let i = 0; i < 1000; i++) {
        const [key, value] = await next(iterator);

        if (key == null && value == null) {
            break;
        }
        console.log(`${key} => ${value}`)
    }
});
