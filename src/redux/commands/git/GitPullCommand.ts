import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";
import {message} from "antd";
import NProgress from 'nprogress';

NProgress.configure({
});

export default class GitPullCommand extends GitCommand {
    name(): CommandType {
        return "Git/Pull";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            NProgress.start();
            try {
                await state.repo.pull('origin', 'master');
                message.info("pull success");
                NProgress.done();
            } catch (e) {
                message.error(e.toString());
                NProgress.done();
            }


        }

        return state;
    }

}