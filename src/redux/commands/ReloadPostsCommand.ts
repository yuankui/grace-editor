import {AppCommand, CommandType} from "./index";
import {AppStore, PostsStore} from "../store";
import {buildPostTree} from "../utils";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "./UpdateStateCommand";

export class ReloadPostsCommand extends AppCommand {
    name(): CommandType {
        return "ReloadPosts";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const startTime = new Date().getUTCMilliseconds();
        let posts = await state.backend.getPosts();
        let postsStore: PostsStore = buildPostTree(posts);
        const cost = new Date().getUTCMilliseconds() - startTime;
        console.log('load cost:', cost);
        const newState = {
            posts: {
                ...postsStore,
            }
        };

        dispatch(new UpdateStateCommand(newState));
    }

}