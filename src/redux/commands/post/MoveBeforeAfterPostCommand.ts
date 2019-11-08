import {AppCommand, CommandType} from "../index";
import {AppStore, Post} from "../../store";
import {Mapper} from "redux-commands";
import {MovePostCommand} from "../MovePostCommand";

export class MoveBeforeAfterPostCommand extends AppCommand {
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
        return "Post/MoveBeforeAfterPost";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        const parentId = state.posts.parentMap.get(this.brother);

        // move to parent
        let newState: AppStore = new MovePostCommand(this.src, parentId).process(state);
        const brotherPost: Post = state.posts.posts.get(this.brother);

        // set order
        const newBrother: Post = {
            ...newState.posts.posts.get(this.brother),
            weight: brotherPost.weight + "2",
        };

        const newSrc: Post = {
            ...newState.posts.posts.get(this.src),
            weight: brotherPost.weight + (this.mode === "before" ? "1" : "3"),
        };

        await state.backend.savePost({
            ...newBrother,
            parentId,
        });

        await state.backend.savePost({
            ...newSrc,
            parentId
        });

        return s => {
            return {
                ...newState,
                posts: {
                    ...state.posts,
                    posts: newState.posts.posts
                        .set(newSrc.id, newSrc)
                        .set(newBrother.id, newBrother),
                },
            }
        }
    }

}