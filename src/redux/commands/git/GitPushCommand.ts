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
            NProgress.start();
            try {
                const log = await state.repo.push('origin', 'master');
                message.info("push success");
            } catch (e) {
                message.error("push error" + e.toString());
            } finally {
                NProgress.done();
            }
        }


        return state;
    }

}