import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";

export class toggleAboutCommand extends AppCommand{
    private readonly show: boolean;

    constructor(show: boolean) {
        super();
        this.show = show;
    }

    name(): CommandType {
        return "About/ToggleShow";
    }

    process(state: AppStore): AppStore {
        return {
            ...state,
            showAbout: this.show,
        }
    }
}