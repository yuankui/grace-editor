import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";
import {message} from "antd";

export default class GitPushCommand extends GitCommand {
    name(): CommandType {
        return "Git/Push";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            await state.repo.add('.');
            const log = await state.repo.push('origin', 'master');
            message.info("push success");
        }

        return state;
    }

}