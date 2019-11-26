import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import simplegit from "../../../copies/simple-git/promise";
import {Mapper} from "redux-commands";
import FileSystem from "../../../backend/electron/FileSystem";
import GitInitCommand from "./GitInitCommand";

export default class GitSetupCommand extends AppCommand {
    name(): CommandType {
        return "Git/Setup";
    }

    async process(s: AppStore): Promise<Mapper<AppStore>> {
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
        s = {
            ...s,
            repo: simplegit(s.settings.workSpace),
        };
        await new GitInitCommand().process(s);
        return (state) => {
            return s;
        }
    }

    async init(fs, state) {
        const workSpace = state.settings.workSpace;
        await fs.mkdir(workSpace);
    }

}