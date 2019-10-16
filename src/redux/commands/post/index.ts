import {AppCommand} from "../index";
import {AppStore, Posts} from "../../store";

export abstract class PostCommand extends AppCommand {
    process(state: AppStore): AppStore {
        const newPosts = this.processPosts(state.posts);
        return {
            ...state,
            posts: newPosts,
        }
    }

    abstract processPosts(posts: Posts): Posts;
}