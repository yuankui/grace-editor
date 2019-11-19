import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";
import {message} from "antd";
import NProgress from 'nprogress';
import nodegit from 'nodegit';

NProgress.configure({});

export default class GitPushCommand extends GitCommand {
    name(): CommandType {
        return "Git/Push";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        const repo = state.repo;
        if (repo) {
            NProgress.start();
            try {
                const log = await this.push(state, repo);
                message.info("push success");
            } catch (e) {
                message.error("push error" + e.toString());
            } finally {
                NProgress.done();
            }
        }
        return state;
    }

    private async push(state: AppStore, repo: nodegit.Repository) {
        const remote = nodegit.Remote.create(repo, 'origin', state.settings.git.remote);
        return await remote.push(
            ["refs/heads/master:refs/heads/master"],
            {
                callbacks: {
                    credentials: function (url, userName) {
                        console.log('url', url, 'userName', userName);
                        return nodegit.Cred.sshKeyFromAgent(userName);
                    }
                }
            });
    }

}