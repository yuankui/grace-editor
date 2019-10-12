import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import _ from 'lodash';
import {UpdateSideStateCommand} from "./UpdateSideStateCommand";

export class ToggleExpandCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Menu/ToggleExpand";
    }

    process(store: AppStore): AppStore {
        const expandedKeys = store.siderState.expandedKeys;

        let newKeys = expandedKeys;

        if (_.includes(expandedKeys, this.postId)) {
            newKeys = expandedKeys.filter(k => k != this.postId);
        } else {
            newKeys = [...expandedKeys, this.postId];
        }

        return new UpdateSideStateCommand(
            {
                expandedKeys: newKeys,
            }
        ).process(store);
    }
}