import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

export class UpdatePluginStateCommand extends AppCommand {
    private readonly pluginId: string;
    private readonly settings: any;

    constructor(pluginId: string, settings: any) {
        super();
        this.pluginId = pluginId;
        this.settings = settings;
    }

    name(): CommandType {
        return "Plugin/UpdateState";
    }

    process(store: AppStore, dispatch: any): AppStore {
        const newMap = {
            ...store.plugins,
            [this.pluginId]: this.settings,
        };

        return {
            ...store,
            plugins: newMap,
        }
    }
}