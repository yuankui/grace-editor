import {AppCommand, CommandType} from "../index";
import {AppStore, PostsStore} from "../../store";
import {RemovePostCommand} from "./RemovePostCommand";

export class MoveToRootCommand extends AppCommand {
    postId: string;

    constructor(childKey: string) {
        super();
        this.postId = childKey;
    }

    name(): CommandType {
        return "Post/MoveToRoot";
    }

    process(state: AppStore): AppStore {
        const post = state.posts.posts.get(this.postId);

        // remove
        state = new RemovePostCommand(this.postId).process(state);

        const newPostStore: PostsStore = {
            ...state.posts,
            posts: state.posts.posts.set(this.postId, post),
            parentMap: state.posts.parentMap.set(this.postId, null),
            childrenMap: state.posts.childrenMap.set(null, [...state.posts.childrenMap.get(null), this.postId])
        };

        return {
            ...state,
            posts: newPostStore,
        }
    }

}