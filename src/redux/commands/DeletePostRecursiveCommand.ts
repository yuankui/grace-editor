import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {DeletePostCommand} from "./DeletePostCommand";
import {Dispatch} from "redux";

export class DeletePostRecursiveCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Post/DeleteRecursive";
    }

    async process(store: AppStore, dispatch: Dispatch<any>): Promise<void> {
        let children = store.posts.childrenMap.get(this.postId);

        // 如果没有子文章，就仅仅删除一个
        if (children == null|| children.length == 0) {
            dispatch(new DeletePostCommand(this.postId));
            return;
        }

        // 如果有子文章，就先删除所有的子文字，再删除父文章
        for (let child of children) {
            dispatch(new DeletePostRecursiveCommand(child));
        }

        dispatch(new DeletePostCommand(this.postId));
    }
}