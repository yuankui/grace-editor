const rxjs = require('rxjs');
const op = require('rxjs/operators');
const {DB} = require('./db');

async function run() {
    const db = new DB('rocks.dat');
    await db.open();

    const start = new Date();
    await new Promise((resolve, reject) => {
        rxjs.range(1000000)
            .pipe(
                op.bufferCount(100),
                op.flatMap((keys, index) => {
                    console.log(index);
                    // return Promise.all(keys.map(key => db.put(key, key + 1)))
                    const ops = keys.map(key => {
                        return {
                            type: 'put',
                            key: key,
                            value: key + 1,
                        }
                    });
                    return db.batch(ops);
                }),
                op.last(),
            ).subscribe(done => {
            resolve(done);
        });
    });

    await db.close();

    console.log(`cost: ${new Date().getTime() - start.getTime()}`);
}

run().then(value => {

    console.log(value);
});