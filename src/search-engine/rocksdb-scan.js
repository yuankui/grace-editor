const RocksDB = require("rocksdb");


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

const indexNames = ['doc-detail', 'id-mapper', 'reverse_index'];

async function run() {
    for (let indexName of indexNames) {

        const rocksdb = new RocksDB('/Users/yuankui/git/grace-editor/index.dat/' + indexName);

        await new Promise(resolve => {
            rocksdb.open(async err => {
                console.log('');
                console.log(`=================index name [${indexName}]====================`);
                console.log('');
                const iterator = rocksdb.iterator();
                for (let i = 0; i < 1000; i++) {
                    const [key, value] = await next(iterator);

                    if (key == null && value == null) {
                        break;
                    }
                    console.log(`${key} => ${value}`)
                }
                resolve();
            });
        })

    }
}


run().then(() => {
});
