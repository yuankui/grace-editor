import {AppCommand, CommandType} from "../index";
import {AppStore, Post} from "../../store";
import {Mapper} from "redux-commands";
import {MovePostCommand} from "../MovePostCommand";

export class SetOrderBeforeAfterCommand extends AppCommand {
    src: string;
    brother: string;
    mode: "before" | "after";

    constructor(src: string, target: string, mode: "before" | "after") {
        super();
        this.src = src;
        this.brother = target;
        this.mode = mode;
    }

    name(): CommandType {
        return "Post/SetOrder";
    }

    process(state: AppStore): AppStore {
        const brotherParent = state.posts.parentMap.get(this.brother);
        const srcParent = state.posts.parentMap.get(this.src);
        // move to parent
        const brotherPost: Post = state.posts.posts.get(this.brother);

        // set order
        const newBrother: Post = {
            ...state.posts.posts.get(this.brother),
            weight: brotherPost.weight + "2",
        };

        const newSrc: Post = {
            ...state.posts.posts.get(this.src),
            weight: brotherPost.weight + (this.mode === "before" ? "1" : "3"),
        };

        state.backend.savePost({
            ...newBrother,
            parentId: brotherParent,
        });

        state.backend.savePost({
            ...newSrc,
            parentId: srcParent
        });

        return {
            ...state,
            posts: {
                ...state.posts,
                posts: state.posts.posts
                    .set(newSrc.id, newSrc)
                    .set(newBrother.id, newBrother),
            },
        }
    }

}