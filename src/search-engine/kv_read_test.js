const {DB} = require('./db');
const db = new DB('rocks.dat');

async function run() {
    await db.open();


    for (let i = 10000; i < 11000; i++) {
        const v = await db.get(i);
        console.log(`${i} => ${v}`);
    }
    await db.close();
}

run().then(value => {

    console.log(value);
});