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

        let childrenMap = state.posts.childrenMap;

        // remove
        childrenMap = childrenMap.set(parentId, remove(childrenMap.get(parentId), this.postId));

        // add
        childrenMap = childrenMap.set(null, [...childrenMap.get(null), this.postId]);

        const newPostStore: PostsStore = {
            ...state.posts,
            parentMap: state.posts.parentMap.set(this.postId, null),
            childrenMap: childrenMap
        };

        return {
            ...state,
            posts: newPostStore,
        }
    }

}