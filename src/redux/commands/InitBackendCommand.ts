import {AppCommand, CommandType} from "./index";
import {AppStore, createBackend} from "../store";

export class InitBackendCommand extends AppCommand {
    name(): CommandType {
        return "InitBackend";
    }

    process(state: AppStore): AppStore {
        const backend = createBackend();
        return {
            ...state,
            backend,
        }
    }

}