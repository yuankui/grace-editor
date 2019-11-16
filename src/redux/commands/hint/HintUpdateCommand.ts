import {AppCommand, CommandType} from "../index";
import {AppStore, SlateHint} from "../../store";

export class HintUpdateCommand extends AppCommand {
    private readonly  hint: SlateHint;

    constructor(hint: SlateHint) {
        super();
        this.hint = hint;
    }

    name(): CommandType {
        return "Hint/Update";
    }

    process(store: AppStore): AppStore {
        return {
            ...store,
            slatejs: {
                ...store.slatejs,
                hint: this.hint,
            }
        }
    }
}