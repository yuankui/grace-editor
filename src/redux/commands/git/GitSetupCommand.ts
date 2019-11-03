import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import simplegit from "../../../copies/simple-git/promise";

export default class GitSetupCommand extends AppCommand {
    name(): CommandType {
        return "Git/Setup";
    }

    process(state: AppStore): AppStore {
        return {
            ...state,
            repo: simplegit(state.settings.workSpace),
        }
    }

}