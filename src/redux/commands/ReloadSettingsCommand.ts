import {AppCommand, CommandType} from "./index";
import {AppStore, Settings} from "../store";

const emptySetting: Settings = {
    isDarkMode: false,
    git: {
        localPath: '',
        remote: '',
    }
};

export default class ReloadSettingsCommand extends AppCommand {
    name(): CommandType {
        return 'Setting/Reload';
    }

    process(state: AppStore): AppStore {
        const settingsString = localStorage.getItem('settings');
        if (settingsString == null) {
            return {
                ...state,
                settings: emptySetting,
            }
        }

        try {
            const settings = JSON.parse(settingsString);
            return {
                ...state,
                settings
            }
        } catch (e) {
            return {
                ...state,
                settings: emptySetting,
            };
        }
    }

}