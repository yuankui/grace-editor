import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

export class UpdatePluginSettingCommand extends AppCommand {

    name(): CommandType {
        return "Plugin/UpdateSetting";
    }

    process(store: AppStore, dispatch: any): AppStore {
        return store;
    }
}