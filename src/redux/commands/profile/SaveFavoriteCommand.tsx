import {AppCommand, CommandType} from "../index";
import {AppStore, Favor, Post} from "../../store";
import UpdateSettingsCommand from "../UpdateSettingsCommand";
import _ from 'lodash';

export default class SaveFavoriteCommand extends AppCommand{
    private readonly favor: Favor;

    constructor(favor: Favor) {
        super();
        this.favor = favor;
    }

    name(): CommandType {
        return "Favor/Save";
    }

    process(state: AppStore): AppStore {
        const {posts} = this.favor;
        const uniq: Array<string> = _.uniq(posts);
        return new UpdateSettingsCommand({
            ...state.settings,
            favor: {
                posts: uniq,
            },
        }).process(state);
    }

}