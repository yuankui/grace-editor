import {Index} from "./Index";

async function run() {
    const index = await Index.open("index.dat");

    await index.add({
        id: 'yuankui',
        name: 'yuankui',
        age: 33,
        male: true,
    });

    await index.add({
        id: 'wangfang',
        name: 'wangfang',
        age: 34,
        male: false,
    });

    await index.add({
        id: 'yuansiqi',
        name: 'yuansiqi',
        age: 34,
        male: true,
    });

    const docs = await index.jsonSearch({
        where: {
            type: 'and',
            params: {
                left: {
                    type: '=',
                    params: {
                        field: 'age',
                        value: 33,
                    }
                },
                right: {
                    type: 'bool',
                    params: {
                        field: 'male',
                        value: 'false',
                    }
                }
            }
        }
    });
    console.log(docs);

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




