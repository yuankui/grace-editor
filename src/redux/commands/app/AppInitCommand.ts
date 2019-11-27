import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import ReloadSettingsCommand from "../ReloadSettingsCommand";
import GitSetupCommand from "../git/GitSetupCommand";
import {InitBackendCommand} from "../InitBackendCommand";
import {ReloadPostsCommand} from "../ReloadPostsCommand";

export class AppInitCommand extends AppCommand {
    name(): CommandType {
        return 'App/Init';
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        await dispatch(new ReloadSettingsCommand());
        await dispatch(new GitSetupCommand());
        await dispatch(new InitBackendCommand());
        await dispatch(new ReloadPostsCommand());
    }

}