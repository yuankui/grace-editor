import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {UpdateProfileSettingCommand} from "../profile/UpdateProfileSettingCommand";

export class UpdatePluginSettingCommand extends AppCommand {
    private readonly pluginId: string;
    private readonly settings: {[key:string]: any};

    constructor(pluginId: string, settings: {[key:string]: any}) {
        super();
        this.pluginId = pluginId;
        this.settings = settings;
    }

    name(): CommandType {
        return "Plugin/UpdateSetting";
    }

    async process(store: AppStore, dispatch: any): Promise<any> {
        const plugins = store?.profile?.plugins || {};
        const oldSettings = plugins[this.pluginId] || {};

        const newSettings = {
            ...oldSettings,
            ...this.settings,
        };

        const newMap = {
            ...plugins,
            [this.pluginId]: newSettings,
        };

        await dispatch(new UpdateProfileSettingCommand({
            plugins: newMap,
        }));
    }
}