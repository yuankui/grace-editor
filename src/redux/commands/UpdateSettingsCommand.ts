import {AppCommand, CommandType} from "./index";
import {AppStore, Settings} from "../store";

export default class UpdateSettingsCommand extends AppCommand {
    private readonly settings: Settings;

    constructor(settings: Settings) {
        super();
        this.settings = settings;
    }

    name(): CommandType {
        return 'Setting/Update';
    }

    process(state: AppStore): AppStore {
        localStorage.setItem('settings', JSON.stringify(this.settings));

        return {
            ...state,
            settings: this.settings,
        };
    }
}