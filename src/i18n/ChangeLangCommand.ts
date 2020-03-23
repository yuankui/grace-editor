import {AppCommand, CommandType} from "../redux/commands";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {UpdateProfileSettingCommand} from "../redux/commands/profile/UpdateProfileSettingCommand";

export class ChangeLangCommand extends AppCommand {
    private readonly lang: string;

    constructor(lang: string) {
        super();
        this.lang = lang;
    }

    name(): CommandType {
        return "Lang/Change";
    }

    async process(state: AppStore, dispatch: Dispatch<any>) {
        await dispatch(new UpdateProfileSettingCommand({
            lang: this.lang,
        }));
    }
}