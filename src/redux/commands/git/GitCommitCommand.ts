import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";

export default class GitCommitCommand extends GitCommand {
    private readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

    name(): CommandType {
        return "Git/Commit";
    }

    async processGit(state: AppStore): Promise<AppStore> {
        if (state.repo) {
            await state.repo.add('.');
            const log = await state.repo.commit(this.message);
            console.log(log);
        }

        return state;
    }

}