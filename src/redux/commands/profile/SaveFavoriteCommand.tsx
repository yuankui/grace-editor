import {AppCommand, CommandType} from "../index";
import {AppStore, Favor} from "../../store";
import _ from 'lodash';
import {Dispatch} from "redux";
import {UpdateProfileSettingCommand} from "./UpdateProfileSettingCommand";

export default class SaveFavoriteCommand extends AppCommand{
    private readonly favor: Favor;

    constructor(favor: Favor) {
        super();
        this.favor = favor;
    }

    name(): CommandType {
        return "Favor/Save";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const {posts} = this.favor;
        const uniq: Array<string> = _.uniq(posts);

        await dispatch(new UpdateProfileSettingCommand({
            favor: {
                posts: uniq,
            }
        }));
    }

}