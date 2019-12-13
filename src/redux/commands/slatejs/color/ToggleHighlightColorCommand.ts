import {AppCommand, CommandType} from "../../index";
import {AppStore} from "../../../store";
import {HLColor} from "../../../../app/renders/Slatejs/plugins/highlight/HighlightPlugin";

export class ToggleHighlightColorCommand extends AppCommand {
    private readonly color: HLColor;

    constructor(color: HLColor) {
        super();
        this.color = color;
    }

    name(): CommandType {
        return 'Slate/Color/Toggle';
    }

    process(state: AppStore): AppStore {
        return {
            ...state,
            slatejs: {
                ...state.slatejs,
                highlight: {
                    ...state.slatejs.highlight,
                    color: this.color,
                }
            }
        }
    }

}