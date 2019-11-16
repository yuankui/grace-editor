import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {HintUpdateCommand} from "./HintUpdateCommand";

export class HintToggleCommand extends AppCommand {
    private readonly  show: boolean;

    constructor(show: boolean) {
        super();
        this.show = show;
    }

    name(): CommandType {
        return "Hint/Toggle";
    }

    process(store: AppStore): AppStore {
        return new HintUpdateCommand({
            ...store.slatejs.hint,
            show: this.show,
        }).process(store);
    }
}