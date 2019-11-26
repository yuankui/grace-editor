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

        const stats = await fs.stats(workSpace);
        if (!stats.isDirectory()) {
            await fs.mkdir(workSpace);
            await new GitInitCommand().process(s);
        }
        return (state) => {
            return {
                ...state,
                repo: simplegit(state.settings.workSpace),
            }
        }
    }

}