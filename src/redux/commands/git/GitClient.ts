import * as git from 'isomorphic-git';
import {AppStore} from "../../store";
const fs = require('fs');
import http from "isomorphic-git/http/node";

export class GitClient {
    private getState: () => AppStore;

    constructor(getState: () => AppStore) {
        this.getState = getState;
    }

    private get workspace() {
        return this.getState().settings.workSpace;
    }

    private get gitSetting() {
        return this.getState().profile.gitSetting || {};
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
                name: this.gitSetting.userName,
                email: this.gitSetting.userEmail
            }
        })
    }

    init(): Promise<any> {
        return git.init({
            fs,
            dir: this.workspace,
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
                name: this.gitSetting.userName,
                email: this.gitSetting.userEmail
            },
            onAuth: (url, auth) => {
                return {
                    username: this.gitSetting.githubToken,
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