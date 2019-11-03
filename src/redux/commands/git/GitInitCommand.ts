import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

export default class GitInitCommand extends AppCommand {
    name(): CommandType {
        return "Git/Init";
    }

    process(state: AppStore): AppStore {

        if (state.repo) {
            state.repo.init();
        }

        return state;
    }

}