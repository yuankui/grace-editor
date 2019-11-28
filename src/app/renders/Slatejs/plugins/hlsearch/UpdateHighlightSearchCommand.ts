import {AppCommand, CommandType} from "../../../../../redux/commands";
import {AppStore, SlateHighlightSearch} from "../../../../../redux/store";
import {Dispatch} from "redux";

export class UpdateHighlightSearchCommand extends AppCommand{
    private readonly config: Partial<SlateHighlightSearch>;


    constructor(config: Partial<SlateHighlightSearch>) {
        super();
        this.config = config;
    }

    name(): CommandType {
        return 'Slate/hiSearch/Update';
    }

    process(state: AppStore, dispatch: Dispatch<any>): AppStore {
        return {
            ...state,
            slatejs: {
                ...state.slatejs,
                highlightSearch: {
                    ...state.slatejs.highlightSearch,
                    ...this.config
                },
            }
        }
    }

}