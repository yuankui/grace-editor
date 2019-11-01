import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Backend} from "../../backend";
import {createElectronBackend} from "../../backend/electron/ElectronBackend";
import {createWebBackend} from "../../backend/web/WebBackend";

export class InitBackendCommand extends AppCommand {
    name(): CommandType {
        return "InitBackend";
    }

    process(state: AppStore): AppStore {
        const backend = this.createBackend(state.settings.workSpace);
        return {
            ...state,
            backend,
        }
    }

    createBackend(workSpace: string): Backend {
        // init backend
        let userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            // Electron-specific code
            return createElectronBackend(workSpace);
        } else {
            return createWebBackend();
        }
    }

}