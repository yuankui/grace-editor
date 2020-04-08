import RocksDB from "rocksdb";
import {range} from "rxjs";
import * as op from 'rxjs/operators';

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

        return new Promise((resolve, reject) => {
            range(0, page * pageSize)
                .pipe(
                    op.bufferCount(pageSize),
                    op.flatMap((keys) => {
                        const promises = keys.map(() => {
                            return new Promise((res, rej) => {
                                iterator.next(err => {
                                    if (err == null) {
                                        res();
                                    } else {
                                        rej(err);
                                    }
                                })
                            })
                        });
                        return Promise.all(promises);
                    }),
                    op.last(),
                )
                .subscribe(() => {
                    // skip done, start get
                    range(0, pageSize)
                        .pipe(
                            op.flatMap((key) => {
                                return new Promise<any>((resolve1, reject1) => {
                                    iterator.next((err, key, value) => {
                                        if (err == null) {
                                            resolve1(JSON.parse(value.toString()))
                                        } else {
                                            reject1(err);
                                        }
                                    })
                                })
                            }),
                            op.bufferCount(pageSize),
                        )
                        .subscribe(value => {
                            resolve(value);
                        }, error => {
                            reject(error);
                        }, )
                })
        })
    }
}