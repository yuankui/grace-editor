import {AppCommand, CommandType} from "../index";
import {AppStore, PostsStore} from "../../store";
import {remove} from "../../utils";

export class RemovePostCommand extends AppCommand {
    private readonly id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }

    name(): CommandType {
        return "Post/RemovePost";
    }

    process(state: AppStore): AppStore {
        const {posts: postStore} = state;
        const parentId = postStore.parentMap.get(this.id);

        const newPostsStore: PostsStore = {
            ...postStore,
            posts: postStore.posts.remove(this.id),
            parentMap: postStore.parentMap.remove(this.id),
            childrenMap: postStore.childrenMap.set(parentId, remove(postStore.childrenMap.get(parentId), this.id)),
        };

        return {
            ...state,
            posts: newPostsStore,
        };
    }

}