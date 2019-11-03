import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

export default class GitStatusCommand extends AppCommand {
    name(): CommandType {
        return "Git/Status";
    }

    process(state: AppStore): AppStore {

        if (state.repo) {
            state.repo.status();
        }

        return state;
    }

}