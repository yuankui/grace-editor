import RocksDB from "rocksdb";

export class Detail<T = any> {
    private path: string;
    private rocksdb: RocksDB;

    private constructor(path: string) {
        this.path = path;
        this.rocksdb = new RocksDB(path);
    }

    private async init() {
        return new Promise((resolve, reject) => {
            this.rocksdb.open(err => {
                if (err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        })
    }

    static async open(path: string): Promise<Detail> {
        const detail = new Detail(path);
        await detail.init();
        return detail;
    }

    async add(docId: string, doc: T) {
        return new Promise((resolve, reject) => {
            this.rocksdb.put(docId, JSON.stringify(doc), err => {
                if (err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        })
    }

    async get(docId: string): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            this.rocksdb.get(docId, (err, value) => {
                if (err == null) {
                    resolve(JSON.parse(value.toString()));
                } else {
                    reject(err);
                }
            })
        })
    }

    async remove(docId: string) {
        return new Promise((resolve, reject) => {
            this.rocksdb.del(docId, err => {
                if (err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        });
    }

    async list(page: number, pageSize: number): Promise<Array<T>> {
        const iterator = this.rocksdb.iterator({});
        const next = async (iter) => {
            return new Promise<any>((resolve, reject) => {
                iterator.next((err, key, value) => {
                    if (err == null) {
                        resolve([key, value]);
                    } else {
                        reject(err);
                    }
                })
            })
        };
        // 1. skip
        for (let i = 0; i < page * pageSize; i++) {
            await next(iterator);
        }

        const array = <any>[];
        // 2. get
        for (let i = 0; i < pageSize; i++) {
            const [key, value] = await next(iterator);
            if (key == undefined && value == undefined) {
                break;
            }
            array.push(JSON.parse(value.toString()));
        }
        return array;
    }
}