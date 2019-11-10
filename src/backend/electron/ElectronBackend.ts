import {Backend, PostDTO} from "../index";
import path from 'path';
import uuid from 'uuid/v4';
import FileSystem from "./FileSystem";

export function createElectronBackend(working: string): Backend {
    return new ElectronBackend(working, new FileSystem());
}

/**
 * uuid / index.json,xxx.jpg,
 */
export class ElectronBackend implements Backend {
    private readonly workingDir: string = "";
    private fs: FileSystem;

    constructor(workingDir: string, fs: FileSystem) {
        this.fs = fs;
        this.workingDir = workingDir;
    }

    generateId(): string {
        let id = uuid();
        id = id.replace("-", "");
        return id.substring(0, 2) + "." + id.substring(2, 4) + "." + id.substring(4);
    }

    async getPost(id: string): Promise<PostDTO> {
        const dirPath = path.join(this.workingDir, ...id.split("."));
        return this.getPostByPath(dirPath);
    }

    async getPostByPath(dirPath: string): Promise<PostDTO> {
        let buffer = await this.fs.readFile(path.join(dirPath, 'index.json'));
        let text = buffer.toString('utf-8');
        let json = JSON.parse(text);
        return json;
    }

    /**
     * list child of dir
     * @param dirs
     */
    async expandDir(dirs: Array<string>): Promise<Array<string>> {
        let subDirList: Array<string> = [];
        for (let dir of dirs) {
            let subDirs = await this.fs.listDir(dir);

            subDirs = subDirs.map(d => path.join(dir, d));
            subDirList.push(...subDirs);
        }
        return subDirList;
    }

    async getPosts(): Promise<Array<PostDTO>> {
        console.log("get posts.............");
        let level1 = await this.expandDir([this.workingDir]);
        let level2 = await this.expandDir(level1);

        const posts: Array<PostDTO> = [];

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

    async saveImage(file: File, id: string): Promise<string> {
        let imageId = uuid();
        console.log('save image:', id, '->', imageId);
        let imagePath = path.join(this.workingDir, this.getPostDir(id), imageId);
        let arrayBuffer = await this.readFileAsArrayBuffer(file);
        await this.fs.writeFile(imagePath, Buffer.from(arrayBuffer));
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

    async savePost(post: PostDTO): Promise<PostDTO> {
        let id = post.id;
        if (post.id == null) {
            id = this.generateId();
        }

        let json = JSON.stringify(post);
        let postPath = path.join(this.getPostDir(id as string), 'index.json');
        await this.fs.writeFile(postPath, Buffer.from(json, 'utf-8'));

        return {
            ...post,
            id
        }
    }

    async deletePost(id: string): Promise<any> {
        const postDir = this.getPostDir(id);
        await this.fs.rmdir(postDir);
    }

}