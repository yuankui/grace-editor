import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import SaveFavoriteCommand from "./SaveFavoriteCommand";
import _ from 'lodash';
import {remove} from "../../utils";
import {Dispatch} from "redux";

export default class RemoveFavoriteCommand extends AppCommand{
    private readonly postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Favor/Remove";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const profile = state.profile || {};
        const favor = profile.favor || {};
        const oldPosts = favor.posts || [];

        if (!_.includes(oldPosts, this.postId)) {
            return;
        }

        await dispatch(new SaveFavoriteCommand({
            posts: remove(oldPosts, this.postId)
        }));
    }

}