import {Index} from "./Index";
import {ID} from "./hook-struct/ID";
import {test} from 'mocha';

interface Person extends ID {
    name: string,
    age: number,
    male: boolean,
}

async function run() {
    const index = new Index<Person>("./index.dat");
    await index.init();

    await index.add({
        _id: 'yuankui',
        name: 'yuan kui',
        age: 33,
        male: true,
    });

    await index.add({
        _id: 'wangfang',
        name: 'wang fang',
        age: 34,
        male: false,
    });

    await index.add({
        _id: 'yuansiqi',
        name: 'yuan siqi',
        age: 34,
        male: true,
    });

    // const docs = await index.jsonSearch({
    //     where: {
    //         type: 'and',
    //         params: {
    //             left: {
    //                 type: '=',
    //                 params: {
    //                     field: 'age',
    //                     value: 33,
    //                 }
    //             },
    //             right: {
    //                 type: 'bool',
    //                 params: {
    //                     field: 'male',
    //                     value: 'false',
    //                 }
    //             }
    //         }
    //     },
    //     page: {
    //         page: 0,
    //         pageSize: 10,
    //     }
    // });
    // console.log(docs);

    // const doc = await index.get("hello");
    // console.log(doc);
}


test('index-insert', async function() {
    await run();
    console.log("hello");
});



