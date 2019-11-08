import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Mapper} from "redux-commands";
import {MovePostCommand} from "../MovePostCommand";
import {Post} from "../../../backend";

export class MoveBeforeAfterPostCommand extends AppCommand {
    src: string;
    target: string;
    mode: "before" | "after";

    constructor(src: string, target: string, mode: "before" | "after") {
        super();
        this.src = src;
        this.target = target;
        this.mode = mode;
    }

    name(): CommandType {
        return "Post/MoveBeforePost";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        // TODO fix: duplicate when move child as parents' brother
        const brother = state.posts.posts.get(this.target);

        // move to parent
        let newState: AppStore = new MovePostCommand(this.src, brother.parentId).process(state);

        // set order
        const newBrother: Post = {
            ...newState.posts.posts.get(brother.id),
            weight: brother.weight + "2",
        };

        const newSrc: Post = {
            ...newState.posts.posts.get(this.src),
            weight: brother.weight + (this.mode === "before" ? "1" : "3"),
        };

        await state.backend.savePost(newBrother);
        await state.backend.savePost(newSrc);

        return s => {
            return {
                ...newState,
                posts: {
                    ...state.posts,
                    posts: newState.posts.posts
                        .set(newSrc.id, newSrc)
                        .set(newBrother.id, newBrother)
                },
            }
        }
    }

}