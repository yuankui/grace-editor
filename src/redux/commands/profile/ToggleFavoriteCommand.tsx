import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import _ from 'lodash';
import RemoveFavoriteCommand from "./RemoveFavoriteCommand";
import AddFavoriteCommand from "./AddFavoriteCommand";
import {Dispatch} from "redux";

export default class ToggleFavoriteCommand extends AppCommand{
    private readonly postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Favor/Toggle";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<any> {
        const postId = this.postId;
        if (postId == null) {
            return state;
        }

        const profile = state.profile;
        const favor = profile.favor || {};
        const oldPosts = favor.posts || [];

        if (_.includes(oldPosts, postId)) {
            await dispatch(new RemoveFavoriteCommand(postId));
        } else {
            await dispatch(new AddFavoriteCommand(postId));
        }
    }

}