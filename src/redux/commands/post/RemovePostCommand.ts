import {AppCommand, CommandType} from "../index";
import {AppStore, PostsStore} from "../../store";
import {MovePostCommand} from "../MovePostCommand";
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
        // move to root
        state = new MovePostCommand(this.id, null).process(state);

        const {posts: postStore} = state;

        const newPostsStore: PostsStore = {
            ...postStore,
            posts: postStore.posts.remove(this.id),
            parentMap: postStore.parentMap.remove(this.id),
            childrenMap: postStore.childrenMap.set(null, remove(postStore.childrenMap.get(null), this.id)),
        };

        return {
            ...state,
            posts: newPostsStore,
        };
    }

}