import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import {UpdateProfileSettingCommand} from "../profile/UpdateProfileSettingCommand";
import {LoadThemeCommand} from "../theme/LoadThemeCommand";
import {DarkTheme} from "../theme/DarkTheme";
import {LightTheme} from "../theme/LightTheme";

export class SetDarkModeCommand extends AppCommand {
    private readonly isDarkMode: boolean;

    constructor(isDarkMode: boolean) {
        super();
        this.isDarkMode = isDarkMode;
    }

    name(): CommandType {
        return "Setting/SetDarkMode";
    }

    async process(store: AppStore, dispatch: Dispatch<any>): Promise<any> {
        await dispatch(new UpdateProfileSettingCommand({
            isDarkMode: this.isDarkMode,
        }));

        if (this.isDarkMode) {
            await dispatch(new LoadThemeCommand(DarkTheme));
        } else {
            await dispatch(new LoadThemeCommand(LightTheme));
        }
    }
}