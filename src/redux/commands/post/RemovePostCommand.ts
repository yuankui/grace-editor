import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Post} from "../../../backend";

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

        const post = state.posts.posts.get(this.id);
        if (post.parentId != null) {
            const parent = state.posts.posts.get(post.parentId);
            const newParent: Post = {
                ...parent,
                children: parent.children.filter(p => p != post.id),
            };

            state  = {
                ...state,
                posts: {
                    ...state.posts,
                    posts: state.posts.posts.set(newParent.id, newParent)
                },
            }
        }

        state = {
            ...state,
            posts: {
                ...state.posts,
                posts: state.posts.posts.remove(this.id)
            },
        };

        return state;
    }

}