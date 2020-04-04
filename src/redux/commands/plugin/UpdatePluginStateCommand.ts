import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

export class UpdatePluginStateCommand extends AppCommand {
    private readonly pluginId: string;
    private readonly settings: {[key:string]: any};

    constructor(pluginId: string, settings: {[key:string]: any}) {
        super();
        this.pluginId = pluginId;
        this.settings = settings;
    }

    name(): CommandType {
        return "Plugin/UpdateState";
    }

    process(store: AppStore, dispatch: any): AppStore {
        const oldSettings = store.plugins[this.pluginId] || {};

        const newSettings = {
            ...oldSettings,
            ...this.settings,
        };

        const newMap = {
            ...store.plugins,
            [this.pluginId]: newSettings,
        };

        return {
            ...store,
            plugins: newMap,
        }
    }
}