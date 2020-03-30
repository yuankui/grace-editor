import * as git from 'isomorphic-git';
const fs = require('fs');
const http = require("isomorphic-git/http/node");

export class GitClient {

    private readonly workspace : string;

    constructor(workspace: string) {
        this.workspace = workspace;
    }

    async commit(msg: string): Promise<any> {
        await git.add({
            fs,
            dir: this.workspace,
            filepath: '.'
        });

        return await git.commit({
            fs,
            dir: this.workspace,
            message: msg,
            author: {
                name: "local",
                email: "local@local"
            }
        })
    }

    init(): Promise<any> {
        return git.init({
            fs,
        })
    }

    pull(): Promise<any> {
        return git.pull({
            fs,
            http,
            dir: this.workspace,
            ref: 'master',
            remote: 'origin',
            author: {
                name: "local",
                email: 'local@local',
            },
            onAuth: (url, auth) => {
                return {
                    username: "743bc997fdf0d061753b5bda73c83ecb278b585e",
                };
            },
        })
    }

    push(): Promise<any> {
        return git.push({
            fs,
            http,
            dir: this.workspace,
            ref: 'master',
            remote: 'origin',
            // remoteRef: "",
            onAuth: (url, auth) => {
                return {
                    username: "743bc997fdf0d061753b5bda73c83ecb278b585e",
                };
            },
        })
    }
}