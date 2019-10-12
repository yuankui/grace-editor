import {AppCommand, CommandType} from "../index";
import {AppStore, SiderState} from "../../store";
import {UpdateStateCommand} from "../UpdateStateCommand";

export class UpdateSideStateCommand extends AppCommand {
    data: Partial<SiderState>;

    constructor(data: Partial<SiderState>) {
        super();
        this.data = data;
    }

    name(): CommandType {
        return "Menu/UpdateSideMenu";
    }

    process(store: AppStore): AppStore {
        return new UpdateStateCommand({
            siderState: {
                ...store.siderState,
                ...this.data,
            },
        }).process(store);
    }
}