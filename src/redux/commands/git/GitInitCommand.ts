import {CommandType} from "../index";
import GitCommand from "./GitCommand";
import {AppStore} from "../../store";
import {message} from "antd";
import FileSystem from '../../../backend/electron/FileSystem';
import path from 'path';

export default class GitInitCommand extends GitCommand {
    name(): CommandType {
        return "Git/Init";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            try {
                try {
                    let stats = await new FileSystem().stats(path.join(state.settings.workSpace, '.git'));
                    if (stats != null && stats.isDirectory()) {
                        message.info('already a git repo');
                        return state;
                    }
                } catch (e) {
                    await state.repo.init();
                    message.info("Init workspace success");
                }
            } catch (e) {
                message.info("init fail:" + e.toString());
            }
        }
        return state;
    }
}