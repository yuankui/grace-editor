import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {UpdateSideStateCommand} from "./UpdateSideStateCommand";

export class CollapseCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Menu/Collapse";
    }

    process(store: AppStore): AppStore {
        const expandedKeys = store.siderState.expandedKeys;

        let newKeys = expandedKeys.filter(k => k != this.postId);

        return new UpdateSideStateCommand(
            {
                expandedKeys: newKeys,
            }
        ).process(store);
    }
}