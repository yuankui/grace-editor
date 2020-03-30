import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {message} from "antd";
import {Dispatch} from "redux";

export default class GitCommitCommand extends AppCommand {
    private readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

    name(): CommandType {
        return "Git/Commit";
    }
    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        if (!state.repo) {
            return;
        }

        await state.repo.commit(this.message);
        message.info("commit success");
    }

}