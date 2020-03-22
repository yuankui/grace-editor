import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import {push} from "connected-react-router";

export class recoveryLocationCommand extends AppCommand {
    private state: AppStore;

    constructor(state: AppStore) {
        super();
        this.state = state;
    }

    name(): CommandType {
        return "Recovery/Location";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        if (this.state?.router?.location?.pathname) {
            const path = `${this.state.router.location.pathname}${this.state.router.location.search}`;
            console.log(`recovery path: ${path}`);
            await dispatch(push(path));
        }
    }

}