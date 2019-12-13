import {AppCommand, CommandType} from "../index";
import {AppStore, Theme} from "../../store";
import {Dispatch} from "redux";

export class LoadThemeCommand extends AppCommand {
    private readonly theme: Theme;

    constructor(theme: Theme) {
        super();
        this.theme = theme;
    }

    json(): object {
        return {
            theme: this.theme,
        }
    }

    name(): CommandType {
        return "Theme/Load";
    }

    process(state: AppStore, dispatch: Dispatch<any>):  AppStore {
        return {
            ...state,
            theme: this.theme,
        }
    }
}