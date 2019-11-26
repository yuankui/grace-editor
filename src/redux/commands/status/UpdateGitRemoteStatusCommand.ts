import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

export class UpdateGitRemoteStatusCommand extends AppCommand {
    private readonly configRemote: boolean;

    constructor(configRemote: boolean) {
        super();
        this.configRemote = configRemote;
    }

    name(): CommandType {
        return "Status/UpdateRemote";
    }

    process(state: AppStore): AppStore | null {
        if (state.repo == null) {
            return null;
        }

        state.repo.getRemotes(false);
        return {
            ...state,
            status: {
                ...state.status,
                configGitRemote: this.configRemote,
            }
        }
    }

}