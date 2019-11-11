import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";
import {message} from "antd";
import NProgress from 'nprogress';

NProgress.configure({
});

export default class GitPushCommand extends GitCommand {
    name(): CommandType {
        return "Git/Push";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            await state.repo.add('.');
            NProgress.start();
            const log = await state.repo.push('origin', 'master');
            NProgress.done();
            message.info("push success");
        }

        return state;
    }

}