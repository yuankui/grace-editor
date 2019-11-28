import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import SaveFavoriteCommand from "./SaveFavoriteCommand";
import {Dispatch} from "redux";

export class AddBeforeAfterFavoritePostCommand extends AppCommand {
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
        return "Favor/MoveBeforeAfter";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        // 再插入新的
        const newPosts = state.profile.favor.posts.flatMap(id => {
            if (id == this.brother) {
                if (this.mode === "before") {
                    return [this.src, id];
                } else {
                    return [id, this.src];
                }
            } else {
                return [id]
            }
        });

        await dispatch(new SaveFavoriteCommand({
            posts: newPosts,
        }));
    }

}