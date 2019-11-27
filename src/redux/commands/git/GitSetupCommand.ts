import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import simplegit from "../../../copies/simple-git/promise";
import FileSystem from "../../../backend/electron/FileSystem";
import GitInitCommand from "./GitInitCommand";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "../UpdateStateCommand";

export default class GitSetupCommand extends AppCommand {
    name(): CommandType {
        return "Git/Setup";
    }

    async process(s: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const fs = new FileSystem();
        const workSpace = s.settings.workSpace;

        // 创建目录
        try {
            // init workspace if not created
            const stats = await fs.stats(workSpace);
            if (!stats.isDirectory()) {
                await this.init(fs, s);
            }
        } catch (e) {
            await this.init(fs, s);
        }

        // 初始化git仓库
        await dispatch(new UpdateStateCommand({
            repo: simplegit(s.settings.workSpace),
        }));

        await dispatch(new GitInitCommand());
    }

    async init(fs, state) {
        const workSpace = state.settings.workSpace;
        await fs.mkdir(workSpace);
    }

}