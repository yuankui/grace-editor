import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import LoadWorkspaceSettingCommand from "../LoadWorkspaceSettingCommand";
import GitSetupCommand from "../git/GitSetupCommand";
import {InitBackendCommand} from "../InitBackendCommand";
import {ReloadPostsCommand} from "../ReloadPostsCommand";
import {CheckRemoteCommand} from "./CheckRemoteCommand";
import {LoadProfileSettingCommand} from "../profile/LoadProfileSettingCommand";

export class AppInitCommand extends AppCommand {
    name(): CommandType {
        return 'App/Init';
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        // load workspace
        await dispatch(new LoadWorkspaceSettingCommand());

        // load profile settings
        await dispatch(new LoadProfileSettingCommand());

        // setup git repo
        await dispatch(new GitSetupCommand());

        // init backend
        await dispatch(new InitBackendCommand());

        // reload posts
        await dispatch(new ReloadPostsCommand());

        // check remote
        await dispatch(new CheckRemoteCommand());
    }

}