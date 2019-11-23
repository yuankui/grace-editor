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

            return {
                ...s,
                posts: {
                    ...postsStore,
                }
            }
        }
    }

}