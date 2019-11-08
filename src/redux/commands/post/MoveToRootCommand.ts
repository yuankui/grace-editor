import {AppCommand, CommandType} from "../index";
import {AppStore, PostsStore} from "../../store";
import {remove} from "../../utils";

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

        const parentId = state.posts.parentMap.get(this.postId);

        const newPostStore: PostsStore = {
            ...state.posts,
            parentMap: state.posts.parentMap.set(this.postId, null),
            childrenMap: state.posts.childrenMap.set(null, [...state.posts.childrenMap.get(null), this.postId])
                .set(parentId, remove(state.posts.childrenMap.get(parentId), this.postId))
        };

        return {
            ...state,
            posts: newPostStore,
        }
    }

}