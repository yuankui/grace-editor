import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import SaveFavoriteCommand from "./SaveFavoriteCommand";
import _ from 'lodash';
import {remove} from "../../utils";

export default class RemoveFavoriteCommand extends AppCommand{
    private readonly postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Favor/Remove";
    }

    process(state: AppStore): AppStore {
        const favor = state.settings.favor || {};
        const oldPosts = favor.posts || [];

        if (!_.includes(oldPosts, this.postId)) {
            return state;
        }
        
        return new SaveFavoriteCommand({
            posts: remove(oldPosts, this.postId)
        }).process(state);
    }

}