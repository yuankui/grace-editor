import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {message} from "antd";
import FileSystem from '../../../backend/electron/FileSystem';
import path from 'path';
import {Dispatch} from "redux";

export default class GitInitCommand extends AppCommand {
    name(): CommandType {
        return "Git/Init";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        if (!state.repo) {
            return;
        }

        try {
            try {
                let stats = await new FileSystem().stats(path.join(state.settings.workSpace, '.git'));
                if (stats != null && stats.isDirectory()) {
                    return;
                }
            } catch (e) {
                await state.repo.init();
                message.info("Init workspace success");
                console.log("Init workspace success");
            }
        } catch (e) {
            message.info("init fail:" + e.toString());
        }
    }

}