import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {UpdateProfileSettingCommand} from "../profile/UpdateProfileSettingCommand";

export class UpdatePluginSettingCommand extends AppCommand {
    private readonly pluginId: string;
    private readonly settings: any;

    constructor(pluginId: string, settings: any) {
        super();
        this.pluginId = pluginId;
        this.settings = settings;
    }

    name(): CommandType {
        return "Plugin/UpdateSetting";
    }

    async process(store: AppStore, dispatch: any): Promise<any> {
        const newMap = {
            ...store.profile.plugins,
            [this.pluginId]: this.settings,
        };

        await dispatch(new UpdateProfileSettingCommand({
            plugins: newMap,
        }));
    }
}