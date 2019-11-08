import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {convertToEditingPost} from "../../utils";


export class PostSelectCommand extends AppCommand {
    id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }

    name(): CommandType {
        return "PostSelect";
    }

    process(state: AppStore): AppStore {
        // 2. switch post
        let post = state.posts.posts.get(this.id);
        let currentPost: string = convertToEditingPost(post);

        state = {
            ...state,
            posts: {
                ...state.posts,
                currentPostId: currentPost,
            },
        };

        return state;
    }

}