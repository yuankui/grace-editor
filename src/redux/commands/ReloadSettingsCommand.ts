import {AppCommand, CommandType} from "./index";
import {AppStore, Settings} from "../store";

const HomeDir = window.require('process').env['HOME'];
const defaultWorkSpace = window.require('path').join(HomeDir, '.grace-docs');

const emptySetting: Settings = {
    workSpace: defaultWorkSpace,
    isDarkMode: false,
    favor: {
        posts: [],
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