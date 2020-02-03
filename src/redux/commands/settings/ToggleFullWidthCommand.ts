import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import {UpdateProfileSettingCommand} from "../profile/UpdateProfileSettingCommand";

export class ToggleFullWidthCommand extends AppCommand {
    private readonly fullWidth: boolean;

    constructor(fullWidth: boolean) {
        super();
        this.fullWidth = fullWidth;
    }

    name(): CommandType {
        return "Setting/ToggleFullWidth";
    }

    async process(store: AppStore, dispatch: Dispatch<any>): Promise<any> {
        await dispatch(new UpdateProfileSettingCommand({
            content: {
                fullWidth: this.fullWidth,
            }
        }));
    }
}