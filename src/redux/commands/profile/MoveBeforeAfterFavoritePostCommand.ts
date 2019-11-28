import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import _ from "lodash";
import RemoveFavoriteCommand from "./RemoveFavoriteCommand";
import {Dispatch} from "redux";
import {AddBeforeAfterFavoritePostCommand} from "./AddBeforeAfterFavoritePostCommand";

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

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const profile = state.profile || {};
        const favor = profile.favor || {};
        const oldPosts = favor.posts || [];
        // 先删掉老的
        if (_.includes(oldPosts, this.src)) {
            await dispatch(new RemoveFavoriteCommand(this.src));
        }

        await dispatch(new AddBeforeAfterFavoritePostCommand(this.src, this.brother, this.mode));
    }

}