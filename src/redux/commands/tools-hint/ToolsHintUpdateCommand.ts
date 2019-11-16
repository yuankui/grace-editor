import {AppCommand, CommandType} from "../index";
import {AppStore, SlateHint} from "../../store";

export class ToolsHintUpdateCommand extends AppCommand {
    private readonly  hint: SlateHint;

    constructor(hint: SlateHint) {
        super();
        this.hint = hint;
    }

    name(): CommandType {
        return "ToolsHint/Update";
    }

    process(store: AppStore): AppStore {
        return {
            ...store,
            slatejs: {
                ...store.slatejs,
                toolsHint: this.hint,
            }
        }
    }
}