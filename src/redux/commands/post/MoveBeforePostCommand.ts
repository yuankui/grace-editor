import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Mapper} from "redux-commands";
import {MovePostCommand} from "../MovePostCommand";
import {Post} from "../../../backend";

export class MoveBeforePostCommand extends AppCommand {
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
        const oldSrc = state.posts.get(this.src);

        const brother = state.posts.get(this.target);

        // move to parent
        let newState: AppStore = new MovePostCommand(this.src, brother.parentId).process(state);

        // set order
        const newBrother: Post = {
            ...brother,
            weight: brother.weight + "2",
            saved: false,
        };

        const newSrc: Post = {
            ...newState.posts.get(this.src),
            weight: brother.weight + (this.mode === "before" ? "1" : "3"),
            saved: false,
        };

        await state.backend.savePost(newBrother);
        await state.backend.savePost(newSrc);

        return s => {
            return {
                ...newState,
                posts: newState.posts
                    .set(newSrc.id, newSrc)
                    .set(newBrother.id, newBrother),
            }
        }
    }

}