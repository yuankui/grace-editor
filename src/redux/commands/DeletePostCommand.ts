import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Mapper} from "redux-commands";
import {PostSelectCommand} from "./menu/PostSelectCommand";

export class DeletePostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "DeletePost";
    }

    async process(store: AppStore): Promise<Mapper<AppStore>> {
        await store.backend.deletePost(this.postId);
        return s => {
            const newPosts = s.posts.delete(this.postId);
            const post = s.posts.get(this.postId);
            let currentPosts = {
                ...s,
                posts: newPosts,
            };
            if (post.parentId != null) {
                currentPosts = new PostSelectCommand(post.parentId)
                    .process(currentPosts);
                return currentPosts;
            } else {
                return {
                    ...currentPosts,
                    currentPost: null,
                };
            }
        }
    }
}