import {AppCommand, CommandType} from "../redux/commands";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";

export class ChangeLangCommand extends AppCommand {
    private readonly lang: string;

    constructor(lang: string) {
        super();
        this.lang = lang;
    }

    name(): CommandType {
        return "Lang/Change";
    }

    process(state: AppStore, dispatch: Dispatch<any>): AppStore {
        return {
            ...state,
            profile: {
                ...state.profile,
                lang: this.lang,
            }
        }
    }
}