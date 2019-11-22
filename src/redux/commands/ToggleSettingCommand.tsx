import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Mapper} from "redux-commands";

export class ToggleSettingCommand extends AppCommand{
    private readonly show: boolean;

    constructor(show: boolean) {
        super();
        this.show = show;
    }

    name(): CommandType {
        return "Setting/ToggleShow";
    }

    process(state: AppStore): Promise<Mapper<AppStore>> | AppStore {
        return {
            ...state,
            showSetting: this.show,
        }
    }
}