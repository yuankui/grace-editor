import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {ToolsHintUpdateCommand} from "./ToolsHintUpdateCommand";

export class ToolsHintToggleCommand extends AppCommand {
    private readonly  show: boolean;

    constructor(show: boolean) {
        super();
        this.show = show;
    }

    name(): CommandType {
        return "ToolsHint/Toggle";
    }

    process(store: AppStore): AppStore {
        if (store.slatejs.toolsHint.show == this.show) {
            return store;
        }
        return new ToolsHintUpdateCommand({
            ...store.slatejs.toolsHint,
            show: this.show,
        }).process(store);
    }
}