import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import _ from 'lodash';
import {UpdateSideStateCommand} from "./UpdateSideStateCommand";
import {ExpandCommand} from "./ExpandCommand";

export class LocatePostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Menu/LocatePost";
    }

    process(store: AppStore): AppStore {
        // 1. 展开
        store = new ExpandCommand(this.postId)
            .process(store);

        return store;
    }
}