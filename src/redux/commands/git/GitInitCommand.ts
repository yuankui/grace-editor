import {CommandType} from "../index";
import GitCommand from "./GitCommand";
import {AppStore} from "../../store";
import {message} from "antd";
import FileSystem from '../../../backend/electron/FileSystem';
import path from 'path';
import {Repository} from "nodegit";

export default class GitInitCommand extends GitCommand {

    private readonly workspace: string;

    constructor(workspace: string) {
        super();
        this.workspace = workspace;
    }

    name(): CommandType {
        return "Git/Init";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            try {
                try {
                    let stats = await new FileSystem().stats(path.join(state.settings.git.localPath, '.git'));
                    if (stats != null && stats.isDirectory()) {
                        message.info('already a git repo');
                        return state;
                    }
                } catch (e) {
                    await Repository.init(this.workspace, Number(false));
                    message.info("Init workspace success");
                }
            } catch (e) {
                message.info("init fail:" + e.toString());
            }
        }
        return state;
    }
}