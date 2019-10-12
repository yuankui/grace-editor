import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import _ from 'lodash';
import {UpdateSideStateCommand} from "./UpdateSideStateCommand";

export class ExpandCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Menu/Expand";
    }

    traceRoot(key: string, store: AppStore): Array<string> {
        const res: Array<string> = [];
        while (true) {
            res.push(key);

            const post = store.posts.get(key);
            if (post == null) {
                break;
            }
            key = post.id;
        }

        return res;
    }

    process(store: AppStore): AppStore {
        const expandedKeys = store.siderState.expandedKeys;

        const newKeys: Array<string> = _.union(expandedKeys, this.traceRoot(this.postId, store));
        return new UpdateSideStateCommand(
            {
                expandedKeys: newKeys,
            }
        ).process(store);
    }
}