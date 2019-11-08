import {AppCommand, CommandType} from "./index";
import {AppStore, PostsStore} from "../store";
import {buildPostTree} from "../utils";
import {Mapper} from "redux-commands";

export class ReloadPostsCommand extends AppCommand {
    name(): CommandType {
        return "ReloadPosts";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        let posts = await state.backend.getPosts();
        return (s: AppStore): AppStore => {
            let postsStore: PostsStore = buildPostTree(posts);

            let currentPost: string | null = null;
            const children = postsStore.childrenMap.get(null);
            if (children == null || children.length == 0) {
                currentPost = children[0];
            }

            return {
                ...s,
                posts: {
                    ...postsStore,
                    currentPostId: currentPost,
                }
            }
        }
    }

}