import {Index} from "./Index";
import {Doc} from "./hook-struct/Doc";
import {test} from 'mocha';
import {createFieldRegister} from "./hooks/createFieldRegister";

interface Person extends Doc {
    name: string,
    age: number,
    male: boolean,
}

async function createIndex() {
    const index = new Index<Person>("./index.dat");
    await index.init([
        createFieldRegister({
            fields: [
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'age',
                    type: 'int',
                },
                {
                    name: "male",
                    type: "boolean",
                }
            ]
        })
    ]);
    return index;
}

test('index-insert', async function() {
    const index = await createIndex();

    await index.add({
        _id: 'yuankui',
        name: 'yuan kui',
        age: 44,
        male: true,
    });

    await index.add({
        _id: 'wangfang',
        name: 'wang fang',
        age: 133,
        male: false,
    });

    await index.add({
        _id: 'yuansiqi',
        name: 'yuan siqi',
        age: 34,
        male: true,
    });
});


test('index-delete', async function() {
    const index = await createIndex();

    await index.delete('yuankui');
    // await index.delete('wangfang');
    // await index.delete('yuansiqi');
});


test('index-update', async function() {
    const index = await createIndex();

    await index.add({
        _id: 'yuankui',
        name: 'yuan kui',
        age: 33,
        male: true,
    });

    await index.add({
        _id: 'wangfang',
        name: 'wang fang',
        age: 133,
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
});

