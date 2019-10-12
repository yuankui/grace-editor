import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {ExpandCommand} from "./ExpandCommand";
import {PostSelectCommand} from "./PostSelectCommand";

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

        // 2. 选中
        store = new PostSelectCommand(this.postId)
            .process(store);
        return store;
    }
}