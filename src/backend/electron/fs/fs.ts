import {PathLike} from "fs";
import path from 'path';

let fs: any = {};
if (window.require != null) {
    fs = window.require('fs');
}

function _mkdir(path: PathLike): Promise<any> {
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

function _readdir(path: PathLike): Promise<Array<string>> {
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


export async function mkdir(location: PathLike): Promise<any> {
    let dir = location.toString();
    const dirs: Array<string> =[];

    while (true) {
        dirs.push(dir);
        dir = path.dirname(dir);
        try {
            let files = await _readdir(dir);
            if (files != null) {
                break;
            }
        } catch (e) {
        }
    }

    console.log('dirs', dirs);
    for (let d of dirs.reverse()) {
        await _mkdir(d);
    }
}