import {Index} from "./Index";

async function run() {
    const index = await Index.open("index.dat");

    const docs = await index.jsonSearch("select * from table where id = 1");
    console.log(docs);

    const doc = await index.get("hello");
    console.log(doc);
}


