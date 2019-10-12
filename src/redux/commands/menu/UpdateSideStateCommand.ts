import {AppCommand, CommandType} from "../index";
import {AppStore, SiderState} from "../../store";
import SiderMenu from "../../../app/SiderMenu";

export class UpdateSideStateCommand extends AppCommand {
    data: SiderState;

    constructor(data: SiderState) {
        super();
        this.data = data;
    }

    name(): CommandType {
        return "Menu/UpdateSideMenu";
    }

    process(store: AppStore): AppStore {
        return {
            ...store,
            siderState: this.data,
        }
    }
}