import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Mapper} from "redux-commands";

export default abstract class GitCommand extends AppCommand {

    abstract processGit(state: AppStore): Promise<AppStore>;

    async process(state: AppStore): Promise<Mapper<AppStore>> {

        let appStore = await this.processGit(state);
        return s => {
            return appStore;
        }
    }

}