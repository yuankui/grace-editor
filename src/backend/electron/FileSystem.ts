import path from 'path';
import {PathLike, Stats} from "fs";
const fs = window.require('fs');

export default class FileSystem {
    private _mkdir(path: PathLike): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.mkdir(path, err => {
                if (err == null) {
                    resolve();
                } else {
                    if (err.code === "EEXIST") {
                        resolve();
                    } else {
                        reject(err);
                    }
                }
            })
        });
    }

    readdir(path: PathLike): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        })
    }

    readFile(file: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(file, ((err, data) => {
                if (err != null) {
                    reject(err);
                }
                resolve(data);
            }));
        })
    }

    async writeFile(location: string, buffer: Buffer): Promise<any> {
        const dir = path.dirname(location);
        await this.mkdir(dir);

        return new Promise<any>((resolve, reject) => {
            fs.writeFile(location, buffer, (err) => {
                if (err != null)
                    reject(err);
                resolve("");
            });
        })
    }

    /**
     * remove single (file|dir)
     */
    async rm(path: string): Promise<any> {
        const st: Stats = await this.stats(path);
        return new Promise<any>((resolve, reject) => {
            if (st.isFile()) {
                fs.unlink(path, err => {
                    if (err == null) {
                        resolve();
                    } else {
                        reject(err);
                    }
                })
            } else {
                fs.rmdir(path, err => {
                    if (err == null) {
                        resolve();
                    } else {
                        reject(err);
                    }
                })
            }

        });
    }

    stats(path: string): Promise<Stats> {
        return new Promise<Stats>((resolve, reject) => {
            fs.stat(path, (err, st) => {
                if (err == null) {
                    resolve(st);
                } else {
                    reject(err);
                }
            });
        })
    }

    /**
     * remove recursively
     */
    async rmdir(dir: string): Promise<any> {
        const children = await this.listDir(dir);
        if (children == null || children.length == 0) {
            return await this.rm(dir);
        }

        for (let child of children) {
            child = path.join(dir, child);
            const stats = await this.stats(child);
            if (stats.isDirectory()) {
                await this.rmdir(child);
            } else {
                await this.rm(child);
            }
        }
    }

    listDir(path: string): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err != null) {
                    reject(err);
                }
                resolve(files);
            })
        })
    }

    async mkdir(location: PathLike): Promise<any> {
        let dir = location.toString();
        const dirs: Array<string> =[];

        while (true) {
            dirs.push(dir);
            dir = path.dirname(dir);
            try {
                let files = await this.readdir(dir);
                if (files != null) {
                    break;
                }
            } catch (e) {
            }
        }

        for (let d of dirs.reverse()) {
            await this._mkdir(d);
        }
    }
}

