import RocksDB from "rocksdb";

export class KV {
    private path: string;
    private rocksdb: RocksDB;

    constructor(path: string) {
        this.path = path;
        this.rocksdb = new RocksDB(path);
    }

    async init() {
        await new Promise((resolve, reject) => {
            this.rocksdb.open(err => {
                if (err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        });
    }

    get(key: string): Promise<Buffer> {
        return new Promise<any>((resolve, reject) => {
            this.rocksdb.get(key, (err, value) => {
                if (err == null) {
                    resolve(value);
                } else {
                    reject(err);
                }
            })
        })
    }

    async put(key: string, value: any) {
        return new Promise<any>((resolve, reject) => {
            this.rocksdb.put(key, value, (err) => {
                if (err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        })
    }

    async del(key: string) {
        return new Promise<any>((resolve, reject) => {
            this.rocksdb.del(key, (err) => {
                if (err == null) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        })
    }

    iterator() {
        return this.rocksdb.iterator();
    }
}