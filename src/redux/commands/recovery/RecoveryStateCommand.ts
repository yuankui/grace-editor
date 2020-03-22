import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import {recoveryLocationCommand} from "./RecoveryLocationCommand";

export class RecoveryStateCommand extends AppCommand {
    name(): CommandType {
        return "Recovery/All";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        let item = localStorage.getItem('app-state');
        const oldState = JSON.parse(item as string);
        const commands: Array<any> = [
            new recoveryLocationCommand(oldState),
        ];

        for (let command of commands) {
            await dispatch(command);
        }
    }

}