import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";
import {message} from "antd";
import NProgress from 'nprogress';
import nodegit, {Repository} from "nodegit";

NProgress.configure({});

export default class GitPullCommand extends GitCommand {
    name(): CommandType {
        return "Git/Pull";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        const repo = state.repo;
        if (repo) {
            NProgress.start();
            try {
                await this.pull(repo);
                message.info("pull success");
                NProgress.done();
            } catch (e) {
                message.error(e.toString());
                NProgress.done();
            }
        }

        return state;
    }

    private async pull(repo: Repository) {
        // fetch
        await repo.fetchAll({
            callbacks: {
                credentials: function (url, userName) {
                    return nodegit.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck: function () {
                    return 0;
                }
            }
        });

        // merge
        return await repo.mergeBranches('master', 'origin/master');
    }

}