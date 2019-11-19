import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";

import {Mapper} from "redux-commands";

export default class GitSetupCommand extends AppCommand {
    name(): CommandType {
        return "Git/Setup";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        let localPath = '';
        if (state.settings.git && state.settings.git.localPath) {
            localPath = state.settings.git.localPath;
        }

        const nodegit = window.require('nodegit');
        const repository = await nodegit.Repository.open(localPath);
        return s => {
            return {
                ...s,
                repo: repository,
            }
        }
    }
}