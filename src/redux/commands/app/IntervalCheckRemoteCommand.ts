import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import {CheckRemoteCommand} from "./CheckRemoteCommand";

export class IntervalCheckRemoteCommand extends AppCommand {
    name(): CommandType {
        return 'App/IntervalCheckRemote';
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {

        // 每5秒 check 一次
        setInterval(() => {
            dispatch(new CheckRemoteCommand());
        }, 5000);
    }

}