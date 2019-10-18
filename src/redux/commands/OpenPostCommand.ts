import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {convertToEditingPost} from "../utils";
import {UpdatePostCommand} from "./UpdatePostCommand";

export class OpenPostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "UpdatePost";
    }

    process(state: AppStore): AppStore {
        let post = state.posts.get(this.postId);
        let editingPost = convertToEditingPost(post);
        return new UpdatePostCommand(editingPost)
            .process(state);
    }
}