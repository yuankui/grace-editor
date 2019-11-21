import {AppCommand, CommandType} from "../index";
import {AppStore, Favor} from "../../store";
import UpdateSettingsCommand from "../UpdateSettingsCommand";

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
        return new UpdateSettingsCommand({
            ...state.settings,
            favor: this.favor,
        }).process(state);
    }

}