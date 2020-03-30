import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {message} from "antd";
import NProgress from 'nprogress';
import {Dispatch} from "redux";

NProgress.configure({});

export default class GitPullCommand extends AppCommand {
    name(): CommandType {
        return "Git/Pull";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        if (!state.repo) {
            return;
        }

        NProgress.start();
        try {
            await state.repo.pull();
            message.info("pull success");
            NProgress.done();
        } catch (e) {
            message.error(e.toString());
            NProgress.done();
        }
    }

}