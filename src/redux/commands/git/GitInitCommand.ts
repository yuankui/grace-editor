import {CommandType} from "../index";
import GitCommand from "./GitCommand";
import {AppStore} from "../../store";

export default class GitInitCommand extends GitCommand {
    name(): CommandType {
        return "Git/Init";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            await state.repo.init();
        }
        return state;
    }
}