import {Index} from "./Index";
import {ID} from "./hook-struct/ID";

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
        name: 'yuankui',
        age: 33,
        male: true,
    });

    await index.add({
        _id: 'wangfang',
        name: 'wangfang',
        age: 34,
        male: false,
    });

    await index.add({
        _id: 'yuansiqi',
        name: 'yuansiqi',
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


describe('index', () => {

    it('search test', () => {
        run()
            .then(value => {
                console.log('success');
            })
    });
});




