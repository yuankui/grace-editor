import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {MovePostCommand} from "../MovePostCommand";
import {SetOrderBeforeAfterCommand} from "./SetOrderBeforeAfterCommand";

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

    process(state: AppStore): AppStore {
        const parentId = state.posts.parentMap.get(this.brother);

        // move to parent
        state = new MovePostCommand(this.src, parentId).process(state);
        state = new SetOrderBeforeAfterCommand(this.src, this.brother, this.mode)
            .process(state);
        return state;
    }

}