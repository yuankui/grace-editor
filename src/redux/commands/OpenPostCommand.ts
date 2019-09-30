import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {convertToEditingPost} from "../utils";
import {UpdateEditingPostCommand} from "./UpdateEditingPostCommand";

export class OpenPostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "UpdateEditingPost";
    }

    process(state: AppStore): AppStore {
        let post = state.posts.get(this.postId);
        let editingPost = convertToEditingPost(post);
        return new UpdateEditingPostCommand(editingPost)
            .process(state);
    }
}