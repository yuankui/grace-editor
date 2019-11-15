import {AppCommand, CommandType} from "../index";
import {AppStore, Settings} from "../../store";
import UpdateSettingsCommand from "../UpdateSettingsCommand";

export class SetDarkModeCommand extends AppCommand {
    private readonly isDarkMode: boolean;

    constructor(isDarkMode: boolean) {
        super();
        this.isDarkMode = isDarkMode;
    }

    name(): CommandType {
        return "Setting/SetDarkMode";
    }

    process(store: AppStore): AppStore {
        const newSetting: Settings = {
            ...store.settings,
            isDarkMode: this.isDarkMode,
        };
        return new UpdateSettingsCommand(newSetting).process(store);
    }
}