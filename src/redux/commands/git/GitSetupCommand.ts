import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {GitRepoImpl} from "../../../app/git/GitRepo";

export default class GitSetupCommand extends AppCommand {
    name(): CommandType {
        return "Git/Setup";
    }

    process(state: AppStore): AppStore {
        return {
            ...state,
            repo: new GitRepoImpl(state.settings.workSpace),
        }
    }

}