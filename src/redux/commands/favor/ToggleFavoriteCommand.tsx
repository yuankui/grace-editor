import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import SaveFavoriteCommand from "./SaveFavoriteCommand";
import _ from 'lodash';
import RemoveFavoriteCommand from "./RemoveFavoriteCommand";
import AddFavoriteCommand from "./AddFavoriteCommand";

export default class ToggleFavoriteCommand extends AppCommand{
    private readonly postId?: string;

    constructor(postId?: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Favor/Toggle";
    }

    process(state: AppStore): AppStore {
        const postId = this.postId == null ? state.posts.currentPostId : this.postId;
        if (postId == null) {
            return state;
        }

        const favor = state.settings.favor || {};
        const oldPosts = favor.posts || [];

        if (_.includes(oldPosts, postId)) {
            return new RemoveFavoriteCommand(postId).process(state);
        } else {
            return new AddFavoriteCommand(postId).process(state);
        }
    }

}