import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Backend} from "../../backend";
import {createElectronBackend} from "../../backend/electron/ElectronBackend";

export class InitBackendCommand extends AppCommand {
    name(): CommandType {
        return "InitBackend";
    }

    process(state: AppStore): AppStore {
        let localPath = '';
        if (state.settings && state.settings.git && state.settings.git.localPath) {
            localPath = state.settings.git.localPath;
        }

        const backend = this.createBackend(localPath);
        return {
            ...state,
            backend,
        }
    }

    createBackend(workSpace: string): Backend {
        return createElectronBackend(workSpace);
    }

}