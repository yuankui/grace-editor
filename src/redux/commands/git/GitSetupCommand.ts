import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import nodegit from 'nodegit';
import {Mapper} from "redux-commands";

export default class GitSetupCommand extends AppCommand {
    name(): CommandType {
        return "Git/Setup";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        const repository = await nodegit.Repository.open(state.settings.git.localPath);
        return s => {
            return {
                ...s,
                repo: repository,
            }
        }
    }
}