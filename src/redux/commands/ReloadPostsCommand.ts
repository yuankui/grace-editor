import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {buildPostTree, convertToEditingPost, createPostId} from "../utils";
import {Mapper} from "redux-commands";

export class ReloadPostsCommand extends AppCommand {
    name(): CommandType {
        return "ReloadPosts";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        let posts = await state.backend.getPosts();
        return (s: AppStore): AppStore => {
            let postTree = buildPostTree(posts);

            let currentPost;
            if (postTree.size !== 0) {
                currentPost = convertToEditingPost(postTree.toArray().filter(p => p.parentId == null)[0]);
            } else {
                currentPost = createPostId();
            }

            return {
                ...s,
                posts: {
                    posts: postTree,
                    currentPostId: currentPost,
                },
            }
        }
    }

}