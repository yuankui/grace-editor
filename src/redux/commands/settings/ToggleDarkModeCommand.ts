import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import {UpdateProfileSettingCommand} from "../profile/UpdateProfileSettingCommand";

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
    }
}