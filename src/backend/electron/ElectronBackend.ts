import {Backend, Post} from "../index";
import path from 'path';
import uuid from 'uuid/v4';
import * as fss from './fs/fs';

export function createElectronBackend(working: string): Backend {
    const fs: any = (window as any).require('fs');
    return new ElectronBackend(working, fs);
}

/**
 * uuid / index.json,xxx.jpg,
 */
export class ElectronBackend implements Backend {
    private readonly workingDir: string = "";
    private fs: any;

    constructor(workingDir: string, fs: any) {
        this.fs = fs;
        this.workingDir = workingDir;
    }

    generateId(): string {
        let id = uuid();
        id = id.replace("-", "");
        return id.substring(0, 2) + "." + id.substring(2, 4) + "." + id.substring(4);
    }

    async getPost(id: string): Promise<Post> {
        const dirPath = path.join(this.workingDir, ...id.split("."));
        return this.getPostByPath(dirPath);
    }

    async getPostByPath(dirPath: string): Promise<Post> {
        let buffer = await this.readFile(path.join(dirPath, 'index.json'));
        let text = buffer.toString('utf-8');
        let json = JSON.parse(text);
        return json;
    }

    readFile(file: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            this.fs.readFile(file, ((err, data) => {
                if (err != null) {
                    reject(err);
                }
                resolve(data);
            }));
        })
    }

    listDir(path: string): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            this.fs.readdir(path, (err, files) => {
                if (err != null) {
                    reject(err);
                }
                resolve(files);
            })
        })
    }

    /**
     * list child of dir
     * @param dirs
     */
    async expandDir(dirs: Array<string>): Promise<Array<string>> {
        let subDirList: Array<string> = [];
        for (let dir of dirs) {
            let subDirs = await this.listDir(dir);

            subDirs = subDirs.map(d => path.join(dir, d));
            subDirList.push(...subDirs);
        }
        return subDirList;
    }

    async getPosts(): Promise<Array<Post>> {
        console.log("get posts.............");
        let level1 = await this.expandDir([this.workingDir]);
        let level2 = await this.expandDir(level1);

        const posts: Array<Post> = [];

        for (let dir of level2) {
            try {
                let post = await this.getPostByPath(dir);
                posts.push(post);
            } catch (e) {
                // console.log('not post here:', dir, e);
            }
        }

        return posts;
    }

    async writeFile(location: string, buffer: Buffer): Promise<any> {
        const dir = path.dirname(location);
        await fss.mkdir(dir);

        return new Promise<any>((resolve, reject) => {
            this.fs.writeFile(location, buffer, (err) => {
                if (err != null)
                    reject(err);
                resolve("");
            });
        })
    }

    async saveImage(file: File, id: string): Promise<string> {
        let imageId = uuid();
        console.log('save image:', id, '->', imageId);
        let imagePath = path.join(this.workingDir, this.getPostDir(id), imageId);
        let arrayBuffer = await this.readFileAsArrayBuffer(file);
        await this.writeFile(imagePath, new Buffer(arrayBuffer));
        return imageId;
    }

    readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            let fileReader = new FileReader();

            fileReader.onload = ev => {
                resolve(fileReader.result as ArrayBuffer);
            };
            fileReader.onerror = ev => {
                reject(ev);
            };
            fileReader.onabort = ev => {
                reject(ev);
            };
            fileReader.readAsBinaryString(file);
        })
    }

    getPostDir(id: string): string {
        const s1 = id.substring(0, 2);
        const s2 = id.substr(2);
        return path.join(this.workingDir, s1, s2);
    }

    async savePost(post: Post): Promise<Post> {
        let id = post.id;
        if (post.id == null) {
            id = this.generateId();
        }

        let json = JSON.stringify(post);
        let postPath = path.join(this.getPostDir(id as string), 'index.json');
        await this.writeFile(postPath, new Buffer(json, 'utf-8'));
        return {
            ...post,
            id
        }
    }

}