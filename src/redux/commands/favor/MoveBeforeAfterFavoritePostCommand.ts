import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import _ from "lodash";
import SaveFavoriteCommand from "./SaveFavoriteCommand";
import RemoveFavoriteCommand from "./RemoveFavoriteCommand";

export class MoveBeforeAfterFavoritePostCommand extends AppCommand {
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

    process(state: AppStore): AppStore {

        const favor = state.settings.favor || {};
        const oldPosts = favor.posts || [];
        // 先删掉老的
        if (_.includes(oldPosts, this.src)) {
            state = new RemoveFavoriteCommand(this.src)
                .process(state);
        }

        // 再插入新的
        const newPosts = state.settings.favor.posts.flatMap(id => {
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

        return new SaveFavoriteCommand({
            posts: newPosts,
        }).process(state);
    }

}