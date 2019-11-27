import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {RemovePostCommand} from "./post/RemovePostCommand";
import {Dispatch} from "redux";

export class DeletePostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Post/Delete";
    }

    async process(store: AppStore, dispatch: Dispatch<any>): Promise<void> {
        await store.backend.deletePost(this.postId);
        dispatch(new RemovePostCommand(this.postId));
    }
}