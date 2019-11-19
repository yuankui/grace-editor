import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Backend} from "../../backend";
import {createElectronBackend} from "../../backend/electron/ElectronBackend";

export class InitBackendCommand extends AppCommand {
    name(): CommandType {
        return "InitBackend";
    }

    process(state: AppStore): AppStore {
        const backend = this.createBackend(state.settings.git.localPath);
        return {
            ...state,
            backend,
        }
    }

    createBackend(workSpace: string): Backend {
        return createElectronBackend(workSpace);
    }

}